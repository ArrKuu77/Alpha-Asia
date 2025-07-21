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
import { addReport, supabase } from "../supabase";
import { json, useNavigate } from "react-router-dom";
import { VscLoading } from "react-icons/vsc";

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
  const navigator = useNavigate();
  // const downloadPDFpage = (D, w) => {
  //   console.log(D, w, CurrentDate);
  //   const input = pdfRef.current;
  //   html2canvas(input).then((canvas) => {
  //     var imgData = canvas.toDataURL("image/png");
  //     const doc = new jsPDF("landscape", "px", "a4", true, true);
  //     var imgHeight = (canvas.height * 208) / canvas.width;
  //     doc.addImage(imgData, 0, 0, 208, imgHeight);
  //     doc.save("result.pdf");
  //   });
  // };
  const [loading, setLoading] = useState(false);
  const dailySaleLS = localStorage.getItem("TotalSales")
    ? JSON.parse(localStorage.getItem("TotalSales"))
    : { TotalSale: 0, Todaysales: 0 };
  const dailyProductQtyLS = localStorage.getItem("QuantityList")
    ? JSON.parse(localStorage.getItem("QuantityList"))
    : [];

  const [DoctorCallList, setDoctorCallList] = useState(
    localStorage.getItem("DoctorCallList") == null
      ? []
      : JSON.parse(localStorage.getItem("DoctorCallList"))
  );
  const [doctorArray, setdoctorArray] = useState(
    DoctorCallList.map((doctor) => doctor.DoctorName.toLowerCase())
  );
  console.log(DoctorCallList);
  console.log(doctorArray);
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
        title: "Are you sure to download the PDF file?",
        text: "You won't be able to revert this!",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes, Download it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          // If D is truthy, update DoctorCallList logic
          if (D) {
            // Create new doctor list with default frequency and state
            const newDoctorList = DoctorList.map((doctor) => ({
              DoctorName: doctor.DoctorName,
              DoctorFrequency: 1,
              DoctorState: "Empty",
            }));

            // Increase frequency for matching doctors in DoctorCallList
            DoctorCallList.forEach((doctorCall) => {
              newDoctorList.forEach((newDoctor) => {
                if (
                  doctorCall.DoctorName.toLowerCase() ===
                  newDoctor.DoctorName.toLowerCase()
                ) {
                  doctorCall.DoctorFrequency += 1;
                }
              });
            });

            // Save updated DoctorCallList to localStorage
            localStorage.setItem(
              "DoctorCallList",
              JSON.stringify([...DoctorCallList])
            );

            // Filter doctors that are NOT already in doctorArray (case-insensitive)
            const filteredNewDoctors = newDoctorList.filter(
              (nd) => !doctorArray.includes(nd.DoctorName.toLowerCase())
            );

            // Update state with newly filtered doctors appended
            setDoctorCallList([...DoctorCallList, ...filteredNewDoctors]);
            setdoctorArray([
              ...doctorArray,
              ...filteredNewDoctors.map((d) => d.DoctorName.toLowerCase()),
            ]);

            // Save combined list to localStorage again (new doctors + old)
            localStorage.setItem(
              "DoctorCallList",
              JSON.stringify([...filteredNewDoctors, ...DoctorCallList])
            );
          }

          // Prepare PDF options
          const opt = {
            margin: 0.5,
            filename: `${D ? CurrentDate + D : CurrentDate + w}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "pt", format: "a4", orientation: "landscape" },
            pagebreak: { mode: ["css", "legacy"] },
          };

          const isSafari = /^((?!chrome|android).)*safari/i.test(
            navigator.userAgent
          );
          if (isSafari) opt.html2canvas.scale = 1;

          html2pdf().set(opt).from(pdfRef.current).save();

          // Success alert
          swalWithBootstrapButtons.fire({
            title: "Download!",
            text: "Your file has been downloaded.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Cancel alert
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "The file was not downloaded.",
            icon: "error",
          });
        }
      });
  };

  // const downloadPDF = (D, w) => {
  //   const opt = {
  //     margin: 0.5,
  //     filename: `${w}_Expenses.pdf`,
  //     image: { type: "jpeg", quality: 0.98 },
  //     html2canvas: { scale: 2 },
  //     jsPDF: { unit: "pt", format: "a4", orientation: "landscape" },
  //     pagebreak: { mode: ["css", "legacy"] },
  //   };

  //   const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  //   if (isSafari) opt.html2canvas.scale = 1;

  //   html2pdf().set(opt).from(pdfRef.current).save();
  // };

  const MrId =
    localStorage.getItem("MrName") == null
      ? null
      : JSON.parse(localStorage.getItem("MrName")).mrId;

  const UploadDoctorList = () => {
    if (!Township || MrId == null) {
      Swal.fire({
        title: "Please check your Township or MR Name",
        icon: "error",
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You want to upload data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, upload it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const { data, error } = await addReport(
          MrId,
          DoctorList,
          CurrentDate,
          dailySaleLS,
          dailyProductQtyLS,
          Township
        );
        if (data) {
          const newDoctor = DoctorList.map((doctor) => {
            return {
              DoctorName: doctor.DoctorName,
              DoctorFrequency: 1,
              DoctorState: "Empty",
            };
          });
          DoctorCallList.map((doctorCall) => {
            newDoctor.map((newdoctor) => {
              if (
                doctorCall.DoctorName.toLowerCase() ==
                newdoctor.DoctorName.toLowerCase()
              ) {
                doctorCall.DoctorFrequency += 1;
              }
              return doctorCall;
            });
          });

          localStorage.setItem(
            "DoctorCallList",
            JSON.stringify([...DoctorCallList])
          );

          const trueDoctor = newDoctor.filter((ndoctor) => {
            console.log(doctorArray.includes(ndoctor.DoctorName));
            if (doctorArray.includes(ndoctor.DoctorName.toLowerCase())) {
              console.log(ndoctor);
            } else {
              console.log(ndoctor);

              return ndoctor;
            }
          });
          console.log(trueDoctor);
          setDoctorCallList([...DoctorCallList, ...trueDoctor]);
          setdoctorArray([
            ...doctorArray,
            ...trueDoctor.map((d) => d.DoctorName.toLowerCase()),
          ]);
          localStorage.setItem(
            "DoctorCallList",
            JSON.stringify([...trueDoctor, ...DoctorCallList])
          );
          Swal.fire({
            title: "Upload is successful",
            icon: "success",
            draggable: true,
          });
          setLoading(false);
          navigator("/");
        } else {
          Swal.fire({
            title: `${error}`,
            icon: "error",
            draggable: true,
          });
        }
      }
    });
  };
  return (
    <>
      {DoctorList.length > 0 ? (
        <Template>
          <div className="maxContent bg-gray-900 p-4 min-h-screen text-white">
            <div className="p-3 w-full maxContent" ref={pdfRef}>
              {/* Responsive table wrapper */}
              <div className="overflow-x-auto mt-6">
                {/* Header info: stacked on small screens, horizontal on md+ */}
                <div className="flex w-full min-w-[700px] my-2 flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <label className="font-semibold text-lg min-w-max">
                      MR Name -
                    </label>
                    <span className="text-lg text-yellow-400">
                      {localStorage.getItem("MrName") ?? "Your Name"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <label className="font-semibold text-lg min-w-max">
                      Date -
                    </label>
                    <span className="text-lg text-yellow-400">
                      {CurrentDate}
                    </span>
                  </div>
                  {/* <div className="flex items-center gap-2 flex-wrap">
                    <label className="font-semibold text-lg min-w-max">
                      Township -
                    </label>
                    <span className="text-lg text-yellow-400">{Township}</span>
                  </div> */}
                </div>
                <table className="w-full min-w-[700px] table-auto border-collapse border border-gray-700 text-center">
                  <thead className="bg-sky-500 ">
                    <tr>
                      <th className="border border-gray-700 p-2">No</th>
                      <th className="border border-gray-700 p-2">
                        Customer Name
                      </th>
                      <th className="border border-gray-700 p-2">Place</th>
                      <th className="border border-gray-700 p-2">Speciality</th>
                      <th className="border border-gray-700 p-2">
                        Focus Products
                      </th>
                      <th className="border border-gray-700 p-2">
                        Customer's Feedback
                      </th>
                      {/* <th className="border border-gray-700 p-2">
                        Action plan for next call
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {DoctorList.map((list, index) => (
                      <tr
                        key={index}
                        className={`border border-gray-700 even:bg-gray-800 hover:bg-gray-700 transition`}
                      >
                        <td className="border p-3 border-gray-700 text-center">
                          {index + 1}
                        </td>
                        <td className="border p-3 border-gray-700 text-center">
                          {list.DoctorName}
                        </td>
                        <td className="border p-3 border-gray-700">
                          {list.Hospital}
                        </td>
                        <td className="border p-3 border-gray-700">
                          {list.Objective}
                        </td>
                        <td className="border p-3 border-gray-700 text-yellow-300">
                          {list.ShortName.length > 0
                            ? list.ShortName.join(", ")
                            : "-"}
                        </td>
                        <td className="border p-3 border-gray-700">
                          {list.CustomerFeedback}
                        </td>
                        {/* <td className="border p-3 border-gray-700">
                          {list.NextPlan}
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* <SalesForm /> */}
              </div>

              {/* <SalesForm /> */}
            </div>

            {/* Buttons with responsive layout */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 max-w-sm mx-auto">
              <button
                className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-md border border-indigo-900 text-white transition"
                onClick={downloadPDF.bind(null, "DailyReport", null)}
              >
                Download PDF For Daily
              </button>

              <button
                className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-md border border-indigo-900 text-white transition"
                onClick={downloadPDF.bind(null, null, "WeeklyReport")}
              >
                Download PDF For Weekly
              </button>

              <button
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed p-3 rounded-md border border-indigo-900 text-white transition"
                onClick={() => UploadDoctorList()}
                disabled
              >
                {loading ? (
                  <span className="flex justify-center text-white items-center gap-2 text-xl">
                    Loading
                    <span className="animate-pulse">...</span>
                    <VscLoading className="animate-spin" />
                  </span>
                ) : (
                  "Upload Doctor List is coming soon"
                )}
              </button>
            </div>
          </div>
        </Template>
      ) : (
        <div className="border border-gray-700 m-4 p-6 text-center text-white bg-gray-800 rounded">
          <h1>There are no Lists!</h1>
        </div>
      )}
    </>
  );
};

export default ReadyDoctorList;
