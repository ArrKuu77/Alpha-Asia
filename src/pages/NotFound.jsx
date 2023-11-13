import React from "react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div id="navbar-default" className=" w-screen h-screen">
      <ul className=" z-10  bg-slate-900  absolute top-1/4    w-full   font-medium flex flex-col p-4 md:p-0 mt-0 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <h1 className=" text-3xl font-bold text-white underline my-4">
          {" "}
          You can go this!
        </h1>
        <li>
          <NavLink
            to="/"
            className="block bg-gray-950 my-2 text-xl py-2 pl-3 pr-4 text-white hover:bg-blue-700  rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
            // aria-current="page"
          >
            MrForm
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/productForm"
            className="block bg-gray-950 my-2 text-xl py-2 pl-3 pr-4 text-neutral-300 rounded hover:bg-blue-700	 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            ProductForm
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/doctorListForm"
            className="block bg-gray-950 my-2 text-xl py-2 pl-3 pr-4 text-neutral-300 rounded hover:bg-blue-700	 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            DoctorListForm
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/ClearDoctorLists"
            className="block bg-gray-950 my-2 text-xl py-2 pl-3 pr-4 text-neutral-300 rounded hover:bg-blue-700	 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            ClearDoctorLists
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NotFound;
