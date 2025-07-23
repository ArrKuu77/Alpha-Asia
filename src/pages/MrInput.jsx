import React, { useEffect, useState } from "react";
import Template from "../component/Template";
import { NavLink } from "react-router-dom";
import { employeeTableFetch } from "../supabase";

const MrInput = ({ setTownship }) => {
  const [target, setTarget] = useState(localStorage.getItem("Target") || "");
  const [MrName, setMrName] = useState(() => {
    const stored = localStorage.getItem("MrName");
    return stored ? JSON.parse(stored) : null;
  });
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    if (!MrName) fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    const { employee_table, error } = await employeeTableFetch();
    if (error) {
      alert(error);
    } else {
      setEmployeeList(employee_table);
    }
  };

  const handleMrChange = (e) => {
    const selected = employeeList.find((item) => item.id == e.target.value);
    const data = { mrName: selected.name, mrId: selected.id };
    setMrName(data);
    localStorage.setItem("MrName", JSON.stringify(data));
  };
  // console.log(MrName?.mrName || "Select your name");

  return (
    <Template>
      <div className="min-h-screen w-full bg-black text-yellow-400 flex items-center justify-center px-4">
        <form className="w-full max-w-md bg-zinc-900 p-6 rounded-xl shadow-xl space-y-6 border border-yellow-500">
          <h2 className="text-2xl font-bold text-center underline">
            Alpha Asia Daily Report Form
          </h2>

          {/* Target Input */}
          <div>
            <label className="block text-lg font-semibold mb-1">
              🎯 Target
            </label>
            <input
              type="number"
              value={target}
              onChange={(e) => {
                localStorage.setItem("Target", e.target.value);
                setTarget(e.target.value);
              }}
              className="w-full p-2 border-2 border-yellow-500 bg-black text-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Your Target"
            />
          </div>

          {/* MR Name Select */}
          <div>
            <label className="block text-lg font-semibold mb-1">
              👤 MR Name
            </label>
            <select
              value={MrName?.mrId || "dValue"}
              onChange={handleMrChange}
              className="w-full p-2 border-2 border-yellow-500 bg-black text-yellow-400 rounded-md"
            >
              <option value="dValue">
                {MrName?.mrName || "Select your name"}
              </option>
              {employeeList.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>

          {/* Location Input */}
          <div>
            <label className="block text-lg font-semibold mb-1">
              📍 Location
            </label>
            <input
              type="text"
              onChange={(e) => setTownship(e.target.value)}
              className="w-full p-2 border-2 border-yellow-500 bg-black text-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Township"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <NavLink to="/productForm">
              <button
                type="button"
                className="bg-yellow-500 text-black px-6 py-2 rounded-md hover:bg-yellow-600 transition font-semibold"
              >
                Next Step →
              </button>
            </NavLink>
          </div>
        </form>
      </div>
    </Template>
  );
};

export default MrInput;
