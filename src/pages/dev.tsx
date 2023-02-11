import React from 'react';
import { string } from 'zod';
import { Container } from '../components/container/Container';
import FilterMenu from '../components/filter-menu/FilterMenu';
import { ItemCard, ItemCardProps } from '../components/item-card/ItemCard';
import { ItemContainer } from '../components/items-container/ItemContainer';
import { Layout } from '../components/layout/Layout';
const items: ItemCardProps[] = [
  {
    name: 'JDefault Tee',
    brand: 'Default Brand',
    sex: 'man',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Pereal Black', hex: '#000000' }],
    price: 30,
    saved: true
  },
  {
    name: 'JDefault Tee',
    brand: 'Default Brand',
    sex: 'man',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Pereal Black', hex: '#000000' }],
    price: 30,
    saved: true
  }
];
const dev = () => {
  return (
    <Container>
      <ItemContainer>
        {items.map(item => (
          <ItemCard {...item} />
        ))}
      </ItemContainer>
    </Container>
  );
};

export default dev;
