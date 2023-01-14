import React from "react";
import { BodyText } from "../typography/Typography";

export const ItemHeader = () => {
  return (
    <div className="flex w-full justify-around border-y-[1px] border-primaryBlack uppercase">
      <BodyText>New Arrivals</BodyText>
      <BodyText>Clothing</BodyText>
      <BodyText>Collections</BodyText>
      <BodyText>Sale</BodyText>
    </div>
  );
};
