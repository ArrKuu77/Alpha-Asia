import React from "react";
import { useState } from "react";

const SalesForm = () => {
  const [QuantityList, setQuantityList] = useState(
    localStorage.getItem("QuantityList") == null
      ? false
      : JSON.parse(localStorage.getItem("QuantityList"))
  );
  const todaySale =
    JSON.parse(localStorage.getItem("TotalSales")) == null
      ? 0
      : JSON.parse(localStorage.getItem("TotalSales")).Todaysales;
  console.log(QuantityList);
  console.log(todaySale);

  const TotalsalesLGet = JSON.parse(localStorage.getItem("TotalSales"));
  const [TotalSales, setTotalSales] = useState(
    TotalsalesLGet == null ? 0 : parseInt(TotalsalesLGet.TotalSale)
  );
  const TotaltargetLGet = localStorage.getItem("Target");
  const [TotaltargetSales, setTotaltargetSales] = useState(
    TotaltargetLGet == null ? 0 : parseInt(TotaltargetLGet)
  );

  return (
    <div className="w-full bg-slate-900 text-white p-4 rounded-md">
      <div className="flex flex-row gap-6">
        {/* Left: Sales Summary */}
        <div className="w-full lg:w-1/2 bg-slate-800 p-4 rounded-md space-y-3 shadow">
          {[
            { label: "Today Sale", value: todaySale },
            { label: "Previous Sale", value: TotalSales - todaySale },
            { label: "Total Sale", value: TotalSales },
            { label: "Target Sale", value: TotaltargetSales },
            {
              label: "Achievement",
              value:
                (
                  (TotalSales / parseInt(localStorage.getItem("Target"))) *
                  100
                ).toFixed(2) + " %",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center border-b border-slate-700 pb-1"
            >
              <span className="text-base sm:text-lg font-semibold text-yellow-400">
                {item.label}:
              </span>
              <p className="text-base sm:text-lg font-medium">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Right: Product Quantity */}
        <div className="w-full lg:w-1/2 bg-slate-800 p-4 rounded-md space-y-2 shadow">
          <h2 className="text-lg font-bold text-yellow-400 mb-2">
            Product Quantity Summary
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {QuantityList &&
              QuantityList.map(
                (list, index) =>
                  list.quantity > 0 && (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-slate-700 px-3 py-2 rounded"
                    >
                      <span className="text-sm sm:text-base font-medium">
                        Total {list.name}:
                      </span>
                      <p className="text-sm sm:text-base font-semibold">
                        {list.quantity}
                      </p>
                    </div>
                  )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesForm;
