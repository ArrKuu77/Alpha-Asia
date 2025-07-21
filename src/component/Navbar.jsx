import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [navshow, setnavshow] = useState(false);

  return (
    <nav className="bg-black text-yellow-400 sticky top-0 z-50 shadow-md transition-all duration-300">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4 relative">
        <a
          href="https://www.facebook.com/profile.php?id=100092398663187"
          className="flex items-center"
        >
          <img
            src="https://cdn.dribbble.com/users/5094913/screenshots/12342536/media/416dddc51a00a5b336239e565e2ccc37.jpg"
            className="h-12 border-2 border-white rounded-full mr-3"
            alt="Logo"
          />
          <span className="text-lg font-bold whitespace-nowrap">
            Alpha Asia Daily Report
          </span>
        </a>

        <button
          onClick={() => setnavshow(!navshow)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-yellow-400 rounded-lg md:hidden hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div
          className={`${
            navshow ? "block" : "hidden"
          } w-full md:block md:w-auto transition-all duration-300`}
        >
          <ul className="absolute md:static top-16 z-10 bg-black md:bg-transparent w-11/12 md:w-auto font-medium flex flex-col md:flex-row p-4 md:p-0 mt-4 md:mt-0 border border-gray-700 md:border-none rounded-lg md:space-x-6">
            {[
              { to: "/", text: "MrForm" },
              { to: "/productForm", text: "ProductForm" },
              { to: "/doctorListForm", text: "DoctorListForm" },
              { to: "/ClearDoctorLists", text: "ClearDoctorLists" },
              { to: "/DoctorCallList", text: "DoctorCallList" },
              { to: "/CreateProductList", text: "Create Product List" },
              { to: "/report-review", text: "ReportReview" },
            ].map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded transition-all duration-300 ${
                      isActive
                        ? "bg-yellow-500 text-black"
                        : "hover:bg-yellow-700 hover:text-black"
                    }`
                  }
                >
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
