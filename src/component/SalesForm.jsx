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
    <div className=" flex justify-between mx-auto  w-full ">
      <div className="  w-3/12">
        <label className=" flex  ">
          <span className="  text-xl font-medium text-black	">Today Sale -</span>
          <p className=" text-xlborder-black  ps-2 mb-2 ">{todaySale}</p>
        </label>
        <label className=" flex ">
          <span className=" text-xl font-medium text-black	">
            Previous Sale -
          </span>
          <p className=" text-xl border-black  ps-2 mb-2">
            {TotalSales - todaySale}
          </p>
        </label>
        <label className=" flex ">
          <span className=" text-xl font-medium text-black	">Total Sale -</span>
          <p className=" text-xl border-black  ps-2 mb-2">{TotalSales}</p>
        </label>
        <label className=" flex ">
          <span className=" text-xl font-medium text-black	">Target Sale -</span>
          <p className=" text-xl border-black  ps-2 mb-2">{TotaltargetSales}</p>
        </label>
        <label className=" flex ">
          <span className=" text-xl font-medium text-black	">Achievement -</span>
          <p className=" text-xl border-black  ps-2 mb-2">
            {(
              (TotalSales / parseInt(localStorage.getItem("Target"))) *
              100
            ).toFixed(2)}{" "}
            %
          </p>
        </label>
      </div>
      <div className="  w-3/5 mx-auto flex  flex-wrap justify-between ">
        {QuantityList
          ? QuantityList.map((list, index) => {
              console.log(list.quantity);
              return (
                list.quantity > 0 && (
                  <label key={index} className=" flex w-1/2  ">
                    <span className="  text-xl font-medium text-black	">
                      Total {list.name} -{" "}
                    </span>
                    <p className="  text-lg    border-black  ps-2  mb-2">
                      {list.quantity}
                    </p>
                  </label>
                )
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default SalesForm;
