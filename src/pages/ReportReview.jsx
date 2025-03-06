"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { DeleteReportReviewFun, repoetData, supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import { MdEditDocument } from "react-icons/md";
import { MdFolderDelete } from "react-icons/md";
import Swal from "sweetalert2";

function ReportReview() {
  const nav = useNavigate();
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentDate = useRef(null);
  console.log(report);
  console.log(currentDate?.current?.value);

  // Fetch employees for the dropdown

  // Memoized fetch function

  // Fetch reports when dependencies change
  //   useEffect(() => {
  //     fetchReports();
  //   }, [fetchReports]);

  //   if (error) {
  //     return (
  //       <div className="flex items-center justify-center h-64 bg-red-50 dark:bg-red-900/10 rounded-lg">
  //         <div className="text-center">
  //           {/* <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-2" /> */}
  //           <p className="text-red-600 dark:text-red-400">Error: {error}</p>
  //         </div>
  //       </div>
  //     );
  //   }
  const [employee, setEmployee] = useState(
    localStorage.getItem("MrName") == null
      ? ""
      : JSON.parse(localStorage.getItem("MrName"))
  );
  const serchData = async () => {
    setLoading(true);
    console.log(currentDate.current.value);
    const { reports_table } = await repoetData(
      currentDate.current.value,
      employee.mrId
    );

    setReport(reports_table);
    setLoading(false);
  };
  const DeleteReportReview = async () => {
    const { data, error } = await DeleteReportReviewFun(report.id);
    if (error) {
      alert("Error deleting report:", error);
    } else {
      Swal.fire({
        title: "Report deleted successfully",
        icon: "success",
        draggable: true,
      });
      nav("/");
    }
  };
  const EditReportReview = () => {
    localStorage.setItem("reviewEdit", JSON.stringify(report));
    nav(`/report-review/edit/${report.id}`);
  };

  return (
    <div className="bg-background dark:bg-gray-800 rounded-lg shadow-sm">
      {/* Filters */}
      <div className=" flex justify-end w-[90%] pt-5 items-center">
        <button
          onClick={() => nav("/")}
          className=" py-2 px-3 rounded-lg  bg-slate-900 text-white"
        >
          Back
        </button>
      </div>
      <div className="p-4 border-b border-border dark:border-gray-700">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <div className=" flex flex-col text-lg font-bold justify-center items-center gap-2 max-w-xs">
            <label htmlFor="" className=" ">
              Name
            </label>
            <span>{employee.mrName}</span>
          </div>

          {/* Date Range Picker */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              {/* <Calendar className="h-5 w-5 text-muted-foreground" /> */}
            </div>
            <div className="col  col-md-3">
              <label htmlFor="" className=" text-2xl block  ">
                Date
              </label>
              <input
                ref={currentDate}
                type="date"
                required
                className=" border-solid border-2  border-red-800	text-black	"
              />
            </div>
          </div>
          <div>
            <button
              disabled={loading}
              onClick={() => serchData()}
              className=" py-1 px-2 bg-slate-950 border border-white text-white"
            >
              {loading ? "Loading..." : "Search"}
            </button>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <label className="font-medium text-2xl block text-white mb-3">
        Report Details
      </label>
      {loading ? (
        <div className="flex flex-col justify-center items-center h-32">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-gray-300 rounded-full"></div>
            <div className="absolute inset-0 border-t-4 border-gray-900 rounded-full animate-spin"></div>
          </div>
          <p className="mt-3 text-gray-100 font-medium text-lg animate-pulse">
            Loading, please wait...
          </p>
        </div>
      ) : (
        <>
          {report?.length < 1 ? (
            <div className="text-center text-white text-md p-2 bg-red-500 w-1/2 rounded-md inline-block my-5 font-semibold">
              Please select date!
            </div>
          ) : (
            <>
              {report == undefined ? (
                <div className="text-center text-white text-md p-2 bg-red-500 w-1/2 rounded-md inline-block my-5 font-semibold">
                  No Data Found!
                </div>
              ) : (
                <div>
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
                          </tr>
                        </thead>
                        <tbody>
                          {/* Render the report data */}
                          {report?.report_detail?.map((report) => (
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
                                  : report.ShortName.map((name) => name + ",")}
                              </td>
                              <td className="px-4 py-2">
                                {report.CustomerFeedback || "-"}
                              </td>
                              <td className="px-4 py-2">
                                {report.NextPlan || "-"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-evenly mx-auto w-full p-4 space-y-4">
                    {/* Sale Information */}
                    {report?.daily_sale ? (
                      <div className="w-full md:w-5/12 bg-white p-4 rounded-lg shadow-md border border-gray-300">
                        <h3 className="text-xl font-medium text-center mb-4">
                          Sales Information
                        </h3>

                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-medium text-gray-700">
                              Today Sale:
                            </span>
                            <p className="text-lg text-gray-900">
                              {report?.daily_sale?.Todaysales}
                            </p>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-medium text-gray-700">
                              Previous Sale:
                            </span>
                            <p className="text-lg text-gray-900">
                              {report?.daily_sale?.TotalSale -
                                report?.daily_sale?.Todaysales}
                            </p>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-medium text-gray-700">
                              Total Sale:
                            </span>
                            <p className="text-lg text-gray-900">
                              {report?.daily_sale?.TotalSale}
                            </p>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-medium text-gray-700">
                              Target Sale:
                            </span>
                            <p className="text-lg text-gray-900">
                              {report?.daily_sale?.Target}
                            </p>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-medium text-gray-700">
                              Achievement:
                            </span>
                            <p className="text-lg text-gray-900">
                              {report?.daily_sale?.Achievement} %
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {/* Product Quantity Information */}
                    <div className="w-full md:w-5/12 bg-white p-4 rounded-lg shadow-md border border-gray-300">
                      <h3 className="text-xl font-medium text-center mb-4">
                        Product Quantities
                      </h3>
                      <div>
                        {report?.daily_productQty?.length > 0 ? (
                          report.daily_productQty.map((list, index) => {
                            return (
                              list.quantity > 0 && (
                                <div
                                  key={index}
                                  className="flex justify-between items-center mb-3"
                                >
                                  <span className="text-lg font-medium text-gray-700">
                                    Total {list.name}:
                                  </span>
                                  <p className="text-lg text-gray-900">
                                    {list.quantity}
                                  </p>
                                </div>
                              )
                            );
                          })
                        ) : (
                          <p className="text-center text-gray-500">
                            No products found
                          </p>
                        )}
                      </div>
                    </div>
                    <div className=" flex justify-end gap-5 w-[95%] items-center">
                      <button
                        onClick={() => EditReportReview()}
                        className=" flex justify-between items-center gap-3 text-md text-white px-4 rounded-md py-2  border-white bg-blue-400"
                      >
                        <span>Edit</span>
                        <MdEditDocument className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => DeleteReportReview()}
                        className=" flex justify-end items-center gap-3 text-md text-white px-4 rounded-md py-2  border-white bg-red-400"
                      >
                        <span>Delete</span>
                        <MdFolderDelete className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ReportReview;
