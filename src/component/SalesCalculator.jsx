import React, { useEffect, useRef, useState } from "react";

const SalesCalculator = ({ Lists }) => {
  // console.log(JSON.parse(localStorage.getItem("TotalSales")));
  const TotalsalesLGet = JSON.parse(localStorage.getItem("TotalSales"));
  console.log(TotalsalesLGet);
  const Todaysales = Lists.reduce((pv, cv) => pv + cv.amount, 0);

  const [TotalSales, setTotalSales] = useState(
    TotalsalesLGet == null ? 0 : parseInt(TotalsalesLGet.TotalSale)
  );
  console.log(TotalSales);

  // useEffect()
  const AddTotalSales = () => {
    console.log(TotalSales);
    localStorage.setItem(
      "TotalSales",
      JSON.stringify({
        TotalSale: TotalSales + Todaysales,
        Todaysales,
      })
    );
    const TotalAmount = JSON.parse(
      localStorage.getItem("TotalSales")
    ).TotalSale;
    console.log(TotalAmount);
    setTotalSales(parseInt(TotalAmount));
  };
  console.log(TotalSales);
  const changeTotalSales = useRef();
  const ChangeTotalSalesFunction = () => {
    if (changeTotalSales.current.value == "") {
      alert("Please fail total amount!");
    } else {
      localStorage.setItem("TotalSales", changeTotalSales.current.value);
      const TotalAmount = localStorage.getItem("TotalSales");
      console.log(TotalAmount);
      setTotalSales(parseInt(TotalAmount));
    }
  };
  return (
    <div className=" mt-2">
      <label className=" border-red-950 border block p-2 m-2   ">
        <h1 className=" font-bold text-2xl bg-slate-400 underline p-2 rounded mb-2  ">
          You can change Total Sale
        </h1>
        <input
          type="number"
          ref={changeTotalSales}
          placeholder="Change TotalSale Amount"
        />
        <button
          onClick={ChangeTotalSalesFunction}
          className="  bg-orange-600  text-xl font-medium text-black p-2 rounded  mt-2	"
        >
          ChangeTotalSale
        </button>
      </label>
      <div className=" m-2 border border-red-950 flex flex-col items-center justify-center p-2 gap-2">
        <h1 className=" font-bold text-4xl bg-slate-400 underline p-2 rounded mt-2  ">
          Sale
        </h1>
        <label className=" flex ">
          <span className="  text-xl font-medium text-black	">Today Sale -</span>
          <p className="  text-lg  border-b-2 border-black  ps-2 mb-2 mb-2">
            {Lists.reduce((pv, cv) => pv + cv.amount, 0)}
          </p>
        </label>

        <label className=" flex  ">
          <button
            onClick={AddTotalSales}
            className="  bg-orange-600  text-xl font-medium text-black p-2 rounded  mt-2	"
          >
            Total Sale -
          </button>
          <p className="  text-lg  border-b-2 border-black  ps-2 mb-2 mb-2">
            {TotalSales}
          </p>
        </label>
        <label className=" flex  ">
          <span className="  text-xl font-medium text-black	">
            Previous Sale -
          </span>
          <p className="  text-lg  border-b-2 border-black  ps-2 mb-2 mb-2">
            {TotalSales - Lists.reduce((pv, cv) => pv + cv.amount, 0)}
          </p>
        </label>
        <label className=" flex  ">
          <span className="  text-xl font-medium text-black	">Target -</span>
          <p className="  text-lg  border-b-2 border-black  ps-2 mb-2 mb-2">
            {localStorage.getItem("Target")}
          </p>
        </label>
        <label className=" flex  ">
          <span className="  text-xl font-medium text-black	">
            Achievement -
          </span>
          <p className="  text-lg  border-b-2 border-black  ps-2 mb-2 mb-2">
            {(
              (TotalSales / parseInt(localStorage.getItem("Target"))) *
              100
            ).toFixed(2)}{" "}
            %
          </p>
        </label>
      </div>
    </div>
  );
};

export default SalesCalculator;
