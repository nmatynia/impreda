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
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: 'white' }
    ],
    price: 30,
    saved: true,
    image: DefaultRickTeeImg.src
  },
  {
    brand: '1017 ALYX 9SM x Moncler',
    name: 'Almondis Jacket',
    sex: 'man',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: 'white' },
      { name: 'Red', hex: '#dc2626' } // hex for neutral red -
    ],
    price: 30,
    saved: true,
    image: DefaultAlyxJacketImg.src
  }
];

items.push(...items);
items.push(...items);
items.push(...items);

const shop = () => {
  return (
    <Container className="max-w-[1600px]">
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
