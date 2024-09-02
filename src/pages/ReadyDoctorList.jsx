import React, { useRef, useState } from "react";
import SalesForm from "../component/SalesForm";
import { TiDelete } from "react-icons/ti";
import { LiaUserEditSolid } from "react-icons/lia";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Template from "../component/Template";
import html2pdf from "html2pdf.js/dist/html2pdf.bundle";
import Swal from "sweetalert2";
import { MdSimCardDownload } from "react-icons/md";

const ReadyDoctorList = ({
  DoctorList,
  DeleteDoctorList,
  DoctorNameDate,
  EditDoctorList,
  CurrentDate,
  Township,
}) => {
  const pdfRef = useRef();

  const [DoctorCallList, setDoctorCallList] = useState(
    localStorage.getItem("DoctorCallList") == null
      ? []
      : JSON.parse(localStorage.getItem("DoctorCallList"))
  );

  const [doctorArray, setdoctorArray] = useState(
    DoctorCallList.map((doctor) => doctor.DoctorName.toLowerCase())
  );

  const [loadingProgress, setLoadingProgress] = useState(0); // State to track loading progress

  const downloadPDF = (D, w) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure you want to download the PDF?",
        text: "You won't be able to revert this!",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes, download it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          if (D) {
            const newDoctor = DoctorList.map((doctor) => ({
              DoctorName: doctor.DoctorName,
              DoctorFrequency: 1,
              DoctorState: "Empty",
            }));

            DoctorCallList.forEach((doctorCall) => {
              newDoctor.forEach((newdoctor) => {
                if (
                  doctorCall.DoctorName.toLowerCase() ===
                  newdoctor.DoctorName.toLowerCase()
                ) {
                  doctorCall.DoctorFrequency += 1;
                }
              });
            });

            const trueDoctor = newDoctor.filter(
              (ndoctor) =>
                !doctorArray.includes(ndoctor.DoctorName.toLowerCase())
            );

            setDoctorCallList([...DoctorCallList, ...trueDoctor]);
            setdoctorArray([
              ...doctorArray,
              ...trueDoctor.map((d) => d.DoctorName.toLowerCase()),
            ]);

            localStorage.setItem(
              "DoctorCallList",
              JSON.stringify([...trueDoctor, ...DoctorCallList])
            );
          }

          const opt = {
            margin: 0.5,
            filename: `${D ? CurrentDate + D : CurrentDate + w}`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: {
              scale: 2, // Increase scale to improve rendering
              onclone: (clonedDoc) => {
                setLoadingProgress(0); // Reset progress when cloning starts
              },
              onprogress: (progress) => {
                setLoadingProgress(Math.floor(progress * 100)); // Update progress state
              },
            },
            jsPDF: { unit: "pt", format: "a4", orientation: "landscape" },
          };

          const isSafari = /^((?!chrome|android).)*safari/i.test(
            navigator.userAgent
          );
          if (isSafari) {
            opt.html2canvas.scale = 1; // Adjust scale specifically for Safari
          }

          setTimeout(() => {
            html2pdf().set(opt).from(pdfRef.current).save();
          }, 100); // Adding a slight delay for rendering in Safari

          swalWithBootstrapButtons.fire({
            title: "Downloaded!",
            text: "Your file has been downloaded.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "The file was not downloaded.",
            icon: "error",
          });
        }
      });
  };

  return (
    <>
      {DoctorList.length > 0 ? (
        <Template>
          <div className="maxContent bg-slate-500 pt-2 p-1">
            <div className="p-3 w-full maxContent" ref={pdfRef}>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <label className="font-medium text-xl">MR Name -</label>
                  <span className="text-xl text-black">
                    {localStorage.getItem("MrName") || "Your Name"}
                  </span>
                </div>
                <div className="flex items-center">
                  <label className="font-medium text-xl">Date -</label>
                  <span className="text-xl text-black">{CurrentDate}</span>
                </div>
                <div className="flex items-center">
                  <label className="font-medium text-xl">Township -</label>
                  <span className="text-xl text-black">{Township}</span>
                </div>
              </div>
              <table className="mx-auto mb-10 mt-4 table-auto text-center w-full border-collapse border border-slate-900">
                <thead>
                  <tr className="border border-slate-900 p-2">
                    <th className="border p-2">No</th>
                    <th className="border p-2">Customer Name</th>
                    <th className="border p-2">Call Purpose</th>
                    <th className="border p-2">Product Name</th>
                    <th className="border p-2">Customer's Feedback</th>
                    <th className="border p-2">Action plan for next call</th>
                  </tr>
                </thead>
                <tbody>
                  {DoctorList.map((list, index) => (
                    <tr key={index} className="border border-slate-900">
                      <td className="border p-3 text-center">{index + 1}</td>
                      <td className="border p-3 text-center">
                        {list.DoctorName}
                      </td>
                      <td className="border p-3">{list.CallPurpose}</td>
                      <td className="border p-3">
                        {list.ShortName.length <= 0
                          ? "-"
                          : list.ShortName.join(", ")}
                      </td>
                      <td className="border p-3">{list.CustomerFeedback}</td>
                      <td className="border p-3">{list.NextPlan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <SalesForm />
            </div>

            {loadingProgress > 0 && loadingProgress < 100 && (
              <div className="my-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${loadingProgress}%` }}
                  ></div>
                </div>
                <p className="text-center mt-2">{loadingProgress}%</p>
              </div>
            )}

            <div className="mt-4">
              <button
                className="bg-indigo-500 p-2 rounded-md border-gray-900 border-2 mx-auto mt-2 block"
                onClick={() => downloadPDF("  DailyReport", null)}
              >
                Download PDF For Daily
              </button>
              <button
                className="bg-indigo-500 p-2 rounded-md border-gray-900 border-2 mx-auto mt-2 block"
                onClick={() => downloadPDF(null, "  WeeklyReport")}
              >
                Download PDF For Weekly
              </button>
            </div>
          </div>
        </Template>
      ) : (
        <div className="border border-spacing-10 m-4">
          <h1>There are no lists!</h1>
        </div>
      )}
    </>
  );
};

export default ReadyDoctorList;
