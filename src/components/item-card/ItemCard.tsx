import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import type { ColorsType, ImageType, SizesType } from '../../types/types';
import clsxm from '../../utils/clsxm';
import { ColorIndicator } from '../color-indicator/ColorIndicator';
import { SizeIndicator } from '../size-indicator/SizeIndicator';
import { BodyText, Bold } from '../typography/Typography';

export type ItemProps = {
  className?: string;
  id: string;
  brand: string;
  name: string;
  sizes: {
    name: 'XS' | 'S' | 'M' | 'L' | 'XL';
    available: number;
    colors?: {
      name: string;
      hex: string;
      available: number;
    }[];
  }[]; // Different table for both the size and color so it should be fine having it like that
  sex: 'man' | 'woman' | 'unisex';
  colors: {
    name: string;
    hex: string;
    available: number;
    sizes?: {
      name: 'XS' | 'S' | 'M' | 'L' | 'XL';
      available: number;
    }[];
  }[];
  price: number;
  saved: number;
  images: string[];
  description?: string;
  fabrics?: {
    name: string;
    percentage: number;
  }[];
  views?: number;
  category: string; // TODO change to enum
};

export type ItemCardProps = {
  id: string;
  brand: string;
  name: string;
  price: number;
  sizes: SizesType[];
  colors: ColorsType[];
  images: ImageType[];
  className?: string;
};

export const ItemCard = ({
  id,
  name,
  price,
  brand,
  sizes,
  colors,
  images,
  className
}: ItemCardProps) => {
  return (
    <div
      className={clsxm(
        'w-full bg-primaryWhite',
        'box-content border-[1px] border-t-0 border-primaryBlack',
        '[&:hover_.item-basic-info]:hidden [&:hover_.item-detail-info]:flex',
        className
      )}
    >
      <Link
        href={{ pathname: `/item/${id}` }}
        className="relative z-10 flex aspect-[0.75] w-full select-none flex-col justify-between p-6"
      >
        <Image
          src={images[0]?.url ?? ''} // TODO: Add holder img
          alt={name}
          fill
          className="absolute -z-10 object-cover p-3"
          sizes="288px"
        />
      </Link>
      <div
        className={clsxm(
          'item-basic-info flex h-24 flex-col items-center justify-center bg-primaryWhite p-4'
        )}
      >
        <BodyText className="text-center">
          <Bold>{brand}</Bold>
        </BodyText>
        <BodyText className="text-center">{name}</BodyText>
        <BodyText>£{price}</BodyText>
      </div>
      <div
        className={clsxm(
          'item-detail-info hidden h-24 flex-col items-center justify-center gap-4 bg-primaryWhite p-4'
        )}
      >
        <div className="flex gap-2">
          {sizes.map(size => (
            <SizeIndicator key={size.name} {...size} variant="outlined" />
          ))}
        </div>
        <div className="flex gap-2">
          {colors.map(({ name, available, hex }) => (
            <ColorIndicator key={name} available={available} hex={hex} name={name} />
          ))}
        </div>
      </div>
    </div>
  );
};
