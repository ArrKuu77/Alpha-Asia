import React, { useRef, useState } from "react";
import Template from "../component/Template";
import Swal from "sweetalert2";
import { MdSimCardDownload } from "react-icons/md";
import html2pdf from "html2pdf.js/dist/html2pdf.bundle";
import { TiUserDelete } from "react-icons/ti";

const DoctorCallList = () => {
  const date = new Date();
  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  console.log();
  const [DoctorCallList, setDoctorCallList] = useState(
    JSON.parse(localStorage.getItem("DoctorCallList")) == null
      ? []
      : JSON.parse(localStorage.getItem("DoctorCallList"))
  );

  const [DoctorCallListCur, setDoctorCallListCur] = useState(DoctorCallList);

  // console.log(DoctorCallList);
  const currentState = useRef();
  const FilterState = () => {
    const CurrentDoctor = DoctorCallList.filter((doctor) => {
      console.log(currentState.current.value, doctor.DoctorState);
      if (doctor.DoctorState == currentState.current.value) {
        return doctor;
      }

      if (currentState.current.value == "All") {
        return DoctorCallList;
      }
      // if (currentState.current.value - 6 == doctor.DoctorFrequency) {
      //   return doctor;
      // }
    });
    console.log(CurrentDoctor);
    setDoctorCallListCur(CurrentDoctor);
  };
  const ClearDoctorState = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete doctor state!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#2e8b57",
      confirmButtonText: "Yes, delete doctor's state!",
    }).then((result) => {
      if (result.isConfirmed) {
        setDoctorCallList(
          DoctorCallList.map((doctor) => {
            doctor.DoctorFrequency = 0;
            return doctor;
          })
        );
        localStorage.setItem(
          "DoctorCallList",
          JSON.stringify([...DoctorCallList])
        );
        Swal.fire({
          title: "Deleted!",
          text: "Your doctorlist's state  has been deleted.",
          icon: "success",
        });
      }
    });
  };
  const DoctorCallpdfRef = useRef();
  const [tableDisplayNone, settableDisplayNone] = useState(false);

  const Doctorcalldownload = () => {
    settableDisplayNone(true);
    Swal.fire({
      title: "Are you sure Download PDF File?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Download it!",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    }).then((result) => {
      if (result.isConfirmed) {
        var opt = {
          margin: 2,
          filename: `${
            "DoctorCallList " + monthArray[date.getMonth()] + date.getFullYear()
          }`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            // windowWidth:2000,
            // width: DoctorCallpdfRef.current.offsetWidth,
            scale: 1.5,
          },
          jsPDF: { unit: "mm", format: "a4", orientation: "p" },
        };
        // console.log(opt, DoctorCallpdfRef.current.offsetWidth);
        html2pdf().set(opt).from(DoctorCallpdfRef.current).save();

        Swal.fire({
          title: "Download!",
          text: "Your file has been Download.",
          icon: "success",
        });
        settableDisplayNone(false);
      }
    });
  };
  const currentDoctorDelete = (e) => {
    const currentDoctor = DoctorCallList.filter(
      (doctor) => doctor.DoctorName !== e
    );
    setDoctorCallListCur([...currentDoctor]);
    setDoctorCallList([...currentDoctor]);
    localStorage.setItem("DoctorCallList", JSON.stringify([...currentDoctor]));
  };
  const states = ["Empty", "S", "A", "B", "C"];
  const Filterstates = ["All", "S", "A", "B", "C", "Empty"];

  const oneDoctorState = (...doctor) => {
    const [CurrentDoctorName, SyntheticBaseEvent] = doctor;
    console.log(CurrentDoctorName, SyntheticBaseEvent);
    setDoctorCallList(
      DoctorCallList?.map((doctor) => {
        if (doctor.DoctorName == CurrentDoctorName) {
          doctor.DoctorState = SyntheticBaseEvent.target.value;
        }
        return doctor;
      })
    );
    // console.log(DoctorCallList);
    localStorage.setItem("DoctorCallList", JSON.stringify([...DoctorCallList]));
  };
  return (
    <Template>
      <div className="  p-2 bg-slate-500  ">
        <h1 className=" text-3xl text-white py-2  underline bg-slate-900 font-bold">
          Doctor Call List
        </h1>
        <div className=" m-1 flex justify-between items-center">
          <button
            onClick={Doctorcalldownload}
            className=" flex items-center bg-teal-700  py-2 px-1 text-white border-zinc-700 border-2"
          >
            <p>Download</p>
            <MdSimCardDownload className=" text-2xl" />
          </button>
          <button
            onClick={ClearDoctorState}
            className=" bg-red-700  py-2 px-1 text-white border-zinc-700 border-2"
          >
            ClearDoctorState
          </button>
        </div>
        <div className=" flex justify-between items-center my-2 text-xl  font-semibold ">
          <div className=" flex justify-center items-center text-base">
            <label htmlFor="" className="   ">
              Select DoctorState
            </label>
            <select
              onChange={FilterState}
              ref={currentState}
              className="w-1/2 p-1 text-lg"
            >
              {Filterstates.map((state, index) => {
                return (
                  <option key={index} value={state} className="">
                    {state}
                  </option>
                );
              })}
            </select>
          </div>
          <div className=" flex justify-between items-center">
            <p>Totaldoctorlist:</p>
            <p>{DoctorCallList.length}</p>
          </div>
        </div>

        {DoctorCallListCur.length < 1 ? (
          <h1 className=" bg-slate-900 text-yellow-100 p-3 font-bold text-xl">
            There is no state
          </h1>
        ) : (
          <div ref={DoctorCallpdfRef} className=" mx-auto ">
            <div className="text-xl font-bold  flex justify-center underline my-5">
              <p className="">DoctorCallList - </p>

              <p className="">
                {monthArray[date.getMonth()] + date.getFullYear()}
              </p>
            </div>
            <table className=" table-auto text-center  w-full border-collapse borde ">
              <thead>
                <tr className="border border-slate-900 p-2">
                  <th className="border border-slate-900 p-2">No</th>
                  <th className="border border-slate-900 p-2">Customer Name</th>
                  <th className="border border-slate-900 p-2">State</th>
                  <th className="border border-slate-900 p-2">Frequency</th>
                  <th
                    className={`border border-slate-900 p-2 ${
                      tableDisplayNone && "displaynone"
                    }`}
                  >
                    State(Update/Delete)
                  </th>
                </tr>
              </thead>
              <tbody>
                {DoctorCallListCur.map((list, index) => {
                  return (
                    <tr key={index} className="border border-slate-900">
                      <td className="border p-3 border-slate-900 ">
                        {" "}
                        {index + 1}.{" "}
                      </td>
                      <td className="border p-3 border-slate-900 text-center">
                        {" "}
                        {list.DoctorName}{" "}
                      </td>
                      <td className="border p-3 border-slate-900">
                        <h1>{list.DoctorState}</h1>
                      </td>
                      <td className=" p-3 flex justify-between items-center ">
                        <p
                          className={`px-1 py-2  w-1/12 mx-0.5 ${
                            list.DoctorFrequency > 0
                              ? " bg-green-700"
                              : "bg-orange-900"
                          }`}
                        ></p>
                        <p
                          className={`px-1 py-2  w-1/12 mx-0.5 ${
                            list.DoctorFrequency > 1
                              ? " bg-green-700"
                              : "bg-orange-900"
                          }`}
                        ></p>
                        <p
                          className={`px-1 py-2  w-1/12 mx-0.5 ${
                            list.DoctorFrequency > 2
                              ? " bg-green-700"
                              : "bg-orange-900"
                          }`}
                        ></p>
                        <p
                          className={`px-1 py-2  w-1/12 mx-0.5 ${
                            list.DoctorFrequency > 3
                              ? " bg-green-700"
                              : "bg-orange-900"
                          }`}
                        ></p>
                      </td>
                      <td
                        className={`border p-2 border-slate-900  ${
                          tableDisplayNone && "displaynone"
                        }`}
                      >
                        <select
                          onChange={oneDoctorState.bind(this, list.DoctorName)}
                          className=" w-1/2 p-1 text-lg"
                        >
                          {states.map((state, index) => {
                            return (
                              <option key={index} value={state} className="">
                                {state}
                              </option>
                            );
                          })}
                        </select>

                        <TiUserDelete
                          onClick={currentDoctorDelete.bind(
                            null,
                            list.DoctorName
                          )}
                          className=" inline-block  text-red-600 ml-3 text-3xl"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-between items-center m-2">
          <div className=" flex justify-start items-center w-2/5 ">
            <p className=" mr-1">Need Call :</p>
            <p className="px-1 py-2  w-1/12 mx-0.5 bg-orange-900 "></p>
          </div>
          <div className=" flex justify-end items-center w-2/5">
            <p className=" mr-1">Work Done :</p>
            <p className="px-1 py-2  w-1/12 mx-0.5 bg-green-700 "></p>
          </div>
        </div>
        <div className=" border border-red-900 p-2">
          <div className=" text-2xl underline  font-bold mb-2 ">
            About Doctor Calllist State{" "}
          </div>
          <div className="text-center">
            <div className=" flex justify-center items-center text-lg font-semibold">
              <p>Doctor Call State S -</p>
              <p>4 Call and more call Work Done</p>
            </div>
            <div className=" flex justify-center items-center text-lg font-semibold">
              <p>Doctor Call State A -</p>
              <p>3 Call Work Done</p>
            </div>
            <div className=" flex justify-center items-center text-lg font-semibold">
              <p>Doctor Call State B -</p>
              <p>2 Call Work Done</p>
            </div>
            <div className=" flex justify-center items-center text-lg font-semibold">
              <p>Doctor Call State C -</p>
              <p>1 Call Work Done</p>
            </div>

            <div className=" flex justify-center items-center text-lg font-semibold">
              <p>Doctor Call State Blank -</p>
              <p>0 Call Work Done</p>
            </div>
          </div>
        </div>
      </div>
    </Template>
  );
};

export default DoctorCallList;
