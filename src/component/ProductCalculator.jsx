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
  const [nextButton, setnextButton] = useState(false);
  const changeTotalSales = useRef();

  const Todaysales = Lists.reduce((pv, cv) => pv + cv.amount, 0);

  const ChangeTotalSalesFunction = () => {
    const value = changeTotalSales.current.value;
    if (value === "") return alert("Please fill total amount!");

    localStorage.setItem(
      "TotalSales",
      JSON.stringify({
        TotalSale: value,
        Todaysales: value == 0 ? 0 : Todaysales,
      })
    );
    const TotalAmount = JSON.parse(
      localStorage.getItem("TotalSales")
    ).TotalSale;
    setTotalSales(parseInt(TotalAmount));
  };

  const handleCopyAll = () => {
    const now = new Date();
    const formattedDate = `${now.getDate()}.${
      now.getMonth() + 1
    }.${now.getFullYear()} (${now.toLocaleDateString("en-US", {
      weekday: "long",
    })})`;

    const productDetails = QuantityList.filter((item) => item.quantity > 0)
      .map((item) => `${item.name}-${item.quantity}`)
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

    navigator.clipboard.writeText(
      `${formattedDate}\n\n${productDetails}\n${salesDetails}`
    );
    alert("Copied all information!");
  };

  return (
    <div className="mt-4 p-4 bg-black text-yellow-300 ">
      <h1 className="font-bold text-2xl underline mb-4 text-center">
        Sale Calculator
      </h1>

      <button
        onClick={() => {
          AddQuantityFuction(setnoProductSpan, "SalePlus");
          setnextButton(true);
        }}
        className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded w-full mb-4 hover:bg-yellow-500"
      >
        {changeName ? "Show Calculate" : "Add Sale and Quantity"}
      </button>

      {QuantityList.length > 0 && (
        <div>
          <div className="bg-zinc-900 border border-yellow-400 p-4 rounded mb-4">
            <h2 className="text-lg font-bold mb-3">
              You can change Total Sale
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="number"
                ref={changeTotalSales}
                placeholder="Change TotalSale Amount"
                className="p-2 rounded bg-zinc-800 text-white border border-yellow-300 w-full sm:w-auto"
              />
              <button
                onClick={ChangeTotalSalesFunction}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded"
              >
                Change Total Sale
              </button>
            </div>
            <button
              onClick={() => {
                AddQuantityFuction(setnoProductSpan, "minus");
                setnextButton(true);
              }}
              className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded w-full"
            >
              Minus Sale and Quantity
            </button>
          </div>

          <div className="bg-zinc-900 border border-yellow-400 p-4 rounded mb-4">
            <h2 className="text-xl font-bold text-center underline mb-4">
              Sales Summary
            </h2>
            {[
              {
                label: "Today Sale",
                value:
                  JSON.parse(localStorage.getItem("TotalSales"))?.Todaysales ||
                  0,
              },
              { label: "Total Sale", value: TotalSales },
              {
                label: "Previous Sale",
                value:
                  TotalSales -
                  (JSON.parse(localStorage.getItem("TotalSales"))?.Todaysales ||
                    0),
              },
              { label: "Target", value: localStorage.getItem("Target") },
              {
                label: "Achievement",
                value: `${(
                  (TotalSales / parseInt(localStorage.getItem("Target"))) *
                  100
                ).toFixed(2)}%`,
              },
            ].map(({ label, value }, i) => (
              <div key={i} className="flex justify-between mb-2">
                <span className="font-medium">{label}</span>
                <span className="text-white">{value.toLocaleString()}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleCopyAll}
            className="w-full mb-6 p-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Copy All
          </button>

          <table className="w-full text-sm border border-yellow-500 text-white">
            <thead className="bg-zinc-900">
              <tr>
                <th className="border border-yellow-500 p-2 text-left">#</th>
                <th className="border border-yellow-500 p-2 text-left">
                  Product
                </th>
                <th className="border border-yellow-500 p-2 text-left">
                  Quantity
                </th>
                <th className="border border-yellow-500 p-2 text-left">
                  Price
                </th>
                <th className="border border-yellow-500 p-2 text-left">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {QuantityList?.map((list, index) => {
                const total = list.quantity * list.price;
                return (
                  list.quantity > 0 && (
                    <tr key={index} className="bg-zinc-800">
                      <td className="border border-yellow-500 p-2">
                        {index + 1}
                      </td>
                      <td className="border border-yellow-500 p-2 font-semibold">
                        {list.name}
                      </td>
                      <td className="border border-yellow-500 p-2">
                        {list.quantity}
                      </td>
                      <td className="border border-yellow-500 p-2">
                        {list.price.toLocaleString()}
                      </td>
                      <td className="border border-yellow-500 p-2 font-semibold">
                        {total.toLocaleString()}
                      </td>
                    </tr>
                  )
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {noProductSpan && (
        <p className="text-red-500 border border-red-500 rounded p-2 text-center mt-4">
          There are no products!
        </p>
      )}

      {nextButton && (
        <NavLink to="/doctorListForm">
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-6 py-3 rounded mt-4 w-full sm:w-1/2 mx-auto flex justify-center items-center gap-2">
            Next Step <TbPlayerTrackNext />
          </button>
        </NavLink>
      )}
    </div>
  );
};

export default ProductCalculator;
