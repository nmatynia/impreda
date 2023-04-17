import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import clsxm from '../../utils/clsxm';

type OpenButtonProps = {
  className?: string;
  children: JSX.Element;
  elementToOpen: (open: boolean) => JSX.Element;
};
export const ButtonSwitch = ({ elementToOpen, children, className }: OpenButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const clickOutsideRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (!clickOutsideRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.body.addEventListener('mousedown', closeDropdown);

    return () => document.body.removeEventListener('mousedown', closeDropdown);
  }, [clickOutsideRef, setIsOpen]);

  // Close the component when the route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router, setIsOpen]);

  return (
    <div className={clsxm('relative h-fit w-fit', className)} ref={clickOutsideRef}>
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        {children}
      </button>
      {elementToOpen(isOpen)}
    </div>
  );
};
