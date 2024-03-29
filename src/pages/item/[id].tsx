import React, { useEffect, useMemo } from 'react';
import Image from 'next/image';
import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import superjson from 'superjson';
import { TRPCError } from '@trpc/server';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { PrismaClient } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
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
import ItemCardSection from '../../components/item-card-section/ItemCardSection';
import { SizeChartDialog } from '../../components/size-chart-dialog/SizeChartDialog';

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

const ItemPage = ({ id }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const router = useRouter();
  const { data: item } = trpc.items.getItem.useQuery(id as string);
  const { data: items, isLoading: isOrdersLoading } = trpc.items.getItems.useQuery({});
  const { mutateAsync: incrementViewCount } = trpc.items.incrementItemViewCount.useMutation();

  // sort sizes on backend
  // reserve item for a user?
  const [selectedColorId, setSelectedColorId] = React.useState<string | undefined>(
    item?.colors[0]?.id
  );
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const filteredSizes = useMemo(
    () => item?.colors.find(color => color.id === selectedColorId)?.sizes,
    [item, selectedColorId]
  );

  const [selectedSizeId, setSelectedSizeId] = React.useState<string | undefined>(
    filteredSizes?.filter(size => size.available > 0)?.[0]?.id
  );

  const utils = trpc.useContext();
  const { mutateAsync: addToCart, isLoading: isAddToCartLoading } = trpc.cart.addToCart.useMutation(
    {
      onSuccess: () => {
        utils.cart.invalidate();
      }
    }
  );
  const handleAddToCart = async () => {
    if (!(selectedSizeId && selectedColorId && item)) {
      return;
    }
    if (!isLoggedIn) {
      const callbackUrl = router.asPath;
      router.push(`/login?callbackUrl=${callbackUrl}`);
      return;
    }
    await addToCart({
      itemId: id,
      sizeId: selectedSizeId,
      colorId: selectedColorId
    });
  };

  useEffect(() => {
    setSelectedSizeId(filteredSizes?.[0]?.id);
  }, [filteredSizes]);

  useEffect(() => {
    incrementViewCount(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Container fullSize className="overflow-visible">
        <div className="relative flex h-fit w-full flex-col sm:flex-row">
          <div className="flex h-fit w-full flex-col gap-20 border-r-[1px] border-primaryBlack bg-primaryWhite py-20 sm:w-1/2">
            {item?.images.map((image, idx) => (
              <div
                className="relative h-screenWithoutHeaderMobile sm:h-screenWithoutHeader"
                key={image.id}
              >
                <Image
                  src={image.url ?? ''}
                  alt={`${item?.name} Photo ${idx}`}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  fill
                  className="object-contain"
                  priority
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
                {item?.colors.map(({ name, id, hex, available }) => (
                  <ColorIndicator
                    key={id}
                    className="w-6"
                    name={name}
                    available={available}
                    hex={hex}
                    selected={id === selectedColorId}
                    onClick={() => setSelectedColorId(id)}
                  />
                ))}
              </div>
              <div className="mt-5" />
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {filteredSizes?.map(({ available, name, id }) => (
                    <SizeIndicator
                      key={id}
                      name={name}
                      available={available}
                      variant="outlined"
                      selected={id === selectedSizeId}
                      onClick={() => setSelectedSizeId(id)}
                    />
                  ))}
                </div>
                <button type="button" onClick={() => setIsDialogOpen(true)}>
                  <BodyText className="cursor-pointer underline">Size chart</BodyText>
                </button>
              </div>
              <div className="mt-10" />
              <Button
                variant="outlined"
                className="flex items-center gap-2 px-5"
                onClick={handleAddToCart}
                isLoading={isAddToCartLoading}
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
        <ItemCardSection items={items} isLoading={isOrdersLoading} />
      </Container>
      <SizeChartDialog
        isDialogOpen={isDialogOpen}
        handleCloseDialog={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default ItemPage;
