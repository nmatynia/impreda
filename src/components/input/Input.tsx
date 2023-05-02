import type { ForwardedRef, InputHTMLAttributes } from 'react';
import React from 'react';
import clsxm from '../../utils/clsxm';
import { SvgIcon } from '../icons/SvgIcon';
import { BodyText } from '../typography/Typography';
import styles from './Input.module.scss';

export type InputProps = {
  label?: string;
  placeholder: string;
  className?: string;
  innerClassName?: string;
  password?: boolean;
  color?: InputColorVariant;
  isInvalid?: boolean;
  isLoading?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

type InputColorVariant = 'black' | 'white';

const colorVariant = {
  white: 'text-primaryWhite border-primaryWhite placeholder:text-gray-400',
  black:
    'text-primaryBlack placeholder:text-gray-400 focus-within:border-primaryBlack border-gray-400'
};

// eslint-disable-next-line react/display-name
export const Input = React.forwardRef(
  (
    {
      label,
      placeholder,
      className,
      innerClassName,
      color = 'black',
      isInvalid = false,
      isLoading,
      type,
      ...rest
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    if (isLoading) {
      return <div className={clsxm('h-14 w-full animate-pulse bg-primaryBlack/50', className)} />;
    }
    return (
      <div className={clsxm('relative flex h-14 w-full flex-col', className)}>
        {label && <BodyText as="label">{label}</BodyText>}
        <input
          placeholder={placeholder}
          type={type}
          min={type === 'number' ? 0 : undefined}
          className={clsxm(
            'w-full',
            'text-xs sm:text-sm',
            'flex-1 bg-transparent focus-within:outline-none',
            'border-b-[1px] pb-2',
            colorVariant[color],
            styles.input,
            isInvalid &&
              'border-b-red-500 text-red-500 placeholder:text-red-500 focus-within:placeholder:text-primaryBlack [&:focus-within~svg]:text-primaryBlack',
            innerClassName
          )}
          ref={ref}
          {...rest}
        />
        {type === 'number' && (
          <>
            <SvgIcon
              name="ChevronDown"
              className={clsxm(
                'absolute bottom-5 right-[2.5px] -z-10 h-3 w-3 rotate-180',
                isInvalid && 'text-red-500'
              )}
            />
            <SvgIcon
              name="ChevronDown"
              className={clsxm(
                'absolute bottom-2 right-[2.5px] -z-10 h-3 w-3',
                isInvalid && 'text-red-500'
              )}
            />
          </>
        )}
      </div>
    );
  }
);
