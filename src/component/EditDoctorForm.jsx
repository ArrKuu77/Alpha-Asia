import React, { useEffect, useRef, useState } from "react";

const EditDoctorForm = ({
  ShortName,
  setShortName,
  Product,
  EditDoctor,
  setEditDoctor,
  setDoctor,
  DoctorList,
  DoctorNameDate,
}) => {
  //   const { DoctorName, CustomerFeedback, NextPlan } = { EditDoctor };
  // console.log(EditDoctor.ShortName);
  // const [check, setcheck] = useState();

  const [customer, setcustomer] = useState();
  // const [doctorName, setdoctorName] = useState();
  const [nextPlan, setnextPlan] = useState();

  const hundalarSubmit = () => {
    console.log(customer, nextPlan);
    setDoctor(
      DoctorList.map((list) => {
        if (list.id == EditDoctor.id) {
          console.log("hehe");
          list.DoctorName = EditDoctor.DoctorName;
          list.CustomerFeedback = customer;
          list.NextPlan = nextPlan;
          list.ShortName = ShortName;
        }
        return list;
      })
    );
    localStorage.setItem(
      DoctorNameDate.current.value,
      JSON.stringify(DoctorList)
    );
    setEditDoctor(null);
    setShortName([]);
  };
  return (
    <>
      <div className="  bg-orange-800 w-full absolute opacity-95  h-full top-0 scroll-ml-0 "></div>

      <div className=" absolute top-20 flex flex-col justify-center w-full   ">
        <button
          className="  ms-2 mb-4 block w-1/6  border border-white bg-blue-900 p-2 text-white "
          onClick={() => {
            setEditDoctor(null);
            setShortName([]);
          }}
        >
          Back
        </button>
        <div className=" w-full  flex justify-center">
          <h1 className=" font-bold text-2xl bg-slate-400 w-1/2 text-center underline p-2 rounded mb-2  ">
            Edit Doctor List
          </h1>
        </div>

        <div className="col col-md-3 mb-3 ">
          <label htmlFor="" className=" font-medium text-2xl block  ">
            Doctor Name
          </label>
          <span className="block text-2xl  text-black 	">
            {EditDoctor.DoctorName}
          </span>
        </div>

        <label className="block">
          <span className="block text-xl font-medium text-black	">
            Customer Feedback
          </span>
          <input
            onChange={(e) => {
              setcustomer(e.target.value);
            }}
            value={customer}
            name="CustomerFeedback"
            //
            type="text"
            className=" border-solid border-2  border-red-800	text-black	"
            placeholder={EditDoctor.CustomerFeedback}
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
            onChange={(e) => {
              setnextPlan(e.target.value);
            }}
            value={nextPlan}
            name="NextPlan"
            type="text"
            required
            className=" border-solid border-2  border-red-800	text-black	"
            placeholder={EditDoctor.NextPlan}
          />
          {/* <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
TownShip
</p> */}
        </label>
        <div className=" flex  justify-center items-center m-2">
          <h1 className=" font-medium text-xl inline-block  ">Call Purpose</h1>
          {ShortName.map((name, index) => {
            return (
              <label
                key={index}
                // htmlFor="teal-checkbox"
                className=" text-lg font-medium  dark:text-gray-300"
              >
                {"-  " + name + ","}
              </label>
            );
          })}
        </div>
        <div className=" flex flex-col justify-center items-center m-2">
          {Product.map((currentItem) => {
            return ShortName.includes(currentItem.SName) ? (
              ""
            ) : (
              <div
                key={currentItem.id}
                className=" flex items-center justify-between w-1/6 "
              >
                <input
                  name="EditcheckBox"
                  onClick={(event) => {
                    console.log(ShortName);
                    const Shorttrue = ShortName.includes(event.target.value);
                    if (!Shorttrue) {
                      event.target.checked = true;

                      console.log(Shorttrue);
                      // setShortName([...ShortName, event.target.value]);
                      ShortName.push(event.target.value);
                      console.log(ShortName);
                    } else {
                      event.target.checked = false;
                      console.log(event.target.checked);

                      const deleteShortName = ShortName.filter((name) => {
                        if (name !== event.target.value) {
                          console.log(name);
                          return name;
                        }
                      });
                      // setShortName([deleteShortName]);

                      ShortName = deleteShortName;
                      console.log(ShortName);
                    }
                  }}
                  // id="teal-checkbox"

                  type="checkbox"
                  value={currentItem.SName}
                  className=" w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
            onClick={hundalarSubmit}
            className=" border border-white bg-blue-900 p-2 text-white "
          >
            Edit DoctorList
          </button>
        </div>
      </div>
    </>
  );
};

export default EditDoctorForm;
