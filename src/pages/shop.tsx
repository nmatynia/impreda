import React from 'react';
import { useRouter } from 'next/router';
import { Container } from '../components/container/Container';
import { ShopFilterPanel } from '../components/filter-panel/ShopFilterPanel';
import { trpc } from '../utils/trpc';
import ItemCardSection from '../components/item-card-section/ItemCardSection';

const ShoppingPage = () => {
  const router = useRouter();
  const {
    gender: sexNames,
    size: sizeNames,
    color: colorName,
    sortBy,
    fabric: fabricNames,
    category: categoryName
  } = router.query;
  const { data: items, isLoading } = trpc.items.getItems.useQuery({
    sexNames: !Array.isArray(sexNames) ? sexNames?.split(',') : undefined,
    colorNames: !Array.isArray(colorName) ? colorName?.split(',') : undefined,
    sizeNames: !Array.isArray(sizeNames)
      ? (sizeNames?.split(',') as ['XS' | 'S' | 'M' | 'L' | 'XL'])
      : undefined,
    sortBy: !Array.isArray(sortBy) ? sortBy : undefined,
    fabricNames: !Array.isArray(fabricNames) ? fabricNames?.split(',') : undefined,
    categoryNames: !Array.isArray(categoryName) ? categoryName?.split(',') : undefined
  });

  return (
    <Container fullSize>
      <ShopFilterPanel sectionName={`Total: ${items?.length ?? 0}`} />
      <ItemCardSection isLoading={isLoading} items={items} />
    </Container>
  );
};

export default ShoppingPage;
