import React from 'react';
import { Container } from '../components/container/Container';
import { ItemCard, ItemCardProps } from '../components/item-card/ItemCard';
import { ItemContainer } from '../components/items-container/ItemContainer';
import DefaultRickTeeImg from '../../public/images/default-rick-tee.webp';
import DefaultAlyxJacketImg from '../../public/images/default-alyx-jacket.webp';
import FilterPanel from '../components/filter-panel/FilterPanel';

const items: ItemCardProps[] = [
  {
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
    saved: true,
    images: [DefaultRickTeeImg.src]
  },
  {
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
    saved: true,
    images: [DefaultAlyxJacketImg.src]
  }
];

items.push(...items);
items.push(...items);
items.push(...items);

const shop = () => {
  return (
    <Container fullSize>
      <FilterPanel sectionName={`Total: ${items.length}`} className="mb-16 mt-0" />
      <ItemContainer>
        {items.map(item => (
          <ItemCard {...item} />
        ))}
      </ItemContainer>
    </Container>
  );
};

export default shop;
