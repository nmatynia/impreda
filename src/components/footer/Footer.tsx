import clsx from "clsx";
import React from "react";
import { BodyText } from "../typography/Typography";

type FooterProps = {
  className?: string;
};
export const Footer = ({ className }: FooterProps) => {
  return (
    <div className={clsx("w-full bg-primaryBlack", className)}>
      <BodyText className="text-primaryWhite">Impreda</BodyText>
    </div>
  );
};
