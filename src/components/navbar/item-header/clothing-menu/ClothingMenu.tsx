import Link from 'next/link';
import React, { useState } from 'react';
import clsxm from '../../../../utils/clsxm';
import Box, { BoxProps } from '../../../box/Box';
import { BodyText, SmallBodyText } from '../../../typography/Typography';
type ClothingMenuProps = {
  className?: string;
} & BoxProps;

const categories = [
  {
    name: 'Outerwear'
  },
  {
    name: 'Denim'
  },
  {
    name: 'T-Shirts'
  },
  {
    name: 'Denim'
  },
  {
    name: 'Denim'
  },
  {
    name: 'Denim'
  }
];

//TODO: Underline current category that the user is on

const ClothingMenu = ({ ...props }) => {
  const [gender, setGender] = useState<'men' | 'women'>('men');

  return (
    <Box className={clsxm('absolute flex flex-col')} {...props}>
      <div className="grid grid-cols-2 gap-x-16 gap-y-1 normal-case">
        <button onClick={() => setGender('men')} className="mb-4 text-left">
          <SmallBodyText
            className={clsxm(
              'cursor-pointer hover:underline',
              gender === 'men' && 'font-semibold underline'
            )}
          >
            Men
          </SmallBodyText>
        </button>

        <button onClick={() => setGender('women')} className="mb-4 text-left">
          <SmallBodyText
            className={clsxm(
              'cursor-pointer hover:underline',
              gender === 'women' && 'font-semibold underline'
            )}
          >
            Women
          </SmallBodyText>
        </button>

        {categories.map((category, index) => (
          <SmallBodyText
            className={clsxm('cursor-pointer hover:underline')}
            key={`category-${index}`}
          >
            <Link href={`/${gender}/${category.name.toLowerCase()}`}>{category.name}</Link>
          </SmallBodyText>
        ))}
      </div>
    </Box>
  );
};

export default ClothingMenu;
