import Image from 'next/image';
import React from 'react';
import DefaultTeeImg from '../../../public/images/default-tee.webp';
import clsxm from '../../utils/clsxm';
import { Dot } from '../dot/Dot';
import { SvgIcon } from '../icons/SvgIcon';
import { BodyText, Bold, SmallBodyText } from '../typography/Typography';
import styles from './ItemCard.module.scss';

export type ItemCardProps = {
  className?: string;
  brand: string;
  name: string;
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL')[];
  sex: 'man' | 'woman' | 'unisex';
  colors: {
    name: string;
    hex: string;
    available?: boolean;
  }[];
  price: number;
  saved: boolean;
};

export const ItemCard = ({
  name,
  price,
  saved,
  brand,
  className,
  sizes,
  colors
}: ItemCardProps) => {
  return (
    <div className={clsxm('border-[1px] border-primaryBlack', styles.itemCard)}>
      <div className="relative flex h-80 w-64 select-none flex-col justify-between p-6">
        <Image src={DefaultTeeImg.src} alt="holder" fill className="absolute -z-10 object-cover" />
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
            <SmallBodyText
              key={`size-${idx}`}
              className={clsxm(
                'flex aspect-square w-6 items-center justify-center rounded-md bg-primaryBlack p-1 text-primaryWhite',
                'cursor-pointer'
              )}
            >
              {size}
            </SmallBodyText>
          ))}
        </div>
        <div className="flex gap-2">
          {colors.map((color, idx) => (
            <div
              key={`size-${idx}`}
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
