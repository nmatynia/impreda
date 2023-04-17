import React, { useEffect, useMemo } from 'react';
import Image from 'next/image';
import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import superjson from 'superjson';
import { TRPCError } from '@trpc/server';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { PrismaClient } from '@prisma/client';
import { Container } from '../../components/container/Container';
import { BodyText, Bold, LargeBodyText } from '../../components/typography/Typography';
import { Dot } from '../../components/dot/Dot';
import { SizeIndicator } from '../../components/size-indicator/SizeIndicator';
import { Button } from '../../components/button/Button';
import { SvgIcon } from '../../components/icons/SvgIcon';
import { ColorIndicator } from '../../components/color-indicator/ColorIndicator';
import { trpc } from '../../utils/trpc';
import { createContextInner } from '../../server/trpc/context';
import { appRouter } from '../../server/trpc/router/_app';
import { ItemCard } from '../../components/item-card/ItemCard';
import { ItemContainer } from '../../components/items-container/ItemContainer';

export async function getStaticProps(context: GetStaticPropsContext<{ id: string }>) {
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner({ session: null }),
    transformer: superjson
  });
  const prisma = new PrismaClient();
  const id = context.params?.id as string;
  const itemsIds = await prisma.item.findUnique({
    where: {
      id
    }
  });
  if (!itemsIds) {
    return {
      notFound: true
    };
  }
  await ssg.items.getItem.prefetch(id);
  return {
    props: {
      trpcState: ssg.dehydrate(),
      id
    },
    revalidate: 30
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prisma = new PrismaClient();
  const itemsIds = await prisma.item.findMany({
    select: {
      id: true
    }
  });

  if (!itemsIds) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `Prisma promise returned nullish value`
    });
  } else if (itemsIds.length === 0) {
    return { paths: [], fallback: 'blocking' };
  }
  const paths = itemsIds.map(item => ({
    params: { id: item.id }
  }));

  return { paths, fallback: 'blocking' };
};

const Item = ({ id }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: item } = trpc.items.getItem.useQuery(id as string);

  const { data: items, isLoading } = trpc.items.getItems.useQuery({});

  // TODO selected size and color should have different variant selected
  // add store for clicked color
  // sort sizes on backend
  // reserve item for a user?
  const [selectedColorId, setSelectedColorId] = React.useState<string | undefined>(
    item?.colors[0]?.id
  );
  const filteredSizes = useMemo(
    () => item?.colors.find(color => color.id === selectedColorId)?.sizes,
    [item, selectedColorId]
  );

  const [selectedSizeId, setSelectedSizeId] = React.useState<string | undefined>(
    filteredSizes?.filter(size => size.available > 0)?.[0]?.id
  );

  useEffect(() => {
    setSelectedSizeId(filteredSizes?.[0]?.id);
  }, [filteredSizes]);

  const utils = trpc.useContext();
  const { mutateAsync: addToCart } = trpc.cart.addToCart.useMutation({
    onSuccess: () => {
      utils.cart.invalidate();
    }
  });
  const handleAddToCart = async () => {
    if (!(selectedSizeId && selectedColorId && item)) {
      return;
    }
    await addToCart({
      itemId: id,
      sizeId: selectedSizeId,
      colorId: selectedColorId
    });
  };

  return (
    <Container fullSize className="overflow-visible">
      <div className="relative flex h-fit w-full flex-col sm:flex-row">
        <div className="flex h-fit w-full flex-col gap-20 border-r-[1px] border-primaryBlack bg-primaryWhite py-20 sm:w-1/2">
          {item?.images.map((image, idx) => (
            <div className="relative sm:h-screenWithoutHeader" key={image.id}>
              <Image
                src={image.url ?? ''}
                alt={`${item?.name} Photo ${idx}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
        <div className="sticky top-0 flex h-fit w-full items-center justify-center sm:min-h-screenWithoutHeader sm:w-1/2">
          <div className="flex w-[32rem] flex-col p-8">
            <LargeBodyText>
              <Bold>{item?.name}</Bold>
            </LargeBodyText>
            <div className="flex items-center gap-3">
              <BodyText>{item?.brand}</BodyText>
              <Dot />
              <BodyText>£{item?.price}</BodyText>
            </div>
            <div className="mt-10" />
            <BodyText className="max-w-md">{item?.description}</BodyText>
            <div className="mt-10" />
            <div className="flex flex-wrap gap-4">
              {item?.fabrics
                ? // item?.fabrics.map((fabric, idx) => (
                  // <BodyText key={`fabric-${idx}`}>
                  //   {fabric.percentage}% {fabric.name}
                  // </BodyText>
                  // ))
                  item.fabrics
                : '100% Worth It'}
            </div>
            <div className="mt-5" />
            <div className="flex gap-2">
              {item?.colors.map(color => (
                <ColorIndicator
                  {...color}
                  className="w-6"
                  key={color.name}
                  selected={color.id === selectedColorId}
                  onClick={() => setSelectedColorId(color.id)}
                />
              ))}
            </div>
            <div className="mt-5" />
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {filteredSizes?.map(size => (
                  <SizeIndicator
                    variant="outlined"
                    {...size}
                    key={size.name}
                    selected={size.id === selectedSizeId}
                    onClick={() => setSelectedSizeId(size.id)}
                  />
                ))}
              </div>
              <BodyText className="cursor-pointer underline">Size chart</BodyText>
            </div>
            <div className="mt-10" />
            <Button
              variant="outlined"
              className="flex items-center gap-2 px-5"
              onClick={handleAddToCart}
            >
              {selectedColorId && selectedSizeId ? (
                <>
                  <BodyText>Add to cart</BodyText>
                  <SvgIcon name="Cart" className="h-4 w-4" />
                </>
              ) : (
                <BodyText>Out of stock</BodyText>
              )}
            </Button>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center border-[1px] border-primaryBlack py-5">
        <LargeBodyText>
          <Bold>RELATED ITEMS</Bold>
        </LargeBodyText>
      </div>
      <ItemContainer>
        {items?.map(i => (
          <ItemCard {...i} key={i.id} />
        ))}
      </ItemContainer>
    </Container>
  );
};

export default Item;
