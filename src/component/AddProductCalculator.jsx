import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { TbPlayerTrackNext } from "react-icons/tb";
const AddProductCalculator = ({
  // noProductSpan,
  AddQuantityFuction,
  QuantityList,
  changeName,
}) => {
  const [noProductSpan, setnoProductSpan] = useState(false);

  const [nextButton, setnextButton] = useState(false);
  return (
    <div className="  p-4">
      <button
        onClick={() => {
          AddQuantityFuction(setnoProductSpan);
          // setnoProductSpan(true);
          setnextButton(true);
          // console.log(nextButton);
        }}
        className="  bg-orange-600  text-xl font-medium text-black p-2 rounded  mt-2 mb-2	"
      >
        {changeName ? "Show Quantity" : "Add Quantity"} -
      </button>
      <h1 className=" font-bold text-2xl  underline p-2  mb-2  ">
        Product Quantity
      </h1>
      {QuantityList.map((list, index) => {
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

export default AddProductCalculator;
