import React from "react";
import { websiteName } from "../../utils/constants";
import { LogoText } from "../typography/Typography";

export const Header = () => {
  return (
    <div className="items-centet my-5 flex w-full justify-center">
      <LogoText>{websiteName}</LogoText>
    </div>
  );
};
