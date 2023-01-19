import React from 'react';
import { Header } from './header/Header';
import { ItemHeader } from './ItemHeader';
import { SearchHeader } from './SearchHeader';

export const Navbar = () => {
  return (
    <div>
      <Header />
      <ItemHeader />
      <SearchHeader />
    </div>
  );
};
