import React, { useRef, useState } from 'react';
import { Header } from './header/Header';
import { ItemHeader } from './ItemHeader';
import { SearchHeader } from './SearchHeader';

export const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const handleShowSearch = () => {
    setShowSearch(!showSearch);
  };
  const navRef = useRef<any>();

  return (
    <nav ref={navRef} className="relative">
      <Header handleShowSearch={handleShowSearch} />
      <ItemHeader />
      <SearchHeader isOpen={showSearch} setIsOpen={setShowSearch} navRef={navRef} />
    </nav>
  );
};
