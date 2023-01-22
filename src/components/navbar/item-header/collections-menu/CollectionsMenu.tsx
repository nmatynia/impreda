import Link from 'next/link';
import React from 'react';
import clsxm from '../../../../utils/clsxm';
import Box, { BoxProps } from '../../../box/Box';

const collections = [
  { name: 'FALL 2022 / OMNISPHERE' },
  { name: 'WINTER 2022 / DSTEP' },
  { name: 'SPRING 2023 / MESSAGE' },
  { name: 'SUMMER 2023 / SPIRIT' }
];
interface CollectionsMenuProps extends BoxProps {}

const CollectionsMenu = ({ className, ...props }: CollectionsMenuProps) => {
  return (
    <Box className={clsxm('absolute flex flex-col', className)} {...props}>
      <ul className="flex flex-col gap-1">
        {collections.map((collection, index) => (
          <li key={`collection-${index}`} className="cursor-pointer hover:underline">
            <Link href={`/${encodeURIComponent(collection.name.toLowerCase())}`}>
              {collection.name}
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default CollectionsMenu;
