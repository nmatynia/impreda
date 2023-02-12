import React from 'react';
import { Container } from '../components/container/Container';
import { ItemCard, ItemCardProps } from '../components/item-card/ItemCard';
import { ItemContainer } from '../components/items-container/ItemContainer';
import DefaultRickTeeImg from '../../public/images/default-rick-tee.webp';

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
    saved: true,
    image: DefaultRickTeeImg.src
  },
  {
    name: 'JDefault Tee',
    brand: 'Default Brand',
    sex: 'man',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Pereal Black', hex: '#000000' }],
    price: 30,
    saved: true,
    image: DefaultRickTeeImg.src
  }
];

items.push(...items);
items.push(...items);
items.push(...items);

const shop = () => {
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

export default shop;
