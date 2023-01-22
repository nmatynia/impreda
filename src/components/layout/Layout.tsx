import Head from 'next/head';
import React, { Fragment } from 'react';
import clsxm from '../../utils/clsxm';
import { Footer } from '../footer/Footer';
import { Navbar } from '../navbar/Navbar';

type LayoutProps = {
  children?: React.ReactNode;
  className?: string;
};
export const Layout = ({ children, className }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Impreda – fashion shopping app</title>
        <meta name="description" content="Impreda – fashion shopping app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={clsxm(
          'flex h-screen min-h-screen w-screen flex-col overflow-auto overflow-x-hidden',
          className
        )}
      >
        <Navbar />
        <main className="w-full flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
};
