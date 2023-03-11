import { useRouter } from 'next/router';
import React from 'react';
import { Container } from '../components/container/Container';
import { ItemCard, ItemProps } from '../components/item-card/ItemCard';
import { BodyText, Bold, SmallBodyText, LargeBodyText } from '../components/typography/Typography';
import { Dot } from '../components/dot/Dot';
import { SizeIndicator } from '../components/size-indicator/SizeIndicator';
import { Button } from '../components/button/Button';
import { SvgIcon } from '../components/icons/SvgIcon';
import Image from 'next/image';
import { ColorIndicator } from '../components/color-indicator/ColorIndicator';
import { ItemContainer } from '../components/items-container/ItemContainer';
import DefaultRickTeeImg from '../../public/images/default-rick-tee.webp';
import DefaultAlyxJacketImg from '../../public/images/default-alyx-jacket.webp';

const itemsHolder: ItemProps[] = [
  {
    id: '2',
    brand: 'Rick Owens',
    name: 'DRKSHDW Oversized Graphic T-Shirt',
    sex: 'man',
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
    saved: 21,
    images: [DefaultRickTeeImg.src]
  },
  {
    id: '4',
    brand: '1017 ALYX 9SM x Moncler',
    name: 'Almondis Jacket',
    sex: 'man',
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
    saved: 12,
    images: [DefaultAlyxJacketImg.src]
  }
];

itemsHolder.push(...itemsHolder);
itemsHolder.push(...itemsHolder);
itemsHolder.push(...itemsHolder);

const itemHolder: ItemProps = {
  id: '2312',
  brand: 'Rick Owens',
  name: 'DRKSHDW Oversized Graphic T-Shirt',
  sex: 'man',
  sizes: [
    { name: 'S', available: 1 },
    { name: 'M', available: 0 },
    { name: 'L', available: 1 },
    { name: 'XL', available: 1 }
  ],
  colors: [
    { name: 'Black', hex: '#000000', available: 1 },
    { name: 'White', hex: 'white', available: 3 }
  ],
  price: 30,
  saved: 321,
  images: [DefaultRickTeeImg.src, DefaultRickTeeImg.src],
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate, dui ornare pellentesque sodales, nulla est 
  semper metus, vel porttitor libero metus sed magna. Mauris vitae sapien nibh. Mauris lobortis, neque non tincidunt tincidunt, velit orci commodo neque, eu volutpat 
  elit justo vitae sem. Nulla pulvinar pharetra velit.`,
  fabrics: [
    { name: 'Cotton', percentage: 80 },
    { name: 'Nylon', percentage: 20 }
  ]
};

const Item = () => {
  const router = useRouter();
  const { item } = router.query;
  //TODO fetch item data based on item id
  //TODO selected size and color should have different variant selected
  return (
    <Container fullSize className="overflow-visible">
      <div className="relative flex h-fit w-full flex-col sm:flex-row">
        <div className="flex h-fit w-full flex-col gap-20 border-r-[1px] border-primaryBlack bg-primaryWhite py-20 sm:w-1/2">
          {itemHolder.images.map((image, idx) => (
            <div className="relative h-screenWithoutHeader">
              <Image
                src={image}
                alt={`${itemHolder.name} Photo ${idx}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
        <div className="sticky top-0 flex h-fit min-h-screenWithoutHeader w-full items-center justify-center sm:w-1/2">
          <div className="flex flex-col p-8">
            <LargeBodyText>
              <Bold>{itemHolder.name}</Bold>
            </LargeBodyText>
            <div className="flex items-center gap-3">
              <BodyText>{itemHolder.brand}</BodyText>
              <Dot />
              <BodyText>£{itemHolder.price}</BodyText>
            </div>
            <div className="mt-10" />
            <BodyText className="max-w-md">{itemHolder.description}</BodyText>
            <div className="mt-10" />
            <div className="flex flex-wrap gap-4">
              {itemHolder.fabrics
                ? itemHolder.fabrics.map(fabric => (
                    <BodyText>
                      {fabric.percentage}% {fabric.name}
                    </BodyText>
                  ))
                : '100% Worth It'}
            </div>
            <div className="mt-5" />
            <div className="flex gap-2">
              {itemHolder.colors.map(color => (
                <ColorIndicator {...color} className="w-6" />
              ))}
            </div>
            <div className="mt-5" />
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {itemHolder.sizes.map(size => (
                  <SizeIndicator variant="outlined" {...size} />
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
        {itemsHolder.map(item => (
          <ItemCard {...item} />
        ))}
      </ItemContainer>
    </Container>
  );
};

export default Item;
