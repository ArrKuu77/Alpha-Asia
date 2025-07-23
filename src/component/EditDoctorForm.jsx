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

  const [customer, setcustomer] = useState(EditDoctor.CustomerFeedback);
  // const [doctorName, setdoctorName] = useState();
  const [nextPlan, setnextPlan] = useState(EditDoctor.NextPlan);

  const hundalarSubmit = () => {
    console.log(customer, nextPlan);
    setDoctor(
      DoctorList.map((list) => {
        if (list.id == EditDoctor.id) {
          console.log(list.id, EditDoctor.id);
          list.DoctorName = EditDoctor.DoctorName;
          list.Hospital = EditDoctor.Hospital;
          list.Objective = EditDoctor.Objective;
          list.CustomerFeedback = customer;
          // list.NextPlan = nextPlan;
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
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black opacity-90 z-10"></div>

      {/* Main content */}
      <div className="relative  z-20 flex flex-col items-center w-full px-4 py-8">
        <button
          className="mb-6 self-start border border-white bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => {
            setEditDoctor(null);
            setShortName([]);
          }}
        >
          Back
        </button>

        <h1 className="text-2xl font-bold text-white underline bg-slate-700 px-6 py-2 rounded mb-6 text-center w-full max-w-md">
          Edit Doctor List
        </h1>

        <div className="w-full max-w-md space-y-4 text-white">
          <div>
            <label className="text-lg font-semibold">Doctor Name</label>
            <p className="text-xl text-yellow-300">{EditDoctor.DoctorName}</p>
          </div>

          <div>
            <label className="text-lg font-semibold">Hospital</label>
            <p className="text-xl text-yellow-300">{EditDoctor.Hospital}</p>
          </div>

          <div>
            <label className="text-lg font-semibold">Objective</label>
            <p className="text-xl text-yellow-300">{EditDoctor.Objective}</p>
          </div>

          <div>
            <label className="text-lg font-semibold">Remark</label>
            <input
              onChange={(e) => setcustomer(e.target.value)}
              defaultValue={EditDoctor.CustomerFeedback}
              type="text"
              className="w-full mt-1 p-2 text-black rounded border-2 border-yellow-500"
            />
          </div>

          {/* <div>
            <label className="text-lg font-semibold">
              Action Plan For Next Call
            </label>
            <input
              onChange={(e) => setnextPlan(e.target.value)}
              defaultValue={EditDoctor.NextPlan}
              type="text"
              className="w-full mt-1 p-2 text-black rounded border-2 border-yellow-500"
            />
          </div> */}
        </div>

        {/* Call Purpose Display */}
        <div className="mt-6 text-center text-white">
          <h2 className="text-lg font-semibold mb-2">Call Purpose</h2>
          <div className="flex flex-wrap justify-center gap-2 text-yellow-300">
            {ShortName.map((name, index) => (
              <span key={index}>- {name},</span>
            ))}
          </div>
        </div>

        {/* Product Checkbox Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 w-full max-w-md">
          {Product.map((item) =>
            ShortName.includes(item.SName) ? null : (
              <div key={item.id} className="flex items-center gap-2 text-white">
                <input
                  type="checkbox"
                  value={item.SName}
                  onClick={(event) => {
                    const isChecked = ShortName.includes(event.target.value);
                    if (!isChecked) {
                      ShortName.push(event.target.value);
                    } else {
                      ShortName = ShortName.filter(
                        (name) => name !== event.target.value
                      );
                    }
                  }}
                  className="w-4 h-4 text-yellow-400 bg-gray-800 border-gray-600 rounded"
                />
                <label className="text-sm">{item.name}</label>
              </div>
            )
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            onClick={hundalarSubmit}
            className="bg-blue-700 text-white px-6 py-2 rounded border border-white hover:bg-blue-600"
          >
            Edit Doctor List
          </button>
        </div>
      </div>
    </>
  );
};

export default EditDoctorForm;
