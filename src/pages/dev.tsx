import React from 'react';
import { string } from 'zod';
import FilterMenu from '../components/filter-menu/FilterMenu';
import { ItemCard, ItemCardProps } from '../components/item-card/ItemCard';
import { ItemContainer } from '../components/items-container/ItemContainer';
import { Layout } from '../components/layout/Layout';
const items: ItemCardProps[] = [
  {
    name: 'JDefault Tee',
    brand: 'Default Brand',
    price: 30,
    saved: true
  },
  {
    name: 'JDefault Tee',
    brand: 'Default Brand',
    price: 300,
    saved: true
  }
];
const dev = () => {
  return (
    <div>
      <ItemContainer>
        {items.map(item => (
          <ItemCard {...item} />
        ))}
      </ItemContainer>
    </div>
  );
};

export default dev;
