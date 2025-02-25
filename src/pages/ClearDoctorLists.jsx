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
              <div
                className="flex justify-center items-center gap-5 p-1 m-2 bg-gray-400 "
                key={index}
              >
                <span className="block text-xl font-medium text-black	">
                  {lists}
                </span>
                <MdEditCalendar
                  onClick={() => changeDoctorListDateBtn(lists)}
                  className=" text-2xl text-yellow-800 hover:text-yellow-500"
                />
                {!allCLearDateShow && (
                  <HiArchiveBoxXMark
                    onClick={() => removeDoctorListDateBtn(lists)}
                    className=" text-2xl text-red-800 hover:text-red-500"
                  />
                )}
              </div>
            ))}
          </div>

          {/* changeDoctorListDateModel */}
          {currentDoctorListDate && (
            <div className=" absolute h-screen w-full top-0 flex justify-center items-center bg-black/70">
              <div className="   p-3 m-3 shadow-xl shadow-amber-900 bg-amber-400 border-2 border-amber-800 w-full">
                <div className=" flex justify-end items-center ">
                  <HiOutlineXMark
                    onClick={() => setCurrentDoctorListDate(null)}
                    className=" text-red-600  bg-white text-2xl"
                  />
                </div>
                <div className=" flex flex-col justify-center items-center mb-2 gap-1">
                  <span className=" text-2xl font-bold ">Current Date</span>
                  {/* <span className=" text-xl font-semibold">2024-08-08</span> */}
                  <span className=" text-xl font-semibold">
                    {currentDoctorListDate}
                  </span>
                </div>
                <div className=" flex flex-col justify-between items-center gap-3 mb-3 ">
                  <div className=" flex flex-col items-center justify-center">
                    <label id="newchangeDate" className=" font-bold text-lg">
                      Change Date
                    </label>
                    <input
                      ref={newDoctorListDate}
                      type="date"
                      name="newchangeDate"
                      id=""
                    />
                  </div>
                  <button
                    onClick={() => changeDoctorListDateFun()}
                    className=" bg-orange-500 border border-black text-white  px-1 py-2"
                  >
                    ChangeDoctorDate
                  </button>
                </div>
              </div>
            </div>
          )}
        </label>

        {/* delete Date */}
        <div>
          <h1 className=" text-2xl text-slate-300 underline  bg-red-600 p-2">
            DeleteDoctorLists
          </h1>
          <div className=" flex justify-between items-center border border-red-900 p-2 m-2">
            <input
              ref={DoctorNameDate}
              type="date"
              name="deleteDateLists"
              className=" border-solid border-2  border-red-800	text-black	"
            />
            <button
              className="text-slate-300   bg-red-600 p-2  rounded border border-red-200"
              onClick={ClearDoctorListsDate}
            >
              ClearDate
            </button>
          </div>
        </div>
        <div className=" flex justify-evenly flex-wrap gap-3">
          <button
            className="text-slate-300    font-bold text-sm  bg-red-600 px-4 py-2  rounded border border-red-200 flex gap-3  justify-center items-center"
            onClick={ClearQuantity}
          >
            ClearQuantity
          </button>
          {allCLearDateShow && (
            <button
              className=" text-slate-300    font-bold text-sm  bg-red-600 px-4 py-2  rounded border border-red-200 flex gap-3  justify-center items-center"
              onClick={AllClearDoctorListsDate}
            >
              AllClearDoctorDate
            </button>
          )}
          <button
            onClick={clearMrName}
            className=" text-slate-300    font-bold text-sm  bg-red-600 px-4 py-2  rounded border border-red-200 flex gap-3  justify-center items-center "
          >
            <span>MrNameDelete</span>
            <TiUserDelete />
          </button>
        </div>
      </div>
    </Template>
  );
};

export default ClearDoctorLists;
