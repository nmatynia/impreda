import Head from 'next/head';
import React from 'react';
import clsxm from '../../utils/clsxm';
import { Footer } from '../footer/Footer';
import { Navbar } from '../navbar/Navbar';
import { WEBSITE_URL } from '../../utils/constants';

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
        <meta property="og:image" content={`${WEBSITE_URL}/images/og-impreda.webp`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={clsxm('flex h-fit min-h-screen flex-col ', className)}>
        <Navbar />
        <main className="z-0 w-full flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
};
