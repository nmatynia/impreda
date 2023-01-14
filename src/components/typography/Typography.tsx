import clsx from "clsx";
import React, { CSSProperties } from "react";

export type TypographyVariant =
  | "body"
  | "bigBody"
  | "bigHeading"
  | "mediumHeading"
  | "smallHeading"
  | "bold";
export interface TypographyProps {
  variant?: TypographyVariant;
  as?:
    | "p"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "span"
    | "div"
    | "section"
    | "strong"
    | "ul"
    | "ol"
    | "li"
    | "b";
  className?: string;
  children?: React.ReactNode;
  id?: string;
  style?: CSSProperties | undefined;
}
export const variantToClasses: { [key in TypographyVariant]: string[] } = {
  body: ["text-base", "leading-6", "text-current", "tracking-wide"],
  bigBody: [],
  bigHeading: [],
  mediumHeading: [],
  smallHeading: [],
  bold: [],
};

/**
 * Simple typography component
 */
export function Typography({
  variant = "body",
  as = "p",
  className,
  children,
  ...rest
}: TypographyProps) {
  return React.createElement(
    as,
    {
      className: clsx(variantToClasses[variant], className),
      ...rest,
    },
    children
  );
}

export function Bold({
  as = "b",
  variant = "bold",
  className,
  children,
  ...rest
}: TypographyProps) {
  return React.createElement(
    as,
    { className: clsx(variantToClasses[variant], className), ...rest },
    children
  );
}

export type TypographyPropsWithoutVariant = Omit<TypographyProps, "variant">;

export const BodyText = (props: TypographyPropsWithoutVariant) => (
  <Typography variant="body" as="p" {...props} />
);

export const PageTitle = (props: TypographyPropsWithoutVariant) => {
  const { className, ...rest } = props;
  return (
    <Typography
      variant="bigHeading"
      as="h1"
      className={clsx(
        "text-superWhite",
        "font-medium",
        "tracking-wide",
        "text-center",
        "whitespace-pre-line",
        "uppercase",
        className
      )}
      {...rest}
    />
  );
};

export const BigHeading = (props: TypographyPropsWithoutVariant) => (
  <Typography variant="bigHeading" as="h2" {...props} />
);

export const MediumHeading = (props: TypographyPropsWithoutVariant) => (
  <Typography variant="mediumHeading" as="h3" {...props} />
);

export const SmallHeading = (props: TypographyPropsWithoutVariant) => (
  <Typography variant="smallHeading" as="h4" {...props} />
);
