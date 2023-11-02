import React, { useRef, useState } from "react";
import Template from "../component/Template";
import DoctorFeedbackList from "../component/DoctorFeedbackList";
import { list } from "postcss";
import EditDoctorForm from "../component/EditDoctorForm";

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
    if (DoctorListsDate.length > 5) {
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
        console.log();
        createTable(
          formData.get("DoctorName"),
          formData.get("CustomerFeedback"),
          formData.get("NextPlan"),
          formData.get("CallPurpose"),
          ShortName,
          DoctorNameDate.current.value
        );
        console.log(formRef);
        formRef.current.reset();
        // ShortName = [];
        console.log(ShortName);
        setCurrentDate(DoctorNameDate.current.value);
      } else {
        alert("Please select a day!");
      }
    }
  };
  return (
    <Template>
      <div
        className={`relative  bg-slate-500 ${
          DoctorList.length == 0 ? "w-screen" : "w-full"
        }`}
      >
        <form ref={formRef} id="DoctorForm" onSubmit={hundalarSubmit}></form>
        <div className=" ">
          <div className="col  col-md-3">
            <label htmlFor="" className=" text-2xl block  ">
              Date
            </label>
            <input
              onChange={() => {
                console.log("fkdj");

                setCurrentDate(DoctorNameDate.current.value);

                const arrayDoctor = JSON.parse(
                  localStorage.getItem(`${DoctorNameDate.current.value}`)
                );
                console.log(arrayDoctor);

                // if (DoctorList.length == 0) {
                if (
                  localStorage.getItem(`${DoctorNameDate.current.value}`) !==
                  null
                ) {
                  console.log(arrayDoctor);
                  // setcontrolPageWidth(true);
                  // console.log(controlPageWidth);
                  setDoctor([...arrayDoctor]);
                  console.log(DoctorList);
                } else {
                  // setcontrolPageWidth(false);
                  // console.log(controlPageWidth);
                  setDoctor([]);
                }
                // }
              }}
              // name="DoctorNameDate"
              ref={DoctorNameDate}
              // form="DoctorForm"
              type="date"
              required
              className=" border-solid border-2  border-red-800	text-black	"
            />
          </div>
          <div className="col col-md-3">
            <label htmlFor="" className=" text-2xl block  ">
              Doctor Name
            </label>
            <input
              required
              name="DoctorName"
              form="DoctorForm"
              type="text"
              className=" border-solid border-2  border-red-800	text-black	"
              placeholder="Doctor Name"
            />
          </div>
          <div className="col col-md-3">
            <label htmlFor="" className=" text-2xl block  ">
              Call Purpose
            </label>
            <input
              required
              name="CallPurpose"
              form="DoctorForm"
              type="text"
              className=" border-solid border-2  border-red-800	text-black	"
              placeholder="Doctor Name"
            />
          </div>

          <label className="block">
            <span className="block text-xl font-medium text-black	">
              Customer Feedback
            </span>
            <input
              name="CustomerFeedback"
              form="DoctorForm"
              type="text"
              className=" border-solid border-2  border-red-800	text-black	"
              placeholder="CustomerFeedback"
            />
            {/* <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
        TownShip
      </p> */}
          </label>

          <label className="block">
            <span className="block text-xl font-medium text-black	">
              Action Plan For Next Call
            </span>
            <input
              name="NextPlan"
              form="DoctorForm"
              type="text"
              className=" border-solid border-2  border-red-800	text-black	"
              placeholder=" Action Plan For Next Call"
            />
            {/* <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
        TownShip
      </p> */}
          </label>

          <div className=" flex flex-col justify-center items-center  m-2">
            {Product.map((currentItem) => {
              return (
                <div
                  key={currentItem.id}
                  className={`flex items-center justify-between${
                    DoctorList.length == 0 ? "   w-1/2" : " w-1/6"
                  }`}
                >
                  <input
                    // form="DoctorForm"
                    name="checkBox"
                    onClick={(event) => {
                      const Shorttrue = ShortName.includes(event.target.value);
                      if (!Shorttrue) {
                        event.target.checked = true;

                        console.log(Shorttrue);
                        ShortName.push(event.target.value);
                        console.log(ShortName);
                      } else {
                        event.target.checked = false;

                        const deleteShortName = ShortName.filter((name) => {
                          if (name !== event.target.value) {
                            console.log(name);
                            return name;
                          }
                        });
                        ShortName = deleteShortName;
                        console.log(ShortName);
                      }
                    }}
                    // id="teal-checkbox"
                    type="checkbox"
                    value={currentItem.SName}
                    className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    // htmlFor="teal-checkbox"
                    className=" w-full text-lg font-medium text-gray-900 dark:text-gray-300"
                  >
                    {currentItem.name}
                  </label>
                </div>
              );
            })}
          </div>

          <div className=" mt-3 text-center ">
            <button
              form="DoctorForm"
              className=" border border-white bg-blue-900 p-2 text-white "
            >
              Create Table
            </button>
          </div>
        </div>

        {EditDoctor ? (
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
        ) : (
          <></>
        )}
        <DoctorFeedbackList
          Product={Product}
          ShortName={ShortName}
          DoctorNameDate={DoctorNameDate}
          DoctorList={DoctorList}
          DeleteDoctorList={DeleteDoctorList}
          EditDoctorList={EditDoctorList}
        />
      </div>
    </Template>
  );
};

export default ReportDoctorForm;
