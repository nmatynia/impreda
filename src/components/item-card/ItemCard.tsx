import Image from 'next/image';
import React from 'react';
import clsxm from '../../utils/clsxm';
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
  }[];
  sex: 'man' | 'woman' | 'unisex';
  colors: {
    name: string;
    hex: string;
    available?: boolean;
  }[];
  price: number;
  saved: boolean;
  image: string;
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
  image,
  className
}: ItemCardProps) => {
  return (
    <div className={clsxm('border-[1px] border-primaryBlack', styles.itemCard, className)}>
      <div className="relative flex h-96 w-72 select-none flex-col justify-between p-6">
        <Image
          src={image}
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
        <BodyText>
          <Bold>{brand}</Bold>
        </BodyText>
        <BodyText>{name}</BodyText>
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
            <div
              key={`color-${idx}`}
              className={clsxm(
                'flex aspect-square w-4 items-center justify-center rounded-sm border-[1px] border-primaryBlack p-1',
                'cursor-pointer'
              )}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
