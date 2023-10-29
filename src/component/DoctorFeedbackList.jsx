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
  const pdfRef = useRef();
  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imageWidth = canvas.width;
      const imageHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imageWidth, pdfHeight / imageHeight);
      const imgX = (pdfWidth - imageWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imageWidth * ratio,
        imageHeight * ratio
      );
      pdf.save("Daily.pdf");
    });
  };
  return (
    <>
      {DoctorList.length > 0 ? (
        <div ref={pdfRef} className="  maxContent">
          <table className=" mx-auto mb-10 mt-4 table-auto text-center  w-full border-collapse border border-slate-900 ">
            <thead>
              <tr className="border border-slate-900 p-2">
                <th className="border border-slate-900 p-2">No</th>
                <th className="border border-slate-900 p-2">Customer Name</th>
                <th className="border border-slate-900 p-2">Call Purpose</th>
                <th className="border border-slate-900 p-2">Product Name</th>
                <th className="border border-slate-900 p-2">
                  Customer's Feedback
                </th>
                <th className="border border-slate-900 p-2">
                  Action plan form next call
                </th>
                <th className="border border-slate-900 p-2">Update & Delete</th>
                {/* <th className=" text-center">Edit</th> */}
              </tr>
            </thead>
            <tbody>
              {DoctorList.map((list, index) => {
                return (
                  <tr key={index} className="border border-slate-900">
                    <td className="border p-3 border-slate-900 flex justify-between align-items-center">
                      {" "}
                      {index + 1}.{" "}
                    </td>
                    <td className="border p-3 border-slate-900 text-center">
                      {" "}
                      {list.DoctorName}{" "}
                    </td>
                    <td className="border p-3 border-slate-900">
                      {list.ShortName.length <= 0
                        ? "-"
                        : list.ShortName.map((name) => name + ",")}
                    </td>
                    <td className="border p-3 border-slate-900">
                      {list.ShortName.length <= 0
                        ? "-"
                        : list.ShortName.map((name) => name + ",")}
                    </td>
                    <td className="border p-3 border-slate-900">
                      {list.CustomerFeedback}
                    </td>
                    <td className="border p-3 border-slate-900">
                      {list.NextPlan}
                    </td>
                    <td className="border p-3 border-slate-900">
                      <div className="flex items-center justify-between">
                        <LiaUserEditSolid
                          onClick={EditDoctorList.bind(
                            null,
                            list.id,
                            DoctorNameDate.current.value
                          )}
                          className="  text-3xl  text-blue-600"
                        />
                        <TiDelete
                          onClick={DeleteDoctorList.bind(
                            null,
                            list.id,
                            DoctorNameDate.current.value
                          )}
                          className="  text-3xl  text-red-600"
                        />
                      </div>
                    </td>
                    {/* <td className=" text-center ">
                    <i
                      onClick={ItemListShowFunction.bind(null, list)}
                      className="bi bi-pencil fw-bold text-white me-2   pointer-event bg-primary p-1 border border-2 rounded"
                    ></i>
                    <i
                      onClick={DeleteItem.bind(null, list.id)}
                      className="bi bi-trash fw-bold text-white   pointer-event bg-danger p-1 border border-2 rounded"
                    ></i>
                  </td> */}
                  </tr>
                );
              })}
            </tbody>
            {/* <tfoot>
            <tr>
              <td className="" colSpan={4}>
                Total
              </td>
              <td>{Lists.reduce((pv, cv) => pv + cv.amount, 0)}</td>
              <td></td>
            </tr>
          </tfoot> */}
          </table>

          <SalesForm />
          {/* <PDFfile /> */}
          <NavLink to="/ReadyDoctorList">
            <button className=" bg-indigo-500 p-2 rounded-md border-gray-900 border-2 mx-auto mt-2 text-start block ">
              Go PDF File
            </button>
          </NavLink>
          {/* <button onClick={downloadPDF}>Download</button> */}
        </div>
      ) : (
        <div className=" border border-spacing-10 m-4">
          <h1 className=" ">There are no Lists ! </h1>
        </div>
      )}
    </>
  );
};

export default DoctorFeedbackList;
