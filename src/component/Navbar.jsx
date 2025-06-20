import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [navshow, setnavshow] = useState(false);
  return (
    <nav className="bg-slate-900  border-gray-200 dark:bg-gray-900 ">
      <div className=" flex flex-wrap items-center justify-between mx-auto p-4 relative">
        <a
          href="https://www.facebook.com/profile.php?id=100092398663187"
          className="flex items-center"
        >
          <img
            src="https://cdn.dribbble.com/users/5094913/screenshots/12342536/media/416dddc51a00a5b336239e565e2ccc37.jpg"
            className=" h-12  border-2 border-white rounded-full mr-3"
          />
          <span className="self-center text-lg font-semibold whitespace-nowrap text-white">
            Alpha Asia Daily Report
          </span>
        </a>
        <button
          onClick={() => setnavshow(!navshow)}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              //   stroke-linecap="round"
              //   stroke-linejoin="round"
              //   stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            navshow ? "block" : "hidden"
          }  w-full md:block md:w-auto `}
          id="navbar-default"
        >
          <ul className=" z-10 bg-slate-900  absolute top-16  w-11/12   font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                to="/"
                className="block py-2 pl-3 pr-4 text-white hover:bg-blue-700  rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                // aria-current="page"
              >
                MrForm
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/productForm"
                className="block py-2 pl-3 pr-4 text-neutral-300 rounded hover:bg-blue-700	 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                ProductForm
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/doctorListForm"
                className="block py-2 pl-3 pr-4 text-neutral-300 rounded hover:bg-blue-700	 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                DoctorListForm
              </NavLink>
            </li>*/}
            <li>
              <NavLink
                to="/ClearDoctorLists"
                className="block py-2 pl-3 pr-4 text-neutral-300 rounded hover:bg-blue-700	 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                ClearDoctorLists
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/DoctorCallList"
                className="block py-2 pl-3 pr-4 text-neutral-300 rounded hover:bg-blue-700	 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                DoctorCallList
              </NavLink>
            </li> */}
            <li>
              <NavLink
                to="/CreateProductList"
                className="block py-2 pl-3 pr-4 text-neutral-300 rounded hover:bg-blue-700	 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Create Product List
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/report-review"
                className="block py-2 pl-3 pr-4 text-neutral-300 rounded hover:bg-blue-700	 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                ReportReview
              </NavLink>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
