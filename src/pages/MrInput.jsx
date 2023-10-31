import React, { useState } from "react";
import Template from "../component/Template";
import { NavLink } from "react-router-dom";

const MrInput = ({ setTownship }) => {
  const [target, setTarget] = useState(
    localStorage.getItem("Target") == null ? "" : localStorage.getItem("Target")
  );
  const [MrName, setMrName] = useState(
    localStorage.getItem("MrName") == null ? "" : localStorage.getItem("MrName")
  );
  return (
    <Template>
      <div className="bg-slate-500 text-center w-screen h-screen pb-2">
        <form className=" mb-4 pt-4">
          <div className=" mb-2">
            <span className="self-center underline text-2xl  font-semibold whitespace-nowrap text-black">
              Alpha Asia Daily Report Form
            </span>
          </div>

          <label className="block">
            <span className="block text-xl font-medium text-black	">Target</span>
            <input
              type="number"
              onChange={(event) => {
                localStorage.setItem("Target", event.target.value);
                setTarget(localStorage.getItem("Target"));
              }}
              value={target}
              className=" border-solid border-2  border-red-800	text-black	"
              placeholder="Your Target"
            />
            {/* <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
            Please provide a valid email address.
          </p> */}
          </label>
          <label className="block">
            <span className="block text-xl font-medium text-black	">
              MR Name
            </span>
            <input
              required
              type="text"
              onChange={(event) => {
                localStorage.setItem("MrName", event.target.value);
                setMrName(localStorage.getItem("MrName"));
              }}
              value={MrName}
              className=" border-solid border-2  border-red-800	text-black	"
              placeholder="Your Name"
            />
            {/* <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
            Please provide a valid email address.
          </p> */}
          </label>
          <label className="block">
            <span className="block text-xl font-medium text-black	">
              Location
            </span>
            <input
              onChange={(e) => {
                setTownship(e.target.value);
              }}
              type="text"
              className=" border-solid border-2  border-red-800	text-black	"
              placeholder="TownShip"
            />
            {/* <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
            TownShip
          </p> */}
          </label>
        </form>
        <NavLink to="/productForm">
          <button className=" bg-indigo-500 p-2 rounded-md border-gray-900 border-2	">
            Next Step
          </button>
        </NavLink>
      </div>
    </Template>
  );
};

export default MrInput;
