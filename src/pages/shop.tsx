import React from 'react';
import { Container } from '../components/container/Container';
import { ItemCard, ItemCardProps } from '../components/item-card/ItemCard';
import { ItemContainer } from '../components/items-container/ItemContainer';
const items: ItemCardProps[] = [
  {
    name: 'JDefault Tee',
    brand: 'Default Brand',
    sex: 'man',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Pereal Black', hex: '#000000' },
      { name: 'Pink', hex: '#FFC0CB' }
    ],
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

items.push(...items);
items.push(...items);
items.push(...items);

const shop = () => {
  return (
    <Container className="my-6">
      <ItemContainer>
        {items.map(item => (
          <ItemCard {...item} />
        ))}
      </ItemContainer>
    </Container>
  );
};

export default shop;
