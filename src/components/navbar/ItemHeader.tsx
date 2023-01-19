import React from 'react';
import { BodyText } from '../typography/Typography';

export const ItemHeader = () => {
  return (
    <div className="flex w-full justify-around border-y-[1px] border-primaryBlack uppercase">
      <BodyText className="cursor-pointer">New Arrivals</BodyText>
      <BodyText className="cursor-pointer">Clothing</BodyText>
      <BodyText className="cursor-pointer">Collections</BodyText>
      <BodyText className="cursor-pointer">Sale</BodyText>
    </div>
  );
};
