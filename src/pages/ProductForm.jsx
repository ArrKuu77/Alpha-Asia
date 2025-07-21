import React, { useRef, useState } from "react";
import Template from "../component/Template";
import ProductList from "../component/ProductList";
import { NavLink } from "react-router-dom";
import SalesCalculator from "../component/SalesCalculator";
import { TbPlayerTrackNext } from "react-icons/tb";

const ProductForm = ({
  Product,
  addList,
  Lists,
  TotalSales,
  setTotalSales,
  AddQuantityFuction,
  changeName,
  QuantityList,
  DeleteItem,
  ItemListShowFunction,
}) => {
  const formRef = useRef();

  const storedProducts =
    JSON.parse(localStorage.getItem("CreateProductList")) || [];
  const [currentPrice, setCurrentPrice] = useState(
    storedProducts[0]?.price || 0
  );
  const [saleActive, setSaleActive] = useState(true);
  const [widthJust, setWidthJust] = useState(false);

  const totalSalesStorage = JSON.parse(localStorage.getItem("TotalSales"));
  const [noTotalSale, setNoTotalSales] = useState(
    totalSalesStorage ? parseInt(totalSalesStorage.TotalSale) : 0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const itemName = formData.get("item-name");
    const quantity = parseInt(formData.get("quantity"));

    if (!itemName) {
      alert("No product selected");
      return;
    }
    addList(itemName, quantity);
    formRef.current.reset();
    setWidthJust(true);
  };

  const handlePriceChange = () => {
    const formData = new FormData(formRef.current);
    const selectedProduct = Product.find(
      (p) => p.name === formData.get("item-name")
    );
    if (selectedProduct) {
      setCurrentPrice(selectedProduct.price);
    }
  };

  const handleNoSale = () => {
    setSaleActive(false);
    const todaysSales = 0;
    localStorage.setItem(
      "TotalSales",
      JSON.stringify({
        TotalSale: noTotalSale + todaysSales,
        Todaysales: todaysSales,
      })
    );
    setNoTotalSales(noTotalSale + todaysSales);
  };

  return (
    <Template>
      <div
        className={`min-h-screen px-4 py-6 bg-gray-900 text-yellow-300 transition-colors duration-500 ${
          widthJust ? "w-full" : "w-screen"
        }`}
      >
        <NavLink to="/">
          <button className="mb-4 bg-indigo-700 hover:bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md shadow-md transition">
            Back
          </button>
        </NavLink>

        <div className="flex justify-center space-x-4 mb-6 max-w-md mx-auto">
          <button
            onClick={() => setSaleActive(true)}
            className={`px-6 py-2 rounded-md font-semibold transition ${
              saleActive
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-gray-700 text-yellow-400 hover:bg-indigo-700"
            }`}
          >
            Sale
          </button>
          <button
            onClick={handleNoSale}
            className={`px-6 py-2 rounded-md font-semibold transition ${
              !saleActive
                ? "bg-red-600 text-white shadow-lg"
                : "bg-gray-700 text-yellow-400 hover:bg-red-700"
            }`}
          >
            No Sale
          </button>
        </div>

        {saleActive ? (
          <div className="max-w-4xl mx-auto bg-black rounded-lg shadow-lg p-6">
            {Product.length < 1 ? (
              <h2 className="text-xl font-semibold text-center text-yellow-400">
                No Products Available
              </h2>
            ) : (
              <form
                ref={formRef}
                id="create"
                onSubmit={handleSubmit}
                className="flex flex-col md:flex-row md:items-end md:space-x-6 space-y-4 md:space-y-0"
              >
                <div className="flex flex-col flex-1">
                  <label htmlFor="item-name" className="mb-2 font-semibold">
                    Select Product
                  </label>
                  <select
                    id="item-name"
                    name="item-name"
                    onChange={handlePriceChange}
                    className="p-2 rounded-md bg-gray-700 text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  >
                    {Product.map(({ name }, idx) => (
                      <option key={idx} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className=" flex justify-between items-center ">
                  <div className="flex flex-col w-[45%]">
                    <label htmlFor="price" className="mb-2 font-semibold">
                      Product Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      value={currentPrice}
                      disabled
                      className="p-2 rounded-md bg-gray-700 text-yellow-300 cursor-not-allowed"
                    />
                  </div>

                  <div className="flex flex-col w-[45%]">
                    <label htmlFor="quantity" className="mb-2 font-semibold">
                      Quantity
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="1"
                      required
                      className="p-2 rounded-md bg-gray-700 text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="Quantity"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded w-full mb-4 hover:bg-yellow-500"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6">
              <ProductList
                TotalSales={TotalSales}
                setTotalSales={setTotalSales}
                AddQuantityFuction={AddQuantityFuction}
                changeName={changeName}
                QuantityList={QuantityList}
                Lists={Lists}
                DeleteItem={DeleteItem}
                ItemListShowFunction={ItemListShowFunction}
              />
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
            <SalesCalculator
              Lists={Lists}
              TotalSales={TotalSales}
              setTotalSales={setTotalSales}
            />
            <NavLink to="/doctorListForm">
              <button className="mt-6 w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-md flex items-center justify-center space-x-2 transition shadow-md">
                <span>Next Step</span> <TbPlayerTrackNext />
              </button>
            </NavLink>
          </div>
        )}
      </div>
    </Template>
  );
};

export default ProductForm;
