import React from 'react';
import clsxm from '../../utils/clsxm';
import FilterPanel from '../filter-panel/FilterPanel';
import { ItemProps } from '../item-card/ItemCard';
import { ItemListItem } from './item-list-item/ItemListItem';

const itemList: ItemProps[] = [
  {
    id: '12324',
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
    saved: 23,
    views: 41,
    images: ['https://impreda-bucket.s3.eu-west-2.amazonaws.com/default-rick-tee.webp']
  },
  {
    id: '12321',
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
    saved: 23,
    views: 41,
    images: ['https://impreda-bucket.s3.eu-west-2.amazonaws.com/default-rick-tee.webp']
  }
];

type ItemListSectionProps = {
  className?: string;
};
const ItemListSection = ({ className }: ItemListSectionProps) => {
  return (
    <section className={clsxm('flex flex-col', className)}>
      <FilterPanel sectionName="Item List" />
      <div className="z-10 my-6 flex flex-col gap-6">
        {itemList.map(item => {
          return <ItemListItem item={item} key={'item-' + item.id} />;
        })}
      </div>
    </section>
  );
};

export default ItemListSection;
