import React, { useRef, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { editReport } from "../supabase";
import { useNavigate } from "react-router-dom";
// import { LiaUserEditSolid } from "react-icons/lia";
const EditReportReview = () => {
  const formRef = useRef();

  const nav = useNavigate();
  const ProductCreateList =
    localStorage.getItem("CreateProductList") == null
      ? []
      : JSON.parse(localStorage.getItem("CreateProductList"));
  const [ShortName, setShortName] = useState([]);
  console.log(ShortName);
  const [report, setReport] = useState(
    localStorage.getItem("reviewEdit") == null
      ? ""
      : JSON.parse(localStorage.getItem("reviewEdit"))
  );
  console.log(report);
  const [reportDetail, setReportDetail] = useState(report.report_detail);

  const handleAdd = () => {
    const formData = new FormData(formRef.current);

    const newData = {
      DoctorName: formData.get("DoctorName"),
      CustomerFeedback: formData.get("CustomerFeedback"),
      NextPlan: formData.get("NextPlan"),
      Objective: formData.get("Objective"),
      Hospital: formData.get("Hospital"),
      ShortName: ShortName,
      id: Date.now(),
    };
    setReportDetail([...reportDetail, newData]);
    localStorage.setItem(
      "reviewEdit",
      JSON.stringify({ ...report, report_detail: [...reportDetail, newData] })
    );
  };
  const [OldDoctorNameArray, setOldDoctorNameArray] = useState(
    JSON.parse(localStorage.getItem("DoctorCallList")) == null
      ? []
      : JSON.parse(localStorage.getItem("DoctorCallList"))
  );
  const [OldDoctorName, setOldDoctorName] = useState("");
  const [filterOldDcotorName, setFilterOldDcotorName] = useState([]);

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
  const UploadUpdate = async () => {
    const { data, error } = await editReport(
      report.id,
      report.employee_id,
      reportDetail,
      report.date,
      report.daily_sale,
      report.daily_productQty,
      report.township
    );
    if (!error) {
      nav("/");
    } else {
      alert("Error", error);
    }
  };

  return (
    <div>
      {" "}
      <div className="container mx-auto ">
        <form ref={formRef} id="DoctorForm" onSubmit={handleAdd}></form>

        <div className="col col-md-3">
          <label htmlFor="" className=" text-2xl block  ">
            Doctor Name
          </label>
          <input
            value={OldDoctorName}
            onChange={FilterDoctorCallName}
            required
            name="DoctorName"
            form="DoctorForm"
            type="text"
            className=" border-solid border-2  border-red-800	text-black	"
            placeholder="Doctor Name"
          />
          {filterOldDcotorName.length > 0 && (
            <div className="relative">
              <div className=" absolute   top-1 left-0 right-0">
                <div className=" bg-white scroll-smooth   overflow-scroll  w-2/4 mx-auto">
                  {filterOldDcotorName?.map((e, index) => {
                    console.log(e, index);
                    return (
                      <p
                        key={index}
                        onClick={handalarOldCurrentName}
                        className=" opacity-100 font-semibold text-xl border border-black p-1 "
                      >
                        {e.DoctorName}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="col col-md-3">
          <label htmlFor="" className=" text-xl font-medium text-black	 block  ">
            Hospital
          </label>
          <input
            required
            name="Hospital"
            form="DoctorForm"
            type="text"
            className=" border-solid border-2  border-red-800	text-black	"
            placeholder="Hospital"
          />
        </div>

        <div className="col col-md-3">
          <label htmlFor="" className=" text-xl font-medium text-black	 block  ">
            Objective
          </label>
          <input
            required
            name="Objective"
            form="DoctorForm"
            type="text"
            className=" border-solid border-2  border-red-800	text-black	"
            placeholder="Objective"
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
        {ProductCreateList.length > 0 ? (
          <div>
            {ProductCreateList.map(({ name, SName }, index) => (
              <div key={index}>
                <label htmlFor="">{name}</label>
                <input
                  onClick={(event) => {
                    const Shorttrue = ShortName.includes(event.target.value);
                    if (!Shorttrue) {
                      event.target.checked = true;

                      setShortName([...ShortName, event.target.value]);
                    } else {
                      event.target.checked = false;

                      const deleteShortName = ShortName.filter((name) => {
                        if (name !== event.target.value) {
                          console.log(name);
                          return name;
                        }
                      });
                      setShortName(deleteShortName);
                    }
                  }}
                  type="checkbox"
                  value={SName}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>No product List</p>
        )}

        <div className="my-4">
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Add New Row
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-800 text-gray-200">
                <th className="px-4 py-2">Doctor Name</th>
                <th className="px-4 py-2">Hospital</th>
                <th className="px-4 py-2">Objective</th>
                <th className="px-4 py-2">Short Name</th>
                <th className="px-4 py-2">Customer Feedback</th>
                <th className="px-4 py-2">Next Plan</th>
                <th className="px-4 py-2">Actions</th>{" "}
                {/* New Actions column */}
              </tr>
            </thead>
            <tbody>
              {/* Render the report data */}
              {reportDetail?.map((report) => (
                <tr
                  key={report.id}
                  className="odd:bg-gray-100 even:bg-white hover:bg-gray-200"
                >
                  <td className="px-4 py-2">{report.DoctorName}</td>
                  <td className="px-4 py-2">{report.Hospital}</td>
                  <td className="px-4 py-2">{report.Objective}</td>
                  <td className="px-4 py-2">
                    {report.ShortName.length <= 0
                      ? "-"
                      : report.ShortName.map((name, index) => (
                          <span key={index}>
                            {name}
                            {index < report.ShortName.length - 1 ? ", " : ""}
                          </span>
                        ))}
                  </td>
                  <td className="px-4 py-2">
                    {report.CustomerFeedback || "-"}
                  </td>
                  <td className="px-4 py-2">{report.NextPlan || "-"}</td>
                  {/* Action Buttons */}
                  <td className="px-4 py-2 flex flex-col my-[10%]  justify-between items-center gap-5 ">
                    {/* <button
                      // onClick={() => handleEdit(report.id)}
                      className="px-2 py-2  bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                    >
                      <LiaUserEditSolid />
                    </button> */}
                    <button
                      // onClick={() => handleDelete(report.id)}
                      className="px-2 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      <TiDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className=" p-5 flex justify-end items-center ">
        <button
          onClick={UploadUpdate}
          className=" rounded-lg px-4 py-2 text-white bg-slate-700 border text-md font-semibold"
        >
          UploadUpdate
        </button>
      </div>
    </div>
  );
};

export default EditReportReview;
