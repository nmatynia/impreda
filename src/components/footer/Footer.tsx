import React from 'react';
import clsxm from '../../utils/clsxm';
import { authorName, websiteName } from '../../utils/constants';
import { Dot } from '../dot/Dot';
import { LargeBodyText, LogoText } from '../typography/Typography';

type FooterProps = {
  className?: string;
};
export const Footer = ({ className }: FooterProps) => {
  return (
    <footer
      className={clsxm(
        'flex w-full gap-2 self-end bg-primaryBlack px-14 py-6 text-primaryWhite',
        className
      )}
    >
      <LogoText className="font-primary text-base font-black tracking-paragraph">
        {websiteName}
      </LogoText>
      <Dot className="bg-primaryWhite" />
      <LargeBodyText className="font-light">{authorName} </LargeBodyText>
    </footer>
  );
};
