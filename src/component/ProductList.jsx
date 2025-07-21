import React from "react";
import { TiDelete } from "react-icons/ti";
import ProductCalculator from "./ProductCalculator";

const ProductList = ({
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
          <div className="max-w-full overflow-x-auto p-4 bg-zinc-800 rounded-lg shadow-lg">
            <table className="min-w-[600px] w-full table-auto border-collapse border border-gray-700 text-yellow-300">
              <thead>
                <tr className="bg-zinc-900 border border-gray-700">
                  <th className="border border-gray-700 px-4 py-2 text-left">
                    No
                  </th>
                  <th className="border border-gray-700 px-4 py-2 text-left">
                    Product Name
                  </th>
                  <th className="border border-gray-700 px-4 py-2 text-right">
                    Price
                  </th>
                  <th className="border border-gray-700 px-4 py-2 text-right">
                    Quantity
                  </th>
                  <th className="border border-gray-700 px-4 py-2 text-right">
                    Amount
                  </th>
                  {/* <th className="border border-gray-700 px-4 py-2 text-center">
                  Action
                </th> */}
                </tr>
              </thead>
              <tbody>
                {Lists.map((list, index) => (
                  <tr
                    key={list.id}
                    className="border border-gray-700 hover:bg-gray-800 transition-colors"
                  >
                    <td className="border border-gray-700 px-4 py-2 flex items-center gap-2">
                      <TiDelete
                        onClick={() => DeleteItem(list.id)}
                        className="cursor-pointer text-red-500 hover:text-red-600"
                        title="Delete item"
                        size={20}
                      />
                      <span>{index + 1}.</span>
                    </td>
                    <td className="border border-gray-700 px-4 py-2">
                      {list.item.name}
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-right">
                      {list.item.price.toLocaleString()}
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-right">
                      {list.quantity}
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-right">
                      {list.amount.toLocaleString()}
                    </td>
                    {/* <td className="border border-gray-700 px-4 py-2 text-center"> */}
                    {/* Future Edit button could go here */}
                    {/* </td> */}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-zinc-700 border border-gray-700 font-semibold text-yellow-400">
                  <td
                    colSpan={4}
                    className="border border-gray-700 px-4 py-2 text-right"
                  >
                    Total
                  </td>
                  <td className="border border-gray-700 px-4 py-2 text-right">
                    {Lists.reduce(
                      (pv, cv) => pv + cv.amount,
                      0
                    ).toLocaleString()}
                  </td>
                  {/* <td className="border border-gray-700 px-4 py-2"></td> */}
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="mt-6">
            <ProductCalculator
              Lists={Lists}
              TotalSales={TotalSales}
              setTotalSales={setTotalSales}
              changeName={changeName}
              AddQuantityFuction={AddQuantityFuction}
              QuantityList={QuantityList}
            />
          </div>
        </div>
      ) : (
        <div className="p-6 m-4 bg-gray-800 rounded-md text-yellow-400 text-center font-semibold">
          There are no items!
        </div>
      )}
    </>
  );
};

export default ProductList;
