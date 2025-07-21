import React from "react";
import Navbar from "./Navbar";

const Template = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-yellow-400">
      <Navbar />
      <main className="max-w-7xl mx-auto ">{children}</main>
    </div>
  );
};

export default Template;
