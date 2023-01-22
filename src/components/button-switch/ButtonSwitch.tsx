import React, { useEffect, useRef, useState } from 'react';
type OpenButtonProps = {
  className?: string;
  children: JSX.Element;
  elementToOpen: (open: boolean) => JSX.Element;
};
const ButtonSwitch = ({ elementToOpen, children, className }: OpenButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const clickOutsideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeDropdown = (e: any) => {
      if (!clickOutsideRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.body.addEventListener('mousedown', closeDropdown);

    return () => document.body.removeEventListener('mousedown', closeDropdown);
  }, [clickOutsideRef, setIsOpen]);

  return (
    <div className={className} ref={clickOutsideRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{children}</div>
      {elementToOpen(isOpen)}
    </div>
  );
};

export default ButtonSwitch;
