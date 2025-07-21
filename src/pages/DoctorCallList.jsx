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
      <div className="p-4 bg-slate-900 min-h-screen text-white">
        <h1 className="text-3xl font-bold underline bg-slate-800 py-2 px-4 mb-4">
          Doctor Call List
        </h1>

        <div className="flex flex-row justify-between items-center gap-3 mb-4">
          <button
            onClick={Doctorcalldownload}
            className="flex items-center gap-2 bg-teal-700 hover:bg-teal-600 transition px-4 py-2 rounded text-white border border-teal-800"
          >
            <p>Download</p>
            <MdSimCardDownload className="text-2xl" />
          </button>

          <button
            onClick={ClearDoctorState}
            className="bg-red-700 hover:bg-red-600 transition px-4 py-2 rounded text-white border border-red-800"
          >
            ClearDoctorState
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4 text-lg font-semibold">
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            <label htmlFor="filterState" className="min-w-max">
              Select DoctorState:
            </label>
            <select
              id="filterState"
              onChange={FilterState}
              ref={currentState}
              className="w-full sm:w-48 p-2 rounded bg-slate-800 text-white border border-slate-700"
            >
              {Filterstates.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 items-center">
            <p>Total doctor list:</p>
            <p className="font-bold">{DoctorCallList.length}</p>
          </div>
        </div>

        {DoctorCallListCur.length < 1 ? (
          <h1 className="bg-slate-800 text-yellow-400 p-4 font-bold text-center rounded">
            There is no state
          </h1>
        ) : (
          <div
            ref={DoctorCallpdfRef}
            className="overflow-x-auto rounded border border-slate-700 bg-slate-800"
          >
            <div className="text-xl font-bold flex justify-center underline py-4 text-yellow-400">
              <p>DoctorCallList - </p>
              <p className="ml-2">
                {monthArray[date.getMonth()] + " " + date.getFullYear()}
              </p>
            </div>

            <table className="table-auto w-full border-collapse text-center text-sm sm:text-base">
              <thead>
                <tr>
                  <th className="border border-slate-700 p-2">No</th>
                  <th className="border border-slate-700 p-2">Customer Name</th>
                  <th className="border border-slate-700 p-2">State</th>
                  <th className="border border-slate-700 p-2">Frequency</th>
                  <th
                    className={`border border-slate-700 p-2 ${
                      tableDisplayNone ? "hidden" : ""
                    }`}
                  >
                    State (Update/Delete)
                  </th>
                </tr>
              </thead>
              <tbody>
                {DoctorCallListCur.map((list, index) => (
                  <tr
                    key={index}
                    className="border border-slate-700 even:bg-slate-700 hover:bg-slate-600 transition"
                  >
                    <td className="border p-3 border-slate-700">{index + 1}</td>
                    <td className="border p-3 border-slate-700">
                      {list.DoctorName}
                    </td>
                    <td className="border p-3 border-slate-700">
                      {list.DoctorState}
                    </td>
                    <td className="p-3 flex justify-center items-center gap-1">
                      {[0, 1, 2, 3].map((i) => (
                        <span
                          key={i}
                          className={`px-2 py-1 w-6 rounded ${
                            list.DoctorFrequency > i
                              ? "bg-green-700"
                              : "bg-orange-900"
                          }`}
                          aria-label={`Frequency ${i + 1}`}
                        />
                      ))}
                    </td>
                    <td
                      className={`border p-2 border-slate-700 ${
                        tableDisplayNone ? "hidden" : ""
                      }`}
                    >
                      <select
                        onChange={() => oneDoctorState(list.DoctorName)}
                        className="w-1/2 p-1 rounded bg-slate-700 text-white border border-slate-600"
                      >
                        {states.map((state, idx) => (
                          <option key={idx} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                      <TiUserDelete
                        onClick={() => currentDoctorDelete(list.DoctorName)}
                        className="inline-block ml-3 text-red-600 text-3xl cursor-pointer hover:text-red-400 transition"
                        title="Delete Doctor"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center my-4 gap-4 text-lg">
          <div className="flex items-center gap-2">
            <p>Need Call :</p>
            <span className="px-3 py-1 bg-orange-900 rounded w-6 h-6 block" />
          </div>
          <div className="flex items-center gap-2">
            <p>Work Done :</p>
            <span className="px-3 py-1 bg-green-700 rounded w-6 h-6 block" />
          </div>
        </div>

        <div className="border border-red-900 p-4 rounded bg-slate-800 text-center">
          <h2 className="text-2xl font-bold underline mb-4">
            About Doctor Calllist State
          </h2>
          <div className="space-y-2 text-lg font-semibold">
            <div className="flex bg-slate-900 py-1 justify-center gap-2 flex-col">
              <p>Doctor Call State S </p>
              <p>4 Call and more call Work Done</p>
            </div>
            <div className="flex bg-slate-900 py-1 justify-center gap-2 flex-col">
              <p>Doctor Call State A </p>
              <p>3 Call Work Done</p>
            </div>
            <div className="flex bg-slate-900 py-1 justify-center gap-2 flex-col">
              <p>Doctor Call State B </p>
              <p>2 Call Work Done</p>
            </div>
            <div className="flex bg-slate-900 py-1 justify-center gap-2 flex-col">
              <p>Doctor Call State C </p>
              <p>1 Call Work Done</p>
            </div>
            <div className="flex justify-center gap-2">
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
