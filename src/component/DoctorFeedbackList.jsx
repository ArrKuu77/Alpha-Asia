import React, { useRef, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { LiaUserEditSolid } from "react-icons/lia";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import SalesForm from "./SalesForm";
import { NavLink } from "react-router-dom";
// import PDFfile from "./PDFfile";

const DoctorFeedbackList = ({
  DoctorList,
  DeleteDoctorList,
  DoctorNameDate,
  EditDoctorList,
}) => {
  return (
    <div className="w-full overflow-x-auto p-4 bg-slate-900 text-white rounded-md">
      <table className="min-w-[800px] w-full table-auto border-collapse text-sm md:text-base">
        <thead>
          <tr className="bg-yellow-600 text-black">
            <th className="border border-slate-700 p-2">No</th>
            <th className="border border-slate-700 p-2">Customer Name</th>
            <th className="border border-slate-700 p-2">Place</th>
            <th className="border border-slate-700 p-2">Speciality</th>
            <th className="border border-slate-700 p-2">Focus Products</th>
            <th className="border border-slate-700 p-2">Customer Feedback</th>
            {/* <th className="border border-slate-700 p-2">Next Call Plan</th> */}
            <th className="border border-slate-700 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {DoctorList.map((list, index) => (
            <tr key={index} className="hover:bg-slate-800">
              <td className="border border-slate-700 p-3 text-center">
                {index + 1}
              </td>
              <td className="border border-slate-700 p-3 text-center">
                {list.DoctorName}
              </td>
              <td className="border border-slate-700 p-3 text-center">
                {list.Hospital}
              </td>
              <td className="border border-slate-700 p-3 text-center">
                {list.Objective}
              </td>
              <td className="border border-slate-700 p-3 text-center">
                {list.ShortName?.length === 0 ? "-" : list.ShortName.join(", ")}
              </td>
              <td className="border border-slate-700 p-3 text-center">
                {list.CustomerFeedback}
              </td>
              {/* <td className="border border-slate-700 p-3 text-center">
                {list.NextPlan}
              </td> */}
              <td className="border border-slate-700 p-3">
                <div className="flex items-center justify-center gap-4">
                  <LiaUserEditSolid
                    onClick={() =>
                      EditDoctorList(list.id, DoctorNameDate.current.value)
                    }
                    className="text-2xl text-blue-500 cursor-pointer"
                  />
                  <TiDelete
                    onClick={() =>
                      DeleteDoctorList(list.id, DoctorNameDate.current.value)
                    }
                    className="text-2xl text-red-500 cursor-pointer"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Sales Form Below Table */}
      <div className="mt-4 min-w-[800px]">
        <SalesForm />
      </div>
    </div>
  );
};

export default DoctorFeedbackList;
