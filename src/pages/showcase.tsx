import React from "react";
import { Footer } from "../components/footer/Footer";

const showcase = () => {
  return (
    //TODO: Move those classes to layout component
    <div className="h-screen w-screen overflow-auto overflow-x-hidden bg-slate-100">
      <Footer className="mt-2" />
    </div>
  );
};

export default showcase;
