import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { Container } from '../components/container/Container';
import { ShopFilterPanel } from '../components/filter-panel/ShopFilterPanel';
import { trpc } from '../utils/trpc';
import { SexType, SizeNameType } from '../types/types';
import ItemCardSection from '../components/item-card-section/ItemCardSection';

const ShopPage = () => {
  const {
    gender: sexQuery,
    category: categoryName,
    size: sizesNames,
    color: colorNames
  } = useRouter().query;

  // TODO: enhance this stuff
  const sex = useMemo<SexType | undefined>(() => {
    switch (sexQuery) {
      case 'men': {
        return 'MALE';
      }
      case 'women': {
        return 'FEMALE';
      }
      default: {
        return undefined;
      }
    }
  }, [sexQuery]);

  const { data: items, isLoading } = trpc.items.getItems.useQuery({
    sex,
    categoryName: categoryName as string | undefined,
    sizesNames: sizesNames as SizeNameType[] | undefined,
    colorsNames: colorNames as string[]
  });

  return (
    <Container fullSize>
      <ShopFilterPanel sectionName={`Total: ${items?.length ?? 0}`} />
      <ItemCardSection isLoading={isLoading} items={items} />
    </Container>
  );
};

export default ShopPage;
