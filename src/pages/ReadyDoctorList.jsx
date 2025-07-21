import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import Swal from "sweetalert2";
import Template from "../component/Template";
import { VscLoading } from "react-icons/vsc";
import { addReport } from "../supabase";

const ReadyDoctorList = ({
  DoctorList,
  DeleteDoctorList,
  DoctorNameDate,
  EditDoctorList,
  CurrentDate,
  Township,
}) => {
  const pdfRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const dailySaleLS = JSON.parse(
    localStorage.getItem("TotalSales") || '{"TotalSale":0,"Todaysales":0}'
  );
  const dailyProductQtyLS = JSON.parse(
    localStorage.getItem("QuantityList") || "[]"
  );

  const [DoctorCallList, setDoctorCallList] = useState(
    JSON.parse(localStorage.getItem("DoctorCallList") || "[]")
  );
  const [doctorArray, setDoctorArray] = useState(
    DoctorCallList.map((d) => d.DoctorName.toLowerCase())
  );

  const downloadPDF = (D, w) => {
    Swal.fire({
      title: "Are you sure to download the PDF file?",
      text: "You won't be able to revert this!",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes, Download it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (!result.isConfirmed) return;

      if (D) {
        const newDoctorList = DoctorList.map((d) => ({
          DoctorName: d.DoctorName,
          DoctorFrequency: 1,
          DoctorState: "Empty",
        }));

        DoctorCallList.forEach((existing) => {
          newDoctorList.forEach((entry) => {
            if (
              existing.DoctorName.toLowerCase() ===
              entry.DoctorName.toLowerCase()
            ) {
              existing.DoctorFrequency += 1;
            }
          });
        });

        const filteredNewDoctors = newDoctorList.filter(
          (nd) => !doctorArray.includes(nd.DoctorName.toLowerCase())
        );

        const updatedDoctorCallList = [
          ...filteredNewDoctors,
          ...DoctorCallList,
        ];
        setDoctorCallList(updatedDoctorCallList);
        setDoctorArray([
          ...doctorArray,
          ...filteredNewDoctors.map((d) => d.DoctorName.toLowerCase()),
        ]);

        localStorage.setItem(
          "DoctorCallList",
          JSON.stringify(updatedDoctorCallList)
        );
      }

      const opt = {
        margin: 0.2,
        filename: `${D ? CurrentDate + D : CurrentDate + w}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "pt", format: "a4", orientation: "landscape" },
        pagebreak: { mode: ["css", "legacy"] },
      };

      html2pdf().set(opt).from(pdfRef.current).save();

      Swal.fire("Download!", "Your file has been downloaded.", "success");
    });
  };

  const UploadDoctorList = () => {
    const MrId = JSON.parse(localStorage.getItem("MrName") || "{}")?.mrId;
    if (!Township || !MrId) {
      Swal.fire("Error", "Please check your Township or MR Name", "error");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You want to upload data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, upload it!",
    }).then(async (result) => {
      if (!result.isConfirmed) return;
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
        const newDoctors = DoctorList.map((d) => ({
          DoctorName: d.DoctorName,
          DoctorFrequency: 1,
          DoctorState: "Empty",
        }));

        DoctorCallList.forEach((existing) => {
          newDoctors.forEach((nd) => {
            if (
              existing.DoctorName.toLowerCase() === nd.DoctorName.toLowerCase()
            ) {
              existing.DoctorFrequency += 1;
            }
          });
        });

        const filtered = newDoctors.filter(
          (nd) => !doctorArray.includes(nd.DoctorName.toLowerCase())
        );

        const updatedDoctorList = [...filtered, ...DoctorCallList];
        setDoctorCallList(updatedDoctorList);
        setDoctorArray([
          ...doctorArray,
          ...filtered.map((d) => d.DoctorName.toLowerCase()),
        ]);

        localStorage.setItem(
          "DoctorCallList",
          JSON.stringify(updatedDoctorList)
        );

        Swal.fire("Success", "Upload is successful", "success");
        navigate("/");
      } else {
        Swal.fire("Error", error.message || error, "error");
      }

      setLoading(false);
    });
  };

  if (DoctorList.length === 0) {
    return (
      <div className="border border-gray-700 m-4 p-6 text-center text-white bg-gray-800 rounded">
        <h1>There are no Lists!</h1>
      </div>
    );
  }

  return (
    <Template>
      <div className="maxContent bg-gray-900 p-4 min-h-screen text-white">
        <div className="p-3 w-full" ref={pdfRef}>
          <div className="overflow-x-auto mt-6">
            <div className="flex flex-wrap gap-4 justify-between items-center min-w-[700px] my-2">
              <div className="flex gap-2 items-center">
                <span className="font-semibold text-lg">MR Name -</span>
                <span className="text-lg text-yellow-400">
                  {localStorage.getItem("MrName") ?? "Your Name"}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="font-semibold text-lg">Date -</span>
                <span className="text-lg text-yellow-400">{CurrentDate}</span>
              </div>
            </div>

            <table className="w-full min-w-[700px] table-auto border-collapse border border-gray-700 text-center">
              <thead className="bg-sky-500">
                <tr>
                  <th className="border p-2">No</th>
                  <th className="border p-2">Customer Name</th>
                  <th className="border p-2">Place</th>
                  <th className="border p-2">Speciality</th>
                  <th className="border p-2">Focus Products</th>
                  <th className="border p-2">Customer's Feedback</th>
                </tr>
              </thead>
              <tbody>
                {DoctorList.map((d, i) => (
                  <tr key={i} className="border  ">
                    <td className="border p-3">{i + 1}</td>
                    <td className="border p-3">{d.DoctorName}</td>
                    <td className="border p-3">{d.Hospital}</td>
                    <td className="border p-3">{d.Objective}</td>
                    <td className="border p-3 text-yellow-300">
                      {d.ShortName?.length ? d.ShortName.join(", ") : "-"}
                    </td>
                    <td className="border p-3">{d.CustomerFeedback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-6 max-w-sm mx-auto">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-md text-white"
            onClick={() => downloadPDF("DailyReport", null)}
          >
            Download PDF For Daily
          </button>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-md text-white"
            onClick={() => downloadPDF(null, "WeeklyReport")}
          >
            Download PDF For Weekly
          </button>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-md text-white disabled:opacity-50"
            onClick={UploadDoctorList}
            disabled
          >
            {loading ? (
              <span className="flex items-center gap-2">
                Loading <VscLoading className="animate-spin" />
              </span>
            ) : (
              "Upload Doctor List is coming soon"
            )}
          </button>
        </div>
      </div>
    </Template>
  );
};

export default ReadyDoctorList;
