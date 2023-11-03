import React from "react";
import { TiDelete } from "react-icons/ti";
import SalesCalculator from "./SalesCalculator";
import AddProductCalculator from "./AddProductCalculator";

const ProductList = ({
  // noProductSpan,
  TotalSales,
  setTotalSales,
  QuantityList,
  AddQuantityFuction,
  Lists,
  ItemListShowFunction,
  DeleteItem,
  changeName,
}) => {
  return (
    <>
      {Lists.length > 0 ? (
        <div>
          <table className=" mt-4 table-auto text-end  w-full border-collapse border border-slate-900 ">
            <thead>
              <tr className="border border-slate-900">
                <th className="border border-slate-900">No</th>
                <th className="border border-slate-900">ProductName</th>
                <th className="border border-slate-900">Price</th>
                <th className="border border-slate-900">Quantity</th>
                <th className="border border-slate-900">Amount</th>

                {/* <th className=" text-center">Edit</th> */}
              </tr>
            </thead>
            <tbody>
              {Lists.map((list, index) => {
                return (
                  <tr key={list.id} className="border border-slate-900">
                    <td className="border border-slate-900 flex justify-between align-items-center">
                      <TiDelete
                        onClick={DeleteItem.bind(null, list.id)}
                        className="  text-2xl  text-red-600"
                      />{" "}
                      {index + 1}.{" "}
                    </td>
                    <td className="border border-slate-900 text-center">
                      {" "}
                      {list.item.name}{" "}
                    </td>
                    <td className="border border-slate-900">
                      {list.item.price}
                    </td>
                    <td className="border border-slate-900">{list.quantity}</td>
                    <td className="border border-slate-900">{list.amount}</td>

                    {/* <td className=" text-center ">
                    <i
                      onClick={ItemListShowFunction.bind(null, list)}
                      className="bi bi-pencil fw-bold text-white me-2   pointer-event bg-primary p-1 border border-2 rounded"
                    ></i>
                    <i
                      onClick={DeleteItem.bind(null, list.id)}
                      className="bi bi-trash fw-bold text-white   pointer-event bg-danger p-1 border border-2 rounded"
                    ></i>
                  </td> */}
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td className="" colSpan={4}>
                  Total
                </td>
                <td>{Lists.reduce((pv, cv) => pv + cv.amount, 0)}</td>
              </tr>
            </tfoot>
          </table>
          <SalesCalculator
            Lists={Lists}
            TotalSales={TotalSales}
            setTotalSales={setTotalSales}
          />
          <AddProductCalculator
            Lists={Lists}
            // noProductSpan={noProductSpan}
            changeName={changeName}
            AddQuantityFuction={AddQuantityFuction}
            QuantityList={QuantityList}
          />
        </div>
      ) : (
        <div className=" border border-spacing-10 m-4">
          <h1 className=" ">There are no items ! </h1>
        </div>
      )}
    </>
  );
};

export default ProductList;
