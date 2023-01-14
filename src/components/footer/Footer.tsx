import { env } from "process";
import React from "react";
import clsxm from "../../utils/clsxm";
import { authorName, websiteName } from "../../utils/constants";
import { Dot } from "../dot/Dot";
import { BodyText, LogoText } from "../typography/Typography";

type FooterProps = {
  className?: string;
};
export const Footer = ({ className }: FooterProps) => {
  return (
    <div
      className={clsxm(
        "flex w-full gap-2 bg-primaryBlack px-14 py-6 text-primaryWhite",
        className
      )}
    >
      <LogoText className="tracking-paragraph font-primary text-base font-black">
        {websiteName}
      </LogoText>
      <Dot className="bg-primaryWhite" />
      <BodyText className="font-light">{authorName} </BodyText>
    </div>
  );
};
