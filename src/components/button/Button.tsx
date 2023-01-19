import React, { ReactNode } from 'react';
type ButtonProps = {
  children: ReactNode;
};
const Button = ({ children }: ButtonProps) => {
  return (
    <button className="rounded-md border-[1px] border-primaryBlack px-8 py-2">{children}</button>
  );
};

export default Button;
