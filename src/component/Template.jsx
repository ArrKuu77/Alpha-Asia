import React from "react";
import Navbar from "./Navbar";

const Template = ({ children }) => {
  return (
    <div className="maxContent  ">
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default Template;
