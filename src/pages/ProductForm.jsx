import React, { useRef, useState } from "react";
import Template from "../component/Template";
import ProductList from "../component/ProductList";
import { NavLink } from "react-router-dom";

const ProductForm = ({
  Product,
  addList,
  Lists,
  // noProductSpan,
  AddQuantityFuction,
  changeName,
  QuantityList,
  DeleteItem,
  ItemListShowFunction,
}) => {
  console.log(Product);
  const formRef = useRef();
  let [currentPrice, setCurrentPrice] = useState(17700);
  // console.log(currentPrice);
  const hundalarSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    addList(formData.get("item-id"), parseInt(formData.get("quantity")));
    formRef.current.reset();
    setCurrentPrice(19200);
  };
  const OnchangePrice = () => {
    const formData = new FormData(formRef.current);
    // console.log(formData.get("item-id"));
    const Price = Product.find(
      (product) => product.id == formData.get("item-id")
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
      <div className="w-screen">
        <NavLink to="/">
          <button className=" bg-indigo-500 p-2 rounded-md border-gray-900 border-2 ms-2 text-start block ">
            Back
          </button>
        </NavLink>
        <form ref={formRef} onSubmit={hundalarSubmit} id="create"></form>
        <div className=" ">
          <div className="col col-md-3">
            <label htmlFor="" className=" text-2xl block  ">
              Select Product
            </label>
            <select
              onChange={OnchangePrice}
              form="create"
              name="item-id"
              id=""
              className="w-1/2 p-1 text-lg"
            >
              {Product.map(({ id, name }) => {
                return (
                  <option key={id} value={id} className="">
                    {name}
                  </option>
                );
              })}
            </select>
          </div>

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
        <ProductList
          // noProductSpan={noProductSpan}
          AddQuantityFuction={AddQuantityFuction}
          changeName={changeName}
          QuantityList={QuantityList}
          Lists={Lists}
          DeleteItem={DeleteItem}
          ItemListShowFunction={ItemListShowFunction}
        />
      </div>
    </Template>
  );
};

export default ProductForm;
