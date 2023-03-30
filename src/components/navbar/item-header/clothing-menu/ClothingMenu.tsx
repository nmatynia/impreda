import Link from 'next/link';
import React, { useState } from 'react';
import clsxm from '../../../../utils/clsxm';
import { trpc } from '../../../../utils/trpc';
import type { BoxProps } from '../../../box/Box';
import { Box } from '../../../box/Box';
import { BodyText } from '../../../typography/Typography';

type ClothingMenuProps = {
  className?: string;
} & BoxProps;

// TODO: Underline current category that the user is on
export const ClothingMenu = ({ ...props }: ClothingMenuProps) => {
  const [sex, setSex] = useState<'men' | 'women'>('men');
  const { data: categories } = trpc.categories.getAllCategories.useQuery();

  return (
    <Box className={clsxm('absolute flex flex-col')} {...props}>
      <div className="grid grid-cols-2 gap-x-16 gap-y-1 normal-case">
        <button type="button" onClick={() => setSex('men')} className="mb-4 text-left">
          <BodyText
            className={clsxm(
              'cursor-pointer hover:underline',
              sex === 'men' && 'font-semibold underline'
            )}
          >
            Men
          </BodyText>
        </button>

        <button type="button" onClick={() => setSex('women')} className="mb-4 text-left">
          <BodyText
            className={clsxm(
              'cursor-pointer hover:underline',
              sex === 'women' && 'font-semibold underline'
            )}
          >
            Women
          </BodyText>
        </button>

        {categories &&
          categories.map(category => (
            <BodyText className={clsxm('cursor-pointer hover:underline')} key={category.name}>
              <Link href={`/shop?gender=${sex}&category=${category.name.toLowerCase()}`}>
                {category.name}
              </Link>
            </BodyText>
          ))}
      </div>
    </Box>
  );
};
