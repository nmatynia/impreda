import React, { useState } from 'react';
type OpenButtonProps = {
  className?: string;
  children: JSX.Element;
  elementToOpen: (open: boolean) => JSX.Element;
};
const OpenButton = ({ elementToOpen, children, className }: OpenButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={className}>
      <div onClick={() => setIsOpen(!isOpen)}>{children}</div>
      {elementToOpen(isOpen)}
    </div>
  );
};

export default OpenButton;
