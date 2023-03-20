import React, { useEffect, useRef, useState } from 'react';
import clsxm from '../../utils/clsxm';
type OpenButtonProps = {
  className?: string;
  children: JSX.Element;
  elementToOpen: (open: boolean) => JSX.Element;
};
export const ButtonSwitch = ({ elementToOpen, children, className }: OpenButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const clickOutsideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (!clickOutsideRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.body.addEventListener('mousedown', closeDropdown);

    return () => document.body.removeEventListener('mousedown', closeDropdown);
  }, [clickOutsideRef, setIsOpen]);

  return (
    <div className={clsxm('relative h-fit w-fit', className)} ref={clickOutsideRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{children}</div>
      {elementToOpen(isOpen)}
    </div>
  );
};
