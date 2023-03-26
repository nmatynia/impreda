import React, { useState } from 'react';
import { Container } from '../components/container/Container';
import { ItemCard, ItemCardSkeleton } from '../components/item-card/ItemCard';
import { ItemContainer } from '../components/items-container/ItemContainer';
import { ShopFilterPanel } from '../components/filter-panel/ShopFilterPanel';
import { trpc } from '../utils/trpc';

const ShopPage = () => {
  const [loading, setLoading] = useState(true);
  const { data: items } = trpc.items.getItems.useQuery(undefined, {
    onSuccess: () => setLoading(false)
  });

  return (
    <Container fullSize>
      <ShopFilterPanel sectionName={`Total: ${items?.length ?? 0}`} />
      <ItemContainer>
        {loading ? (
          <>
            <ItemCardSkeleton />
            <ItemCardSkeleton />
            <ItemCardSkeleton className="hidden md:block" />
            <ItemCardSkeleton className="hidden 2xl:block" />
          </>
        ) : (
          items?.map(item => <ItemCard {...item} sizes={item.sizes} key={item.id} />)
        )}
      </ItemContainer>
    </Container>
  );
};

export default ShopPage;
