import React, { useEffect, useRef, useState } from 'react';
import { Header } from './header/Header';
import { ItemHeader } from './item-header/ItemHeader';
import { SearchHeader } from './SearchHeader';
import clsxm from '../../utils/clsxm';

export const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isTop, setIsTop] = useState(true);
  const navRef = useRef<HTMLDivElement>(null);

  const handleShowSearch = () => {
    setShowSearch(!showSearch);
  };

  useEffect(() => {
    let lastScrollTop = 0;
    const onScroll = () => {
      const currentScrollTop = window.pageYOffset;
      setIsTop(currentScrollTop === 0);
      if (
        currentScrollTop > lastScrollTop &&
        currentScrollTop > (navRef.current?.offsetHeight ?? 32) * 2
      ) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={clsxm(
        'sticky top-0 z-10 border-b-[1px] border-primaryBlack bg-primaryWhite transition-all duration-300 ease-in-out',
        isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
        // isTop || 'sm:border-b-transparent sm:shadow-lg'
      )}
    >
      <Header handleShowSearch={handleShowSearch} />
      <ItemHeader className={clsxm('sm:hidden', showSearch && 'hidden')} />
      <SearchHeader isOpen={showSearch} setIsOpen={setShowSearch} />
    </nav>
  );
};
