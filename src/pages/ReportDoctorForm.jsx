import React, { useRef, useState } from "react";
import Template from "../component/Template";
import DoctorFeedbackList from "../component/DoctorFeedbackList";
import { list } from "postcss";
import EditDoctorForm from "../component/EditDoctorForm";
import { NavLink } from "react-router-dom";

const ReportDoctorForm = ({
  EditDoctor,
  setDoctor,
  Product,
  createTable,
  ShortName,
  QuantityList,
  // Lists,
  DoctorList,
  DeleteDoctorList,
  EditDoctorList,
  setEditDoctor,
  setShortName,
  setCurrentDate,
  setDoctorListsDate,
  DoctorListsDate,
}) => {
  // console.log(Lists);
  const formRef = useRef();
  let DoctorNameDate = useRef("");
  // console.log(DoctorNameDate.current.value);

  // let ShortName = [];
  // let [controlPageWidth, setcontrolPageWidth] = useState(false);
  // console.log(controlPageWidth);

  console.log(DoctorListsDate.length);
  const hundalarSubmit = (event) => {
    console.log(DoctorNameDate.current.value);

    if (DoctorListsDate.length > 6) {
      alert("You DoctorList is Full!");
    } else {
      // setcontrolPageWidth(true);
      event.preventDefault();
      if (DoctorListsDate.length == 0) {
        if (!DoctorNameDate.current.value) {
          alert("Please select a day!");
          return;
        }
        setDoctorListsDate([...DoctorListsDate, DoctorNameDate.current.value]);
        localStorage.setItem(
          "DoctorListsDate",
          JSON.stringify([...DoctorListsDate, DoctorNameDate.current.value])
        );
        console.log([...DoctorListsDate, DoctorNameDate.current.value]);
      } else {
        if (!DoctorNameDate.current.value) {
          alert("Please select a day!");
          return;
        }
        const CurrentDcotorListsDate = DoctorListsDate.find(
          (list) => list == DoctorNameDate.current.value
        );
        if (!CurrentDcotorListsDate) {
          setDoctorListsDate([
            ...DoctorListsDate,
            DoctorNameDate.current.value,
          ]);
          localStorage.setItem(
            "DoctorListsDate",
            JSON.stringify([...DoctorListsDate, DoctorNameDate.current.value])
          );
          console.log([...DoctorListsDate, DoctorNameDate.current.value]);
        }
      }

      if (DoctorNameDate.current.value) {
        const formData = new FormData(formRef.current);
        console.log(ShortName);
        createTable(
          formData.get("DoctorName"),
          formData.get("CustomerFeedback"),
          // formData.get("NextPlan"),
          formData.get("Hospital"),
          formData.get("Objective"),
          ShortName,
          DoctorNameDate.current.value
        );
        console.log(
          formRef,
          formData.get("Hospital"),
          formData.get("Objective")
        );
        formRef.current.reset();
        setOldDoctorName("");
        // ShortName = [];
        console.log(ShortName);
        setCurrentDate(DoctorNameDate.current.value);
      } else {
        alert("Please select a day!");
      }
    }
  };
  const [OldDoctorNameArray, setOldDoctorNameArray] = useState(
    JSON.parse(localStorage.getItem("DoctorCallList")) == null
      ? []
      : JSON.parse(localStorage.getItem("DoctorCallList"))
  );

  // console.log(OldDoctorNameArray);

  const [filterOldDcotorName, setFilterOldDcotorName] = useState([]);
  // console.log(filterOldDcotorName);

  const [OldDoctorName, setOldDoctorName] = useState("");
  // console.log(OldDoctorName);

  const FilterDoctorCallName = (event) => {
    setOldDoctorName(event.target.value);
    // console.log(event.target.value == true ? "y" : "n");

    setFilterOldDcotorName(
      OldDoctorNameArray.filter((e) => {
        if (!event.target.value) {
          return;
        } else {
          return e.DoctorName.toLowerCase().includes(
            event.target.value.toLowerCase()
          );
        }
      })
    );
  };
  const handalarOldCurrentName = (event) => {
    console.log(event.target.innerHTML);
    setOldDoctorName(event.target.innerHTML);
    setFilterOldDcotorName([]);
  };
  return (
    <Template>
      <div
        className={`relative bg-slate-900 text-white min-h-screen px-4 py-6 ${
          DoctorList.length === 0 ? "w-screen" : "w-full"
        }`}
      >
        <form ref={formRef} id="DoctorForm" onSubmit={hundalarSubmit}></form>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Date */}
          <div>
            <label className="text-base font-semibold block mb-1">Date</label>
            <input
              onChange={() => {
                setCurrentDate(DoctorNameDate.current.value);
                const arrayDoctor = JSON.parse(
                  localStorage.getItem(`${DoctorNameDate.current.value}`)
                );
                if (arrayDoctor !== null) {
                  setDoctor([...arrayDoctor]);
                } else {
                  setDoctor([]);
                }
              }}
              ref={DoctorNameDate}
              type="date"
              required
              className="w-full p-2 rounded border-2 border-yellow-500 text-black"
            />
          </div>

          {/* Doctor Name */}
          <div className="relative">
            <label className="text-base font-semibold block mb-1">
              Doctor Name
            </label>
            <input
              value={OldDoctorName}
              onChange={FilterDoctorCallName}
              required
              name="DoctorName"
              form="DoctorForm"
              type="text"
              placeholder="Doctor Name"
              className="w-full p-2 rounded border-2 border-yellow-500 text-black"
            />
            {filterOldDcotorName.length > 0 && (
              <div className="absolute z-10 bg-white text-black mt-1 w-full max-h-40 overflow-y-auto border border-gray-300 rounded">
                {filterOldDcotorName.map((e, index) => (
                  <p
                    key={index}
                    onClick={handalarOldCurrentName}
                    className="p-2 hover:bg-gray-200 cursor-pointer text-sm"
                  >
                    {e.DoctorName}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Hospital */}
          <div>
            <label className="text-base font-semibold block mb-1">Place</label>
            <input
              required
              name="Hospital"
              form="DoctorForm"
              type="text"
              placeholder="Hospital"
              className="w-full p-2 rounded border-2 border-yellow-500 text-black"
            />
          </div>

          {/* Objective */}
          <div>
            <label className="text-base font-semibold block mb-1">
              Speciality
            </label>
            <input
              required
              name="Objective"
              form="DoctorForm"
              type="text"
              placeholder="Objective"
              className="w-full p-2 rounded border-2 border-yellow-500 text-black"
            />
          </div>

          {/* Customer Feedback */}
          <div className="sm:col-span-2">
            <label className="text-base font-semibold block mb-1">
              Customer Feedback
            </label>
            <input
              name="CustomerFeedback"
              form="DoctorForm"
              type="text"
              placeholder="Customer Feedback"
              className="w-full p-2 rounded border-2 border-yellow-500 text-black"
            />
          </div>

          {/* Action Plan */}
          {/* <div className="sm:col-span-2">
            <label className="text-base font-semibold block mb-1">
              Action Plan For Next Call
            </label>
            <input
              name="NextPlan"
              form="DoctorForm"
              type="text"
              placeholder="Next Plan"
              className="w-full p-2 rounded border-2 border-yellow-500 text-black"
            />
          </div> */}
        </div>

        {/* Product List */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {Product.map((currentItem, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-gray-800 p-2 rounded"
            >
              <input
                form="DoctorForm"
                name="checkBox"
                type="checkbox"
                value={currentItem.SName}
                onClick={(event) => {
                  const exists = ShortName.includes(event.target.value);
                  if (!exists) {
                    event.target.checked = true;
                    ShortName.push(event.target.value);
                  } else {
                    event.target.checked = false;
                    ShortName = ShortName.filter(
                      (name) => name !== event.target.value
                    );
                  }
                }}
                className="w-4 h-4 text-yellow-500"
              />
              <label className="text-sm">{currentItem.name}</label>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button
            form="DoctorForm"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded transition"
          >
            Create Table
          </button>
        </div>

        {/* Conditional Forms */}
        {EditDoctor && (
          <EditDoctorForm
            setDoctor={setDoctor}
            DoctorList={DoctorList}
            setShortName={setShortName}
            setEditDoctor={setEditDoctor}
            ShortName={ShortName}
            Product={Product}
            EditDoctor={EditDoctor}
            DoctorNameDate={DoctorNameDate}
          />
        )}
        {DoctorList.length > 0 && (
          <DoctorFeedbackList
            Product={Product}
            ShortName={ShortName}
            DoctorNameDate={DoctorNameDate}
            DoctorList={DoctorList}
            DeleteDoctorList={DeleteDoctorList}
            EditDoctorList={EditDoctorList}
          />
        )}

        {/* PDF Navigation Button */}
        {DoctorList.length > 0 && (
          <div className=" flex justify-center">
            <NavLink to="/ReadyDoctorList">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold p-2 rounded-md border border-yellow-700 mt-4">
                Go PDF File
              </button>
            </NavLink>
          </div>
        )}
      </div>
    </Template>
  );
};

export default ReportDoctorForm;
