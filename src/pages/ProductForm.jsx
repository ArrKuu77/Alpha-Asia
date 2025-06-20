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
  // noProductSpan,
  AddQuantityFuction,
  changeName,
  QuantityList,
  DeleteItem,
  ItemListShowFunction,
}) => {
  // console.log(Product);
  const formRef = useRef();
  const copyCPL = JSON.parse(localStorage.getItem("CreateProductList"))
    ? JSON.parse(localStorage.getItem("CreateProductList"))
    : 0;

  let [currentPrice, setCurrentPrice] = useState(
    copyCPL[0]?.price ? copyCPL[0].price : 0
  );
  const [widthJust, setWidthJust] = useState(false);
  // console.log(currentPrice);
  const hundalarSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    console.log(formData.get("item-name"));

    if (formData.get("item-name") == null) {
      alert("Have not product list");
      console.log("dfd");
    } else {
      addList(formData.get("item-name"), parseInt(formData.get("quantity")));
      formRef.current.reset();
      setWidthJust(true);
      setCurrentPrice(currentPrice);
    }
  };
  const TotalsalesLGet = JSON.parse(localStorage.getItem("TotalSales"));
  const [NoTotalSale, setNoTotalSales] = useState(
    TotalsalesLGet == null ? 0 : parseInt(TotalsalesLGet.TotalSale)
  );
  const [SaleShow, setSaleShow] = useState(true);

  const NoSaleFunction = () => {
    setSaleShow(false);
    const Todaysales = 0;
    localStorage.setItem(
      "TotalSales",
      JSON.stringify({
        TotalSale: NoTotalSale + Todaysales,
        Todaysales,
      })
    );
    const TotalAmount = JSON.parse(
      localStorage.getItem("TotalSales")
    ).TotalSale;
    setNoTotalSales(parseInt(TotalAmount));
    console.log(NoTotalSale);
  };
  console.log(Product);

  const OnchangePrice = () => {
    const formData = new FormData(formRef.current);
    // console.log(formData.get("item-id"));
    const Price = Product.find(
      (product) => product.name == formData.get("item-name")
    );
    // console.log(Price.price);
    setCurrentPrice(Price.price);
  };
  // const [noProductSpan, setnoProductSpan] = useState(false);
  // const [changeName, setchangeName] = useState(true);
  // const [QuantityList, setQuantityList] = useState(
  //   []
  //   // localStorage.getItem("QuantityList") == null
  //   //   ? false
  //   //   : JSON.parse(localStorage.getItem("QuantityList"))
  // );
  // const AddQuantityFuction = () => {
  //   setchangeName(false);
  //   const QuantityListLS =
  //     JSON.parse(localStorage.getItem("QuantityList")) == null ? false : true;
  //   console.log(QuantityListLS);
  //   if (QuantityListLS) {
  //     console.log(QuantityList);
  //     setQuantityList(JSON.parse(localStorage.getItem("QuantityList")));
  //     for (let x = 0; x < QuantityList.length; x++) {
  //       const currentList = Lists.find(
  //         (list) => list.item.name == QuantityList[x].name
  //       );

  //       console.log(typeof currentList, currentList);
  //       if (currentList) {
  //         setQuantityList(
  //           QuantityList.map((list) => {
  //             if (list.name == currentList.item.name) {
  //               list.quantity += currentList.quantity;
  //             }
  //             return list;
  //           })
  //           // localStorage.setItem(
  //           //   "QuantityList",
  //           //   JSON.stringify(

  //           //   )
  //           // )
  //         );
  //       }
  //       localStorage.setItem("QuantityList", JSON.stringify(QuantityList));
  //     }
  //   } else {
  //     localStorage.setItem(
  //       "QuantityList",

  //       JSON.stringify([
  //         {
  //           quantity: 0,
  //           name: "GI-Boost",
  //         },
  //         {
  //           quantity: 0,
  //           name: "Hepa-Boost",
  //         },
  //         {
  //           quantity: 0,
  //           name: "4G-Boost",
  //         },
  //         {
  //           quantity: 0,
  //           name: "PantoTop-40",
  //         },
  //       ])
  //     );
  //     setnoProductSpan(true);
  //     setQuantityList(JSON.parse(localStorage.getItem("QuantityList")));
  //   }
  //   console.log(QuantityList.length);
  //   // if (QuantityList.length == 0) {
  //   //   // console.log("kfdgdjfd");
  //   //   let newList = [];
  //   //   for (let x = 0; x < Lists.length; x++) {
  //   //     newList.push({
  //   //       name: Lists[x].item.name,
  //   //       quantity: Lists[x].quantity,
  //   //     });
  //   //   }
  //   //   console.log(newList);
  //   //   setQuantityList(newList);
  //   //   console.log(QuantityList);
  //   // }
  // };

  return (
    <Template>
      <div className={`${widthJust ? "w-full" : "w-screen"} bg-slate-500 `}>
        <NavLink to="/">
          <button className=" bg-indigo-500 p-2 rounded-md border-gray-900 border-2 ms-2 text-start block ">
            Back
          </button>
        </NavLink>
        <form ref={formRef} onSubmit={hundalarSubmit} id="create"></form>
        <div className="flex justify-center items-cente bg-slate-900 w-3/6 mx-auto my-2 p-1">
          <h1
            onClick={() => {
              setSaleShow(true);
            }}
            className={
              SaleShow
                ? ` p-2 bg-indigo-500 rounded`
                : ` text-slate-400 p-2  rounded`
            }
          >
            Sale
          </h1>
          <h1
            className={
              SaleShow
                ? `text-slate-400 p-2  rounded`
                : ` bg-red-600 text-white p-2  rounded`
            }
            onClick={NoSaleFunction}
          >
            NoSale
          </h1>
        </div>
        {SaleShow ? (
          <div className=" w-full">
            <div className=" ">
              {Product.length < 1 ? (
                <div>
                  <h1 className=" text-xl font-bold ">
                    There is no Product List
                  </h1>
                </div>
              ) : (
                <div className="col col-md-3">
                  <label htmlFor="" className=" text-2xl block  ">
                    Select Product
                  </label>
                  <select
                    onChange={OnchangePrice}
                    form="create"
                    name="item-name"
                    id=""
                    className="w-1/2 p-1 text-lg"
                  >
                    {Product?.map(({ name }, index) => {
                      return (
                        <option key={index} value={name} className="">
                          {name}
                        </option>
                      );
                    })}
                  </select>
                  <label className="block">
                    <span className="block text-xl font-medium text-black	">
                      Product Price
                    </span>
                    <input
                      value={currentPrice}
                      disabled
                      form="create"
                      type="number"
                      className=" border-solid border-2  border-red-800	text-black	"
                      placeholder="Price"
                    />
                    {/* <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
            TownShip
          </p> */}
                  </label>
                  <label className="block">
                    <span className="block text-xl font-medium text-black	">
                      Prodcut Quantity
                    </span>
                    <input
                      name="quantity"
                      form="create"
                      type="number"
                      required
                      className=" border-solid border-2  border-red-800	text-black	"
                      placeholder="Quantity"
                    />
                    {/* <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
            TownShip
          </p> */}
                  </label>

                  <div className=" mt-3 text-center ">
                    <button
                      form="create"
                      className=" border border-white bg-blue-900 p-2 text-white "
                    >
                      Add Product
                    </button>
                  </div>
                </div>
              )}
            </div>
            <ProductList
              // noProductSpan={noProductSpan}
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
        ) : (
          <div>
            <SalesCalculator
              Lists={Lists}
              TotalSales={TotalSales}
              setTotalSales={setTotalSales}
            />
            {/* <NavLink to="/doctorListForm">
              <button className=" bg-indigo-500 p-2 rounded-md border-gray-900 border-2  ms-auto w-1/2 font-bold  flex items-center justify-evenly mt-2 ">
                Next Step <TbPlayerTrackNext />
              </button>
            </NavLink> */}
          </div>
        )}
      </div>
    </Template>
  );
};

export default ProductForm;
