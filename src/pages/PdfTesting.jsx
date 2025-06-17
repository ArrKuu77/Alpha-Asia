import html2pdf from "html2pdf.js";
import React, { useRef } from "react";
import { useLocation } from "react-router-dom";

const Testpdf = () => {
  const location = useLocation();
  console.log(location);

  const pdfRef = useRef(null);

  const downloadPDF = () => {
    const opt = {
      margin: 0.5,
      filename: `report.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
      },
      jsPDF: { unit: "pt", format: "a4", orientation: "landscape" },
    };

    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
      opt.html2canvas.scale = 1;
    }

    html2pdf().set(opt).from(pdfRef.current).save();
  };

  return (
    <div>
      <div ref={pdfRef}>
        <table className="table-auto w-full border-collapse border border-gray-400 text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Customer</th>
              <th className="border px-2 py-1">Amount</th>
              <th className="border px-2 py-1">Category</th>
              <th className="border px-2 py-1">Payment</th>
              <th className="border px-2 py-1">Uploader</th>
              <th className="border px-2 py-1">Date</th>
              <th className="border px-2 py-1">Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1">Naaa</td>
              <td className="border px-2 py-1 text-right">11</td>
              <td className="border px-2 py-1">dfsa</td>
              <td className="border px-2 py-1">dfas</td>
              <td className="border px-2 py-1">sfds</td>
              <td className="border px-2 py-1">adf</td>
              <td className="border px-2 py-1">adfa</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button
        onClick={downloadPDF}
        className="mt-4 cursor-pointer px-4 py-2 bg-yellow-500 text-black rounded"
      >
        Download PDF
      </button>
    </div>
  );
};

export default Testpdf;
