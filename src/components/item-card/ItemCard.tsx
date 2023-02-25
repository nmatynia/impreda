import Image from 'next/image';
import React from 'react';
import clsxm from '../../utils/clsxm';
import { ColorIndicator } from '../color-indicator/ColorIndicator';
import { SizeIndicator } from '../size-indicator/SizeIndicator';
import { BodyText, Bold, SmallBodyText } from '../typography/Typography';
import styles from './ItemCard.module.scss';

export type ItemCardProps = {
  className?: string;
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
  saved: boolean;
  images: string[];
  description?: string;
  fabrics?: {
    name: string;
    percentage: number;
  }[];
};

export const ItemCard = ({
  name,
  price,
  saved,
  brand,
  sizes,
  colors,
  images,
  className
}: ItemCardProps) => {
  return (
    <div
      className={clsxm(
        'w-1/2 bg-primaryWhite md:w-1/3 2xl:w-1/4',
        // 'border-[1px] border-b-0 border-primaryBlack',
        // 'md:[&:nth-child(2n)]:border-x-0 md:[&:nth--last-child(1)]:border-b-[1px]',
        // 'relative -top-[1px] -left-1 ml-[-1px] mt-[-1px] outline outline-1 outline-primaryBlack',
        'shadow-outline',
        styles.itemCard,
        className
      )}
    >
      <div className="relative z-10 flex aspect-[0.75] w-full select-none flex-col justify-between p-6">
        <Image
          src={images[0]!}
          alt={name}
          fill
          className="absolute -z-10 object-cover p-3"
          sizes="288px"
        />
      </div>
      <div
        className={clsxm(
          'item-basic-info flex h-24 flex-col items-center justify-center bg-primaryWhite p-4',
          styles.itemBasicInfo
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
          'item-detail-info hidden h-24 flex-col items-center justify-center gap-4 bg-primaryWhite p-4',
          styles.itemDetailInfo
        )}
      >
        <div className="flex gap-2">
          {sizes.map((size, idx) => (
            <SizeIndicator key={`size-${idx}`} {...size} variant="outlined" />
          ))}
        </div>
        <div className="flex gap-2">
          {colors.map((color, idx) => (
            <ColorIndicator key={`color-${idx}`} {...color} />
          ))}
        </div>
      </div>
    </div>
  );
};
