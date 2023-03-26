import React, { useRef, useState } from 'react';
import { Header } from './header/Header';
import { ItemHeader } from './item-header/ItemHeader';
import { SearchHeader } from './SearchHeader';

export const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const handleShowSearch = () => {
    setShowSearch(!showSearch);
  };
  const navRef = useRef<HTMLDivElement>(null);

  return (
    <nav ref={navRef} className="relative z-10">
      <Header handleShowSearch={handleShowSearch} />
      <ItemHeader />
      <SearchHeader isOpen={showSearch} setIsOpen={setShowSearch} navRef={navRef} />
    </nav>
  );
};
