import Link from 'next/link';
import React, { AnchorHTMLAttributes, ReactNode } from 'react';
import clsxm from '../../utils/clsxm';

type LinkButtonProps = {
  children: ReactNode;
  variant?: LinkButtonVariant;
  className?: string;
  href: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;
type LinkButtonVariant = 'primary' | 'outlined';

const linkButtonVariant = {
  primary: 'bg-primaryBlack text-primaryWhite',
  outlined: 'border-[1px] border-primaryBlack text-primaryBlack'
};

export const LinkButton = ({
  children,
  variant = 'primary',
  className,
  href,
  ...rest
}: LinkButtonProps) => {
  return (
    <Link
      href={href}
      className={clsxm('w-fit rounded-md px-8 py-2', linkButtonVariant[variant], className)}
      {...rest}
    >
      {children}
    </Link>
  );
};
