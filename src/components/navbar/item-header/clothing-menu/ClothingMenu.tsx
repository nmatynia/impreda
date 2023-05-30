import Link from 'next/link';
import React, { Fragment, useState } from 'react';
import { inferProcedureOutput } from '@trpc/server';
import clsxm from '../../../../utils/clsxm';
import { trpc } from '../../../../utils/trpc';
import type { BoxProps } from '../../../box/Box';
import { Box } from '../../../box/Box';
import { BodyText } from '../../../typography/Typography';
import { CategoriesRouter } from '../../../../server/trpc/router/_app';
import { NotFound } from '../../../not-found/NotFound';
import { SexType } from '../../../../types/types';
import { ClothingMenuItemsSkeleton } from '../../../skeletons/ClothingMenuItemsSkeleton';

type ClothingMenuProps = {
  className?: string;
} & BoxProps;

export const ClothingMenu = ({ ...props }: ClothingMenuProps) => {
  const [sex, setSex] = useState<SexType>('MALE');
  const { data: categories, isLoading } = trpc.categories.getAllCategories.useQuery(true);

  return (
    <Box className={clsxm('absolute flex flex-col')} {...props}>
      <div className="grid grid-cols-2 gap-x-16 gap-y-1 normal-case">
        <button type="button" onClick={() => setSex('MALE')} className="mb-4 text-left">
          <BodyText
            className={clsxm(
              'cursor-pointer hover:underline',
              sex === 'MALE' && 'font-semibold underline'
            )}
          >
            Men
          </BodyText>
        </button>

        <button type="button" onClick={() => setSex('FEMALE')} className="mb-4 text-left">
          <BodyText
            className={clsxm(
              'cursor-pointer hover:underline',
              sex === 'FEMALE' && 'font-semibold underline'
            )}
          >
            Women
          </BodyText>
        </button>

        <ClothingMenuItems categories={categories} sex={sex} isLoading={isLoading} />
      </div>
    </Box>
  );
};

type Orders = inferProcedureOutput<CategoriesRouter['getAllCategories']> | undefined;
export const ClothingMenuItems = ({
  categories,
  isLoading,
  sex
}: {
  categories: Orders;
  isLoading: boolean;
  sex: SexType;
}) => {
  if (isLoading) {
    return <ClothingMenuItemsSkeleton />;
  }
  if (!categories) {
    return (
      <div className="z-10 col-span-full my-6 flex flex-col gap-6">
        <NotFound
          innerClassName="text-left items-start p-4 flex-wrap"
          className="m-0 max-w-[50vw] justify-start md:max-w-max"
          title="Please try again later."
          subtitle="It seems like there are no categories available at the moment"
        />
      </div>
    );
  }
  return (
    <>
      {categories.map(category => (
        <BodyText className={clsxm('cursor-pointer hover:underline')} key={category.name}>
          <Link href={`/shop?gender=${sex}&category=${category.name.toLowerCase()}`}>
            {category.name}
          </Link>
        </BodyText>
      ))}
    </>
  );
};
