/* eslint-disable no-nested-ternary */
import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { inferProcedureOutput } from '@trpc/server/dist/core/types';
import { Container } from '../components/container/Container';
import { ItemCard, ItemCardSkeleton } from '../components/item-card/ItemCard';
import { ItemContainer } from '../components/items-container/ItemContainer';
import { ShopFilterPanel } from '../components/filter-panel/ShopFilterPanel';
import { trpc } from '../utils/trpc';
import { SexType, SizeNameType } from '../types/types';
import { ItemsRouter } from '../server/trpc/router/_app';
import { BodyText, LogoText } from '../components/typography/Typography';
import { NotFound } from '../components/not-found/NotFound';

const ShopPage = () => {
  const {
    gender: sexQuery,
    category: categoryName,
    size: sizesNames,
    color: colorNames
  } = useRouter().query;

  const sex = useMemo<SexType | undefined>(() => {
    switch (sexQuery) {
      case 'men': {
        return 'MALE';
      }
      case 'women': {
        return 'FEMALE';
      }
      default: {
        return 'UNISEX';
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
      <ItemContainer>
        <ItemContainerContent isLoading={isLoading} items={items} />
      </ItemContainer>
    </Container>
  );
};

export const ItemContainerContent = ({
  isLoading,
  items
}: {
  isLoading: boolean;
  items: inferProcedureOutput<ItemsRouter['getItems']> | undefined;
}) => {
  if (isLoading) {
    return (
      <>
        <ItemCardSkeleton />
        <ItemCardSkeleton />
        <ItemCardSkeleton className="hidden md:block" />
        <ItemCardSkeleton className="hidden 2xl:block" />
      </>
    );
  }

  if (!items || items.length === 0) {
    return (
      <NotFound
        title="We couldn't find any item that you're looking for."
        subtitle="Explore our exquisite selection products and find something equally special."
      />
    );
  }

  return (
    <>
      {items.map(item => (
        <ItemCard {...item} key={item.id} />
      ))}
    </>
  );
};

export default ShopPage;
