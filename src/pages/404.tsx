import React from 'react';
import { NotFound } from '../components/not-found/NotFound';

const PageNotFound = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <NotFound
        title="Page was not found "
        subtitle="Please don't hesitate to explore our site further"
      />
    </div>
  );
};

export default PageNotFound;
