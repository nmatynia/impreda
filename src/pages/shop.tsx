import React from 'react';
import { Container } from '../components/container/Container';
import type { ItemProps } from '../components/item-card/ItemCard';
import { ItemCard } from '../components/item-card/ItemCard';
import { ItemContainer } from '../components/items-container/ItemContainer';
import DefaultRickTeeImg from '../../public/images/default-rick-tee.webp';
import DefaultAlyxJacketImg from '../../public/images/default-alyx-jacket.webp';
import { ShopFilterPanel } from '../components/filter-panel/ShopFilterPanel';

const items: ItemProps[] = [
  {
    id: '231',
    brand: 'Rick Owens',
    name: 'DRKSHDW Oversized Graphic T-Shirt',
    sex: 'man',
    sizes: [
      { name: 'S', available: 1 },
      { name: 'M', available: 1 },
      { name: 'L', available: 1 },
      { name: 'XL', available: 1 }
    ],
    colors: [
      { name: 'Black', hex: '#000000', available: 1 },
      { name: 'White', hex: 'white', available: 0 }
    ],
    price: 30,
    saved: 31,
    images: [DefaultRickTeeImg.src],
    category: 't-shirt'
  },
  {
    id: '231',
    brand: '1017 ALYX 9SM x Moncler',
    name: 'Almondis Jacket',
    sex: 'man',
    sizes: [
      { name: 'S', available: 1 },
      { name: 'M', available: 1 },
      { name: 'L', available: 1 },
      { name: 'XL', available: 1 }
    ],
    colors: [
      { name: 'Black', hex: '#000000', available: 0 },
      { name: 'White', hex: 'white', available: 0 },
      { name: 'Red', hex: '#dc2626', available: 0 } // hex for neutral red -
    ],
    price: 30,
    saved: 12,
    images: [DefaultAlyxJacketImg.src],
    category: 't-shirt'
  }
];

items.push(...items);
items.push(...items);
items.push(...items);

const shop = () => {
  return (
    <Container fullSize>
      <ShopFilterPanel sectionName={`Total: ${items.length}`} />
      <ItemContainer>
        {items.map(item => (
          <ItemCard {...item} key={item.id} />
        ))}
      </ItemContainer>
    </Container>
  );
};

export default shop;
