import React, { useRef, useState } from "react";
import { TbPlayerTrackNext } from "react-icons/tb";
import { NavLink } from "react-router-dom";

const ProductCalculator = ({
  Lists,
  TotalSales,
  setTotalSales,
  AddQuantityFuction,
  QuantityList,
  changeName,
}) => {
  const [noProductSpan, setnoProductSpan] = useState(false);
  console.log(QuantityList);

  const [nextButton, setnextButton] = useState(false);
  // console.log(TotalsalesLGet);
  const Todaysales = Lists.reduce((pv, cv) => pv + cv.amount, 0);
  const changeTotalSales = useRef();
  const ChangeTotalSalesFunction = () => {
    if (changeTotalSales.current.value == "") {
      alert("Please fail total amount!");
    } else {
      localStorage.setItem(
        "TotalSales",
        JSON.stringify({
          TotalSale: changeTotalSales.current.value,
          Todaysales,
        })
      );
      const TotalAmount = JSON.parse(
        localStorage.getItem("TotalSales")
      ).TotalSale;
      // console.log(TotalAmount);
      setTotalSales(parseInt(TotalAmount));
    }
  };

  return (
    <div className=" mt-2">
      <h1 className=" font-bold text-2xl  underline p-2  mb-2  ">
        Sale calculator
      </h1>
      <button
        onClick={() => {
          AddQuantityFuction(setnoProductSpan, "SalePlus");

          // setnoProductSpan(true);
          setnextButton(true);
          // console.log(nextButton);
        }}
        className="  bg-orange-600  text-xl font-medium text-black p-2 rounded  mt-2 mb-2	"
      >
        {changeName ? "Show Calculate" : "Add Sale and Quantity"}
      </button>

      {QuantityList.length > 0 && (
        <div>
          <label className=" border-red-950 border block p-2 m-2   ">
            <h1 className=" font-bold text-2xl bg-slate-400 underline p-2 rounded mb-2  ">
              You can change Total Sale
            </h1>
            <div className=" flex justify-between items-center gap-3">
              <input
                type="number"
                ref={changeTotalSales}
                placeholder="Change TotalSale Amount"
              />
              <button
                onClick={ChangeTotalSalesFunction}
                className="  bg-orange-600  text-md font-medium text-black p-2 rounded  	"
              >
                ChangeTotalSale
              </button>
            </div>
            <button
              onClick={() => {
                AddQuantityFuction(setnoProductSpan, "minus");

                // setnoProductSpan(true);
                setnextButton(true);
                // console.log(nextButton);
              }}
              className="   bg-orange-600  text-md font-medium text-black p-2 rounded  mt-2 mb-2	"
            >
              Minus Sale and Quantity
            </button>
          </label>
          <div className=" m-2 border border-red-950 flex flex-col items-center justify-center p-2 gap-2">
            <h1 className=" font-bold text-4xl bg-slate-400 underline p-2 rounded mt-2  ">
              Sale
            </h1>
            <label className=" flex ">
              <span className="  text-xl font-medium text-black	">
                Today Sale -
              </span>
              <p className="  text-lg  border-b-2 border-black  ps-2 mb-2 mb-2">
                {JSON.parse(localStorage.getItem("TotalSales")).Todaysales}
              </p>
            </label>
            <label className=" flex ">
              <span className="  text-xl font-medium text-black	">
                Total Sale -
              </span>
              <p className="  text-lg  border-b-2 border-black  ps-2 mb-2 mb-2">
                {TotalSales}
              </p>
            </label>

            <label className=" flex  ">
              <span className="  text-xl font-medium text-black	">
                Previous Sale -
              </span>
              <p className="  text-lg  border-b-2 border-black  ps-2 mb-2 mb-2">
                {TotalSales -
                  JSON.parse(localStorage.getItem("TotalSales")).Todaysales}
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
      )}

      {/* quantity */}

      {QuantityList?.map((list, index) => {
        // console.log(list.quantity);
        return (
          list.quantity > 0 && (
            <label
              key={index}
              className=" flex  justify-center  mb-5 mt-4  font-bold  text-xl border border-red-900 p-2 m-1 "
            >
              <span className="   font-medium text-black	">{list.name} - </span>
              <p className="   border-b-2 border-black  ps-2 mb-2 ">
                {list.quantity}
              </p>
            </label>
          )
        );
      })}

      {noProductSpan ? (
        <h1 className=" font-bold text-lg border border-red-900 p-2 m-1">
          There are not product!
        </h1>
      ) : (
        <></>
      )}
      {nextButton ? (
        <NavLink to="/doctorListForm">
          <button className=" bg-indigo-500 p-2 rounded-md border-gray-900 border-2  ms-auto w-1/2 font-bold  flex items-center justify-evenly mt-2 ">
            Next Step <TbPlayerTrackNext />
          </button>
        </NavLink>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProductCalculator;
