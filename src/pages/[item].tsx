import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Image from 'next/image';
import { Container } from '../components/container/Container';
import type { ItemProps } from '../components/item-card/ItemCard';
import { ItemCard } from '../components/item-card/ItemCard';
import { BodyText, Bold, LargeBodyText } from '../components/typography/Typography';
import { Dot } from '../components/dot/Dot';
import { SizeIndicator } from '../components/size-indicator/SizeIndicator';
import { Button } from '../components/button/Button';
import { SvgIcon } from '../components/icons/SvgIcon';
import { ColorIndicator } from '../components/color-indicator/ColorIndicator';
import { ItemContainer } from '../components/items-container/ItemContainer';
import DefaultRickTeeImg from '../../public/images/default-rick-tee.webp';
import DefaultAlyxJacketImg from '../../public/images/default-alyx-jacket.webp';
import { trpc } from '../utils/trpc';
import { ItemType } from '../types/types';

const itemsHolder: ItemType[] = [
  {
    id: '2',
    brand: 'Rick Owens',
    name: 'DRKSHDW Oversized Graphic T-Shirt',
    sex: 'MALE',
    sizes: [
      { name: 'S', available: 1 },
      { name: 'M', available: 1 },
      { name: 'L', available: 1 },
      { name: 'XL', available: 1 }
    ],
    colors: [
      { name: 'Black', hex: '#000000', available: 1 },
      { name: 'White', hex: 'white', available: 0 }
    ],
    price: 30,
    savedBy: 21,
    images: [
      {
        id: '2',
        filename: 'default-alyx-jacket.webp',
        url: DefaultRickTeeImg.src
      }
    ],
    category: {
      id: '1',
      name: 't-shirt'
    }
  },
  {
    id: '4',
    brand: '1017 ALYX 9SM x Moncler',
    name: 'Almondis Jacket',
    sex: 'MALE',
    sizes: [
      { name: 'S', available: 1 },
      { name: 'M', available: 1 },
      { name: 'L', available: 1 },
      { name: 'XL', available: 1 }
    ],
    colors: [
      { name: 'Black', hex: '#000000', available: 0 },
      { name: 'White', hex: 'white', available: 0 },
      { name: 'Red', hex: '#dc2626', available: 0 } // hex for neutral red -
    ],
    price: 30,
    savedBy: 1,
    images: [
      {
        id: '2',
        filename: 'default-alyx-jacket.webp',
        url: DefaultAlyxJacketImg.src
      }
    ],
    category: {
      id: '1',
      name: 'jacket'
    }
  }
];

itemsHolder.push(...itemsHolder);
itemsHolder.push(...itemsHolder);
itemsHolder.push(...itemsHolder);

const Item = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);

  const { data: item } = trpc.items.getItem.useQuery((id as string) || '', {
    onSuccess: () => setLoading(false)
  });

  // TODO fetch item data based on item id
  // TODO selected size and color should have different variant selected
  return (
    <Container fullSize className="overflow-visible">
      <div className="relative flex h-fit w-full flex-col sm:flex-row">
        <div className="flex h-fit w-full flex-col gap-20 border-r-[1px] border-primaryBlack bg-primaryWhite py-20 sm:w-1/2">
          {item?.images.map((image, idx) => (
            <div className="relative h-screenWithoutHeader" key={image.id}>
              <Image
                src={image.url ?? ''}
                alt={`${item?.name} Photo ${idx}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
        <div className="sticky top-0 flex h-fit min-h-screenWithoutHeader w-full items-center justify-center sm:w-1/2">
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
                <ColorIndicator {...color} className="w-6" key={color.name} />
              ))}
            </div>
            <div className="mt-5" />
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {item?.sizes.map(size => (
                  <SizeIndicator variant="outlined" {...size} key={size.name} />
                ))}
              </div>
              <BodyText className="cursor-pointer underline">Size chart</BodyText>
            </div>
            <div className="mt-10" />
            <Button variant="outlined" className="flex items-center gap-2 px-5">
              <BodyText>Add to cart</BodyText>
              <SvgIcon name="Cart" className="h-4 w-4" />
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
        {itemsHolder.map(i => (
          <ItemCard {...i} key={i.id} />
        ))}
      </ItemContainer>
    </Container>
  );
};

export default Item;
