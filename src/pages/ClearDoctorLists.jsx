import React, { useRef } from "react";
import Template from "../component/Template";

const ClearDoctorLists = ({
  setDoctorListsDate,
  setchangeName,
  DoctorListsDate,
  setQuantityList,
}) => {
  const DoctorNameDate = useRef();
  const AllClearDoctorListsDate = () => {
    DoctorListsDate.map((lists) => {
      localStorage.removeItem(`${lists}`);
    });
    localStorage.removeItem("DoctorListsDate");
  };
  const ClearDoctorListsDate = () => {
    if (!DoctorNameDate.current.value) {
      alert("Select Clear Date");
    }
    if (!DoctorListsDate.includes(DoctorNameDate.current.value)) {
      alert("There are no DoctorLists thisday!");
    }
    const currentDoctorListsDate = DoctorListsDate.filter((lists) => {
      return lists !== DoctorNameDate.current.value;
    });

    setDoctorListsDate(currentDoctorListsDate);
    localStorage.setItem(
      "DoctorListsDate",
      JSON.stringify(currentDoctorListsDate)
    );
    console.log(currentDoctorListsDate);
    localStorage.removeItem(DoctorNameDate.current.value);
  };
  const ClearQuantity = () => {
    let text = "Do you want to clear product quantity list!\n OK or Cancel.";
    if (confirm(text) == true) {
      setchangeName(true);
      setQuantityList([]);
      localStorage.removeItem("QuantityList");
    } else {
      return;
    }
  };
  return (
    <Template>
      <div className="w-screen h-screen pb-2">
        <label className="block">
          <div className=" border border-red-900 p-2 m-2 ">
            <span className="block text-2xl text-black underline mb-2 font-bold	">
              DoctorListsDate
            </span>
            {DoctorListsDate.length == 0 ? (
              <span className="block text-xl font-medium text-black	">
                There are no Lists !
              </span>
            ) : (
              ""
            )}
            {DoctorListsDate.map((lists, index) => (
              <span
                key={index}
                className="block text-xl font-medium text-black	"
              >
                {lists}
              </span>
            ))}
          </div>
          <div>
            <h1 className=" text-2xl text-slate-300 underline  bg-red-600 p-2">
              DeleteDoctorLists
            </h1>
            <div className=" flex justify-between items-center border border-red-900 p-2 m-2">
              <input
                ref={DoctorNameDate}
                type="date"
                className=" border-solid border-2  border-red-800	text-black	"
                placeholder=" Action Plan For Next Call"
              />
              <button
                className="text-slate-300   bg-red-600 p-2  rounded border border-red-200"
                onClick={ClearDoctorListsDate}
              >
                ClearDate
              </button>
            </div>
          </div>
        </label>
        <button
          className="text-slate-300  block mx-auto font-bold text-xl  bg-red-600 p-4  rounded border border-red-200"
          onClick={AllClearDoctorListsDate}
        >
          AllClearDoctorDate
        </button>
        <button
          className="text-slate-300 mt-2  block mx-auto font-bold text-xl  bg-red-600 p-4  rounded border border-red-200"
          onClick={ClearQuantity}
        >
          ClearQuantity
        </button>
      </div>
    </Template>
  );
};

export default ClearDoctorLists;
