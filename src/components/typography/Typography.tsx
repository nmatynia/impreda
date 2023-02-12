import React, { CSSProperties } from 'react';
import clsxm from '../../utils/clsxm';

export type TypographyVariant =
  | 'smallBody'
  | 'body'
  | 'largeBody'
  | 'bigHeading'
  | 'mediumHeading'
  | 'smallHeading'
  | 'logo'
  | 'bold';
export interface TypographyProps {
  variant?: TypographyVariant;
  as?:
    | 'p'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'span'
    | 'div'
    | 'section'
    | 'strong'
    | 'ul'
    | 'ol'
    | 'li'
    | 'b'
    | 'label';
  className?: string;
  children?: React.ReactNode;
  id?: string;
  style?: CSSProperties | undefined;
}

//old largeBody ['text-2xl', 'text-current', 'tracking-paragraph'],
export const variantToClasses: { [key in TypographyVariant]: string[] } = {
  smallBody: ['text-[10px]', 'md:text-xs', 'leading-4', 'text-current', 'tracking-paragraph'],
  body: ['text-xs sm:text-sm', 'leading-5', 'text-current', 'tracking-paragraph'],
  largeBody: ['text-base', 'leading-6', 'text-current', 'tracking-paragraph'],
  bigHeading: [
    'text-4xl',
    'sm:text-6xl',
    'md:text-5xl',
    'lg:text-7xl',
    'text-current',
    'tracking-paragraph'
  ],
  mediumHeading: [],
  smallHeading: [],
  bold: ['font-bold'],
  logo: ['tracking-[0.15em]', 'text-current', 'uppercase', 'font-primary', 'font-black']
};
/**
 * Simple typography component
 */
export function Typography({
  variant = 'body',
  as = 'p',
  className,
  children,
  ...rest
}: TypographyProps) {
  return React.createElement(
    as,
    {
      className: clsxm(variantToClasses[variant], className),
      ...rest
    },
    children
  );
}

export function Bold({
  as = 'b',
  variant = 'bold',
  className,
  children,
  ...rest
}: TypographyProps) {
  return React.createElement(
    as,
    { className: clsxm(variantToClasses[variant], className), ...rest },
    children
  );
}

export type TypographyPropsWithoutVariant = Omit<TypographyProps, 'variant'>;

export const SmallBodyText = (props: TypographyPropsWithoutVariant) => (
  <Typography variant="smallBody" as="p" {...props} />
);

export const BodyText = (props: TypographyPropsWithoutVariant) => (
  <Typography variant="body" as="p" {...props} />
);

export const LargeBodyText = (props: TypographyPropsWithoutVariant) => (
  <Typography variant="largeBody" as="p" {...props} />
);

export const PageTitle = (props: TypographyPropsWithoutVariant) => {
  const { className, ...rest } = props;
  return (
    <Typography
      variant="bigHeading"
      as="h1"
      className={clsxm(
        'text-superWhite',
        'font-medium',
        'tracking-wide',
        'text-center',
        'whitespace-pre-line',
        'uppercase',
        className
      )}
      {...rest}
    />
  );
};

export const LogoText = (props: TypographyPropsWithoutVariant & { inheritSize?: boolean }) => {
  const { className, inheritSize, ...rest } = props;
  return (
    <Typography
      variant="logo"
      as="span"
      className={clsxm('inline-block', !inheritSize && 'text-2xl', className)}
      {...rest}
    />
  );
};
export const BigHeading = (props: TypographyPropsWithoutVariant) => (
  <Typography variant="bigHeading" as="h1" {...props} />
);

export const MediumHeading = (props: TypographyPropsWithoutVariant) => (
  <Typography variant="mediumHeading" as="h2" {...props} />
);

export const SmallHeading = (props: TypographyPropsWithoutVariant) => (
  <Typography variant="smallHeading" as="h3" {...props} />
);
