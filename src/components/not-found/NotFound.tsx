import React from 'react';
import { BodyText, LogoText } from '../typography/Typography';
import clsxm from '../../utils/clsxm';

type NotFoundProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export const NotFound = ({ title, subtitle, className }: NotFoundProps) => {
  return (
    <div
      className={clsxm('col-span-full mx-auto flex min-h-max max-w-md  justify-center', className)}
    >
      <div className="flex flex-col items-center gap-5 px-8 py-20 text-center">
        <LogoText>{title}</LogoText>
        {subtitle && <BodyText>{subtitle}</BodyText>}
      </div>
    </div>
  );
};
