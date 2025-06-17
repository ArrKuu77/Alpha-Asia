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
  console.log(QuantityList);

  const [noProductSpan, setnoProductSpan] = useState(false);
  const [nextButton, setnextButton] = useState(false);

  const Todaysales = Lists.reduce((pv, cv) => pv + cv.amount, 0);
  const changeTotalSales = useRef();

  const ChangeTotalSalesFunction = () => {
    if (changeTotalSales.current.value === "") {
      alert("Please fill total amount!");
    } else {
      if (changeTotalSales.current.value == 0) {
        localStorage.setItem(
          "TotalSales",
          JSON.stringify({
            TotalSale: changeTotalSales.current.value,
            Todaysales: 0,
          })
        );
        const TotalAmount = JSON.parse(
          localStorage.getItem("TotalSales")
        ).TotalSale;
        setTotalSales(parseInt(TotalAmount));
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
        setTotalSales(parseInt(TotalAmount));
      }
    }
  };

  const handleCopyAll = () => {
    const now = new Date();

    const formattedDate = `${now.getDate()}.${
      now.getMonth() + 1
    }.${now.getFullYear()} (${now.toLocaleDateString("en-US", {
      weekday: "long",
    })})`;

    const productDetails = QuantityList.filter((item) => item.quantity > 0)
      .map((item) => {
        const total = item.quantity * item.price;
        return `${item.name}-${item.quantity}`;
      })
      .join("\n");

    const salesDetails = `
      Today Sale: ${
        JSON.parse(
          localStorage.getItem("TotalSales")
        )?.Todaysales?.toLocaleString() || 0
      } 
      Total Sale: ${TotalSales.toLocaleString()} 
      Previous Sale: ${(
        TotalSales -
        (JSON.parse(localStorage.getItem("TotalSales"))?.Todaysales || 0)
      ).toLocaleString()} 
      Target: ${localStorage.getItem("Target")} 
      Achievement: ${(
        (TotalSales / parseInt(localStorage.getItem("Target"))) *
        100
      ).toFixed(2)}%
    `;

    const allText = `${formattedDate}\n \n${productDetails}\n${salesDetails}`;

    navigator.clipboard.writeText(allText);
    alert("Copied all information!");
  };

  return (
    <div className="mt-2">
      <h1 className="font-bold text-2xl underline p-2 mb-2">Sale Calculator</h1>
      <button
        onClick={() => {
          AddQuantityFuction(setnoProductSpan, "SalePlus");
          setnextButton(true);
        }}
        className="bg-orange-600 text-xl font-medium text-black p-2 rounded mt-2 mb-2"
      >
        {changeName ? "Show Calculate" : "Add Sale and Quantity"}
      </button>

      {QuantityList.length > 0 && (
        <div>
          <label className="border-red-950 border block p-2 m-2">
            <h1 className="font-bold text-2xl bg-slate-400 underline p-2 rounded mb-2">
              You can change Total Sale
            </h1>
            <div className="flex justify-between items-center gap-3">
              <input
                type="number"
                ref={changeTotalSales}
                placeholder="Change TotalSale Amount"
              />
              <button
                onClick={ChangeTotalSalesFunction}
                className="bg-orange-600 text-md font-medium text-black p-2 rounded"
              >
                Change Total Sale
              </button>
            </div>
            <button
              onClick={() => {
                AddQuantityFuction(setnoProductSpan, "minus");
                setnextButton(true);
              }}
              className="bg-orange-600 text-md font-medium text-black p-2 rounded mt-2 mb-2"
            >
              Minus Sale and Quantity
            </button>
          </label>
          <div className="m-2 border border-red-950 flex flex-col items-center justify-center p-2 gap-2">
            <h1 className="font-bold text-4xl bg-slate-400 underline p-2 rounded mt-2">
              Sale
            </h1>
            <label className="flex">
              <span className="text-xl font-medium text-black">
                Today Sale -
              </span>
              <p className="text-lg border-b-2 border-black ps-2 mb-2">
                {(
                  JSON.parse(localStorage.getItem("TotalSales"))?.Todaysales ||
                  0
                ).toLocaleString()}
              </p>
            </label>
            <label className="flex">
              <span className="text-xl font-medium text-black">
                Total Sale -
              </span>
              <p className="text-lg border-b-2 border-black ps-2 mb-2">
                {TotalSales.toLocaleString()}
              </p>
            </label>
            <label className="flex">
              <span className="text-xl font-medium text-black">
                Previous Sale -
              </span>
              <p className="text-lg border-b-2 border-black ps-2 mb-2">
                {(
                  TotalSales -
                  (JSON.parse(localStorage.getItem("TotalSales"))?.Todaysales ||
                    0)
                ).toLocaleString()}
              </p>
            </label>
            <label className="flex">
              <span className="text-xl font-medium text-black">Target -</span>
              <p className="text-lg border-b-2 border-black ps-2 mb-2">
                {localStorage.getItem("Target")}
              </p>
            </label>
            <label className="flex">
              <span className="text-xl font-medium text-black">
                Achievement -
              </span>
              <p className="text-lg border-b-2 border-black ps-2 mb-2">
                {(
                  (TotalSales / parseInt(localStorage.getItem("Target"))) *
                  100
                ).toFixed(2)}
                %
              </p>
            </label>
          </div>
        </div>
      )}

      {/* Copy All Button */}

      {QuantityList.length > 0 && (
        <button
          onClick={handleCopyAll}
          className="w-full mb-4 p-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Copy All
        </button>
      )}
      {/* Product List */}
      {QuantityList?.map((list, index) => {
        const total = list.quantity * list.price;
        return (
          list.quantity > 0 && (
            <label
              key={index}
              className="flex justify-center items-center gap-5 shadow border border-red-900 p-3 m-2 rounded-xl"
            >
              <span className="font-medium text-black text-lg">
                {list.name}
              </span>
              <p className="text-sm font-semibold">Qty: {list.quantity}</p>
              <p className="text-sm">Price: {list?.price?.toLocaleString()}</p>
              <p className="text-sm font-semibold">
                Total: {total.toLocaleString()}
              </p>
            </label>
          )
        );
      })}

      {noProductSpan && (
        <h1 className="font-bold text-lg border border-red-900 p-2 m-1">
          There are no products!
        </h1>
      )}

      {nextButton && (
        <NavLink to="/doctorListForm">
          <button className="bg-indigo-500 p-2 rounded-md border-gray-900 border-2 ms-auto w-1/2 font-bold flex items-center justify-evenly mt-2">
            Next Step <TbPlayerTrackNext />
          </button>
        </NavLink>
      )}
    </div>
  );
};

export default ProductCalculator;
