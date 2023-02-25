import { useRouter } from 'next/router';
import React from 'react';
import { Container } from '../components/container/Container';
import { ItemCardProps } from '../components/item-card/ItemCard';
import DefaultRickTeeImg from '../../public/images/default-rick-tee.webp';
import { BodyText, Bold, LargeBodyText, SmallBodyText } from '../components/typography/Typography';
import { Dot } from '../components/dot/Dot';
import { SizeIndicator } from '../components/size-indicator/SizeIndicator';
import Button from '../components/button/Button';
import { SvgIcon } from '../components/icons/SvgIcon';
import Image from 'next/image';

const itemHolder: ItemCardProps = {
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
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: 'white' }
  ],
  price: 30,
  saved: true,
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
        <div className="mt-20 flex h-fit w-full flex-col gap-20 bg-primaryWhite sm:w-1/2">
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
        <div className="sticky top-0 flex h-screenWithoutHeader w-full items-center justify-center sm:w-1/2">
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
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {itemHolder.sizes.map(size => (
                  <SizeIndicator variant="outlined" {...size} />
                ))}
              </div>
              <BodyText className="cursor-pointer underline">Size chart</BodyText>
            </div>
            <div className="mt-2" />
            <Button variant="outlined" className="flex items-center gap-2 px-5">
              <BodyText>Add to cart</BodyText>
              <SvgIcon name="Cart" className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Item;
