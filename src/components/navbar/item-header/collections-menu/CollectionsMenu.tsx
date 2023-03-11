import Link from 'next/link';
import React from 'react';
import clsxm from '../../../../utils/clsxm';
import { Box, BoxProps } from '../../../box/Box';
import { BodyText } from '../../../typography/Typography';

const collections = [
  { name: 'FALL 2022 / OMNISPHERE' },
  { name: 'WINTER 2022 / DSTEP' },
  { name: 'SPRING 2023 / MESSAGE' },
  { name: 'SUMMER 2023 / SPIRIT' }
];
interface CollectionsMenuProps extends BoxProps {}

export const CollectionsMenu = ({ className, ...props }: CollectionsMenuProps) => {
  return (
    <Box className={clsxm('absolute flex flex-col', className)} {...props}>
      <ul className="flex flex-col gap-1">
        {collections.map((collection, index) => (
          <li key={`collection-${index}`} className="cursor-pointer hover:underline">
            <Link href={`/${encodeURIComponent(collection.name.toLowerCase())}`}>
              <BodyText>{collection.name}</BodyText>
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  );
};
