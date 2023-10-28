import React, { useRef } from "react";
import SalesForm from "../component/SalesForm";
import { TiDelete } from "react-icons/ti";
import { LiaUserEditSolid } from "react-icons/lia";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Template from "../component/Template";

const ReadyDoctorList = ({
  DoctorList,
  DeleteDoctorList,
  DoctorNameDate,
  EditDoctorList,
  CurrentDate,
  Township,
}) => {
  console.log(DoctorList);
  const pdfRef = useRef();
  const downloadPDF = (D, w) => {
    console.log(D, w, CurrentDate);
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
      D !== null && pdf.save(`${CurrentDate + " " + D}`);
      w !== null && pdf.save(`${CurrentDate + " " + w}`);
    });
  };
  return (
    <>
      {DoctorList.length > 0 ? (
        <Template>
          <div className="  maxContent bg-slate-500 pt-2 p-2 ">
            <div className=" px-4" ref={pdfRef}>
              <div className="flex justify-between items-center">
                <div className=" flex items-center">
                  <label htmlFor="" className=" font-medium text-xl block  ">
                    MR Name -
                  </label>
                  <span className="block text-xl  text-black 	">
                    {localStorage.getItem("MrName") == null
                      ? "Your Name"
                      : localStorage.getItem("MrName")}
                  </span>
                </div>
                <div className=" flex items-center">
                  <label htmlFor="" className=" font-medium text-xl block  ">
                    Date -
                  </label>
                  <span className="block text-xl  text-black 	">
                    {CurrentDate}
                  </span>
                </div>
                <div className=" flex items-center">
                  <label htmlFor="" className=" font-medium text-xl block  ">
                    Township -
                  </label>
                  <span className="block text-xl  text-black 	">{Township}</span>
                </div>
              </div>
              <table className=" mx-auto mb-10 mt-4 table-auto text-center  w-full border-collapse border border-slate-900 ">
                <thead>
                  <tr className="border border-slate-900 p-2">
                    <th className="border border-slate-900 p-2">No</th>
                    <th className="border border-slate-900 p-2">
                      Customer Name
                    </th>
                    <th className="border border-slate-900 p-2">
                      Call Purpose
                    </th>
                    <th className="border border-slate-900 p-2">
                      Product Name
                    </th>
                    <th className="border border-slate-900 p-2">
                      Customer's Feedback
                    </th>
                    <th className="border border-slate-900 p-2">
                      Action plan form next call
                    </th>

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
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <SalesForm />
            </div>
            <div className=" ">
              <button
                className="bg-indigo-500 p-2 rounded-md border-gray-900 border-2 mx-auto mt-2 text-start block"
                onClick={downloadPDF.bind(null, "DailyReport", null)}
              >
                Download PDF For Daily
              </button>
              <button
                className="bg-indigo-500 p-2 rounded-md border-gray-900 border-2 mx-auto mt-2 text-start block"
                onClick={downloadPDF.bind(null, null, "WeeklyReport")}
              >
                Download PDF For Weekly
              </button>
            </div>
          </div>
        </Template>
      ) : (
        <div className=" border border-spacing-10 m-4">
          <h1 className=" ">There are no Lists ! </h1>
        </div>
      )}
    </>
  );
};

export default ReadyDoctorList;
