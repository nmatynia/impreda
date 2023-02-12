import React from 'react';
import clsxm from '../../utils/clsxm';
type InputProps = {
  placeholder: string;
  className?: string;
  password?: boolean;
  isValid?: boolean;
};

//TODO - add error message
export const Input = ({ placeholder, className, password, isValid = true }: InputProps) => {
  const [value, setValue] = React.useState('');
  return (
    <input
      onChange={e => setValue(e.target.value)}
      value={value}
      placeholder={placeholder}
      type={password ? 'password' : 'text'}
      className={clsxm(
        'text-base text-primaryWhite placeholder:text-primaryWhite',
        'flex-1 bg-transparent focus-within:outline-none',
        'border-b-[1px] border-b-primaryWhite pb-2',
        !isValid && 'border-b-red-400 text-red-400 placeholder:text-red-400',
        className
      )}
    />
  );
};
