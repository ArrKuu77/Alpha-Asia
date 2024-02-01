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
  console.log(DoctorList);
  const pdfRef = useRef();
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
        title: "Are you sure Download PDF File?",
        text: "You won't be able to revert this!",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes, Download it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          if (D) {
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
          }

          console.log(D, w, CurrentDate);
          console.log(pdfRef.current.offsetWidth, pdfRef.current.offsetHeight);
          // console.log(window.innerWidth + 300);

          var opt = {
            margin: 0.5,
            filename: `${D ? CurrentDate + D : CurrentDate + w}`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: {
              // windowWidth:2000,

              width: pdfRef.current.offsetWidth,
              scale: 1.5,
            },
            jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
          };
          console.log(opt, pdfRef.current);
          html2pdf().set(opt).from(pdfRef.current).save();

          swalWithBootstrapButtons.fire({
            title: "Download!",
            text: "Your file has been Download.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancle",
            text: "The file was not downloaded ",
            icon: "error",
          });
        }
      });

    // const input = pdfRef.current;
    // html2canvas(input).then((canvas) => {
    //   const imgData = canvas.toDataURL("image/png");
    // const pdf = new jsPDF("landscape", "px", "a4", true, true);
    // const pdfWidth = pdf.internal.pageSize.getWidth();
    //   const pdfHeight = pdf.internal.pageSize.getHeight();
    //   const imageWidth = canvas.width;
    //   const imageHeight = canvas.height;
    //   const ratio = Math.min(pdfWidth / imageWidth, pdfHeight / imageHeight);
    //   const imgX = (pdfWidth - imageWidth * ratio) / 2;
    //   const imgY = 0;
    //   console.log(imageWidth, imageHeight);
    //   pdf.addImage(
    //     imgData,
    //     "PNG",
    //     imgX,
    //     imgY,
    //     imageWidth * ratio,
    //     imageHeight * ratio
    //   );
    //   console.log(saveDone);
    //   D !== null && pdf.save(`${CurrentDate + " " + D}`);
    //   w !== null && pdf.save(`${CurrentDate + " " + w}`);
    //   console.log(saveDone);
    // });
  };
  return (
    <>
      {DoctorList.length > 0 ? (
        <Template>
          <div className="  maxContent bg-slate-500 pt-2 p-1  ">
            <div className=" p-3 w-full  maxContent " ref={pdfRef}>
              <div className="flex justify-between items-center ">
                <div className=" flex items-center">
                  <label htmlFor="" className=" font-medium text-4xl block  ">
                    MR Name -
                  </label>
                  <span className="block text-4xl  text-black 	">
                    {localStorage.getItem("MrName") == null
                      ? "Your Name"
                      : localStorage.getItem("MrName")}
                  </span>
                </div>
                <div className=" flex items-center">
                  <label htmlFor="" className=" font-medium text-4xl block  ">
                    Date -
                  </label>
                  <span className="block text-4xl  text-black 	">
                    {CurrentDate}
                  </span>
                </div>
                <div className=" flex items-center">
                  <label htmlFor="" className=" font-medium text-4xl block  ">
                    Township -
                  </label>
                  <span className="block text-4xl  text-black 	">
                    {Township}
                  </span>
                </div>
              </div>
              <table className=" text-3xl mx-auto mb-10 mt-4 table-auto text-center  w-full border-collapse border border-slate-900 ">
                <thead>
                  <tr className="border border-slate-900 p-2 ">
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
                        <td className="border p-3 border-slate-900 text-center">
                          {" "}
                          {index + 1}.{" "}
                        </td>
                        <td className="border p-3 border-slate-900 text-center">
                          {" "}
                          {list.DoctorName}{" "}
                        </td>
                        <td className="border p-3 border-slate-900">
                          {list.CallPurpose}
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
                onClick={downloadPDF.bind(null, "  DailyReport", null)}
              >
                Download PDF For Daily
              </button>
              <button
                className="bg-indigo-500 p-2 rounded-md border-gray-900 border-2 mx-auto mt-2 text-start block"
                onClick={downloadPDF.bind(null, null, "  WeeklyReport")}
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
