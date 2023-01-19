import React from 'react';
import clsxm from '../../../../utils/clsxm';
import Box, { BoxProps } from '../../../box/Box';
import { Bold, LargeBodyText } from '../../../typography/Typography';
import CartItem, { CartItemProps } from './CartItem';
import DefaultTee from '../../../../../public/images/default-tee.webp';
import Button from '../../../button/Button';
type CartProps = {
  className?: string;
} & BoxProps;

const hardCodedItems: CartItemProps[] = [
  {
    src: DefaultTee.src,
    designer: 'Norbert Matynia',
    name: 'Hardcode Hoodie',
    price: 180,
    quantity: 1
  },
  {
    src: DefaultTee.src,
    designer: 'Norbert Matynia',
    name: 'Hardcode Tee',
    price: 380,
    quantity: 2
  },
  {
    src: DefaultTee.src,
    designer: 'Adidas',
    name: 'Ye x Gap Hoodie',
    price: 300,
    quantity: 1
  },
  {
    src: DefaultTee.src,
    designer: 'Norbert Matynia',
    name: 'Hardcode Hoodie',
    price: 180,
    quantity: 1
  }
];
const total = 10500;

const Cart = ({ className, ...props }: CartProps) => {
  return (
    <Box className={clsxm('absolute w-[440px]', className)} {...props}>
      <div className="flex flex-col justify-between">
        <div className="mr-2 max-h-[500px] overflow-y-auto">
          {hardCodedItems.map((item, index) => (
            <CartItem
              key={`cart-item-${index}`}
              {...item}
              className="border-b-[1px] border-primaryBlack py-4 first:pt-0 "
            />
          ))}
        </div>
        <div className="flex items-center justify-between pt-8">
          <LargeBodyText>
            <Bold>Total: £{total}</Bold>
          </LargeBodyText>
          <Button>Checkout</Button>
        </div>
      </div>
    </Box>
  );
};

export default Cart;
