import React, { useEffect, useRef, useState } from "react";
import Template from "../component/Template";
import { MdEditCalendar } from "react-icons/md";
import { HiOutlineXMark } from "react-icons/hi2";
import Swal from "sweetalert2";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import { TiUserDelete } from "react-icons/ti";

const ClearDoctorLists = ({
  setDoctorListsDate,
  setchangeName,
  DoctorListsDate,
  setQuantityList,
}) => {
  const DoctorNameDate = useRef();
  const AllClearDoctorListsDate = () => {
    let text = "Do you want to clear Doctorlists!\n OK or Cancel.";
    if (confirm(text) == true) {
      DoctorListsDate.map((lists) => {
        localStorage.removeItem(`${lists}`);
      });
      localStorage.removeItem("DoctorListsDate");
      setDoctorListsDate([]);
      // setDoctorListsDate()
    } else {
      return;
    }
  };
  console.log(DoctorListsDate);

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
  const clearMrName = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("MrName");
      }
    });
  };
  const [currentDoctorListDate, setCurrentDoctorListDate] = useState(null);
  const [allCLearDateShow, setAllCLearDateShow] = useState(true);
  const changeDoctorListDateBtn = (lists) => {
    setCurrentDoctorListDate(lists);
  };
  const newDoctorListDate = useRef("");
  const changeDoctorListDateFun = () => {
    const oldDate = DoctorListsDate.find(
      (list) => newDoctorListDate.current.value == list
    );

    if (oldDate) {
      Swal.fire({
        title: "error",
        text: "New Date is already have!",
        icon: "error",
      });
    } else {
      if (newDoctorListDate.current.value.length == 0) {
        Swal.fire({
          title: "error",
          text: "Please fill date!",
          icon: "error",
        });
        return;
      }
      console.log("change", newDoctorListDate.current.value);
      const currentDoctorDetail = JSON.parse(
        localStorage.getItem(currentDoctorListDate)
      );

      localStorage.setItem(
        newDoctorListDate.current.value,
        JSON.stringify(
          [...currentDoctorDetail].map((obj) => ({
            ...obj,
            NextPlan: "",
            CustomerFeedback: "",
          }))
        )
      );

      setDoctorListsDate(
        DoctorListsDate.map((list) => {
          if (list == currentDoctorListDate) {
            return (list = newDoctorListDate.current.value);
          } else {
            return list;
          }
        })
      );
      localStorage.setItem(
        "DoctorListsDate",
        JSON.stringify(
          DoctorListsDate.map((list) => {
            if (list == currentDoctorListDate) {
              return (list = newDoctorListDate.current.value);
            } else {
              return list;
            }
          })
        )
      );
      localStorage.removeItem(currentDoctorListDate);
      setCurrentDoctorListDate(null);
      setAllCLearDateShow(false);
      Swal.fire({
        title: "Success",
        text: "Date change is successful.!",
        icon: "success",
      });
    }
  };
  const removeDoctorListDateBtn = (lists) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const dateRemove = DoctorListsDate.filter((ls) => ls !== lists);

        setDoctorListsDate(dateRemove);
        localStorage.setItem("DoctorListsDate", JSON.stringify(dateRemove));
        localStorage.removeItem(lists);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <Template>
      <div className="w-full min-h-screen bg-slate-900 text-white px-4 py-2 space-y-6">
        {/* Doctor Lists Section */}
        <div className="border border-red-900 rounded p-4">
          <h2 className="text-2xl font-bold underline mb-2">DoctorListsDate</h2>

          {DoctorListsDate.length === 0 && (
            <p className="text-xl font-medium text-red-300">
              There are no Lists!
            </p>
          )}

          <div className="space-y-2">
            {DoctorListsDate.map((lists, index) => (
              <div
                key={index}
                className="flex flex-wrap justify-between items-center gap-3 bg-gray-700 p-3 rounded"
              >
                <span className="text-lg font-medium">{lists}</span>
                <div className="flex gap-2">
                  <MdEditCalendar
                    onClick={() => changeDoctorListDateBtn(lists)}
                    className="text-2xl text-yellow-500 hover:text-yellow-300 cursor-pointer"
                  />
                  {!allCLearDateShow && (
                    <HiArchiveBoxXMark
                      onClick={() => removeDoctorListDateBtn(lists)}
                      className="text-2xl text-red-500 hover:text-red-300 cursor-pointer"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Change Date Modal */}
        {currentDoctorListDate && (
          <div className="fixed inset-0 flex justify-center items-center bg-black/80 z-50">
            <div className="w-full max-w-md bg-amber-400 text-black p-6 rounded shadow-lg border border-amber-800">
              <div className="flex justify-end">
                <HiOutlineXMark
                  onClick={() => setCurrentDoctorListDate(null)}
                  className="text-2xl text-red-600 hover:text-red-800 cursor-pointer"
                />
              </div>

              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold">Current Date</h3>
                <p className="text-lg font-semibold">{currentDoctorListDate}</p>
              </div>

              <div className="flex flex-col gap-4 items-center">
                <div className="flex flex-col items-center">
                  <label htmlFor="newchangeDate" className="font-bold text-lg">
                    Change Date
                  </label>
                  <input
                    ref={newDoctorListDate}
                    type="date"
                    id="newchangeDate"
                    className="mt-1 border border-black rounded px-2 py-1"
                  />
                </div>
                <button
                  onClick={changeDoctorListDateFun}
                  className="bg-orange-600 text-white px-4 py-2 rounded border border-black hover:bg-orange-700"
                >
                  Change Doctor Date
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Date Section */}
        <div>
          <h2 className="text-2xl underline bg-red-600 text-white p-2 rounded">
            DeleteDoctorLists
          </h2>
          <div className="flex flex-wrap gap-3 items-center border border-red-900 rounded p-4 mt-2">
            <input
              ref={DoctorNameDate}
              type="date"
              name="deleteDateLists"
              className="border border-red-800 bg-slate-800 text-white px-3 py-2 rounded w-full sm:w-auto"
            />
            <button
              onClick={ClearDoctorListsDate}
              className="bg-red-600 text-white px-4 py-2 rounded border border-red-200 hover:bg-red-700"
            >
              Clear Date
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-evenly mt-4">
          <button
            onClick={ClearQuantity}
            className="bg-red-600 text-white font-bold px-4 py-2 rounded border border-red-200 hover:bg-red-700"
          >
            Clear Quantity
          </button>

          {allCLearDateShow && (
            <button
              onClick={AllClearDoctorListsDate}
              className="bg-red-600 text-white font-bold px-4 py-2 rounded border border-red-200 hover:bg-red-700"
            >
              All Clear Doctor Date
            </button>
          )}

          <button
            onClick={clearMrName}
            className="bg-red-600 text-white font-bold px-4 py-2 rounded border border-red-200 hover:bg-red-700 flex items-center gap-2"
          >
            <span>Mr Name Delete</span>
            <TiUserDelete />
          </button>
        </div>
      </div>
    </Template>
  );
};

export default ClearDoctorLists;
