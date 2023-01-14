import React, { Fragment } from "react";
import clsxm from "../../utils/clsxm";
import { Footer } from "../footer/Footer";
import { Navbar } from "../navbar/Navbar";

type LayoutProps = {
  children?: React.ReactNode;
  className?: string;
};
export const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div
      className={clsxm(
        "flex h-screen min-h-screen w-screen flex-col overflow-auto overflow-x-hidden",
        className
      )}
    >
      <Navbar />
      <main className="w-full flex-1">{children}</main>
      <Footer />
    </div>
  );
};
