import React, { useRef, useState } from "react";
import Template from "../component/Template";
import { FaUserEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import Swal from "sweetalert2";

const ProductListHendal = () => {
  // const formRef = useRef();
  const [FormData, setFormData] = useState({ name: "", SName: "", price: "" });
  const [createProductList, setcreateProductList] = useState(
    JSON.parse(localStorage.getItem("CreateProductList"))
      ? JSON.parse(localStorage.getItem("CreateProductList"))
      : []
  );
  const hundalarSubmit = (e) => {
    e.preventDefault();
    // const formData = new FormData(formRef.current);
    console.log("hh");
    if (FormData.name == "" || FormData.SName == "" || FormData.price == null) {
      Swal.fire({
        title: "Error",
        text: "Please fill Product name and Product Price and Product Short Name?",
        icon: "error",
      });
    } else if (FormData.SName.length < 2 || FormData.SName.length > 3) {
      console.log(FormData.SName.length, FormData.SName);

      Swal.fire({
        title: "Error",
        text: "Please fill Product Short Name  must be between 2 and 3 characters?",
        icon: "error",
      });
    } else {
      let upperFirstCharStr =
        FormData.name.charAt(0).toUpperCase() + FormData.name.slice(1);
      console.log(upperFirstCharStr);

      let SName = FormData.SName.toUpperCase();

      const oldProdcutList = createProductList.find(
        (list) => list.name.toLowerCase() == upperFirstCharStr.toLowerCase()
      );

      // console.log(oldProdcutList);

      if (oldProdcutList) {
        Swal.fire({
          title: "Fail Add Product List!",
          text: "Your product list have this product!",
          icon: "error",
        });
        // formRef.current.reset();
        return;
      } else if (!oldProdcutList) {
        const NewProductList = {
          name: upperFirstCharStr,
          SName: SName,
          price: parseInt(FormData.price),
        };
        setcreateProductList([...createProductList, NewProductList]);
        localStorage.setItem(
          "CreateProductList",
          JSON.stringify([...createProductList, NewProductList])
        );
      } else {
        createProductList.map((list) => {
          list.name == FormData.name;
        });
        const NewProductList = {
          name: upperFirstCharStr,
          price: parseInt(FormData.price),
        };
        setcreateProductList([...createProductList, NewProductList]);
        localStorage.setItem(
          "CreateProductList",
          JSON.stringify([...createProductList, NewProductList])
        );
      }
    }
    // formRef.current.reset();
    setFormData({ name: "", SName: "", price: "" });
  };
  const hendalDelete = (name) => {
    Swal.fire({
      title: "Are you sure delete this product?",
      text: "You won't be able to revert this!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const DeleteProduct = createProductList.filter((list) => {
          return list.name !== name;
        });
        console.log(DeleteProduct);
        setcreateProductList(DeleteProduct);
        localStorage.setItem(
          "CreateProductList",
          JSON.stringify([...DeleteProduct])
        );
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const [productNameDisabl, setProductNameDisable] = useState(false);
  const hendalEdit = (EditProduct) => {
    console.log(EditProduct);
    setFormData({
      name: EditProduct.name,
      SName: EditProduct.SName,
      price: EditProduct.price,
    });
    setCreateBtn(false);
    setProductNameDisable(true);
  };
  const hendalEditCreate = (e) => {
    e.preventDefault();
    let upperFirstCharStr =
      FormData.name.charAt(0).toUpperCase() + FormData.name.slice(1);

    const oldProdcutList = createProductList.find(
      (list) => list.name.toLowerCase() == upperFirstCharStr.toLowerCase()
    );
    console.log(oldProdcutList);

    console.log("edit");
    if (oldProdcutList) {
      const newEditProduct = createProductList.map((list) => {
        if (list.name == oldProdcutList.name) {
          return {
            name: FormData.name,
            SName: oldProdcutList.SName,
            price: parseInt(FormData.price),
          };
        } else {
          console.log(list);

          return list;
        }
      });
      setcreateProductList(newEditProduct);
      localStorage.setItem("CreateProductList", JSON.stringify(newEditProduct));
      setFormData({ name: "", SName: "", price: "" });
      setCreateBtn(true);
    }
  };

  const [createBtn, setCreateBtn] = useState(true);
  return (
    <Template>
      <div className=" w-full bg-slate-500 h-full">
        <form className="pt-2 gap-3 flex flex-col" id="create">
          <div className=" flex justify-center items-center flex-col gap-1">
            <label htmlFor="productName" className=" text-2xl font-bold">
              Product Name
            </label>
            <input
              disabled={productNameDisabl}
              name="name"
              form="create"
              placeholder="Product Name..."
              type="text"
              id="productName"
              onChange={(e) =>
                setFormData({ ...FormData, name: e.target.value })
              }
              value={FormData.name}
            />
          </div>
          <div className=" flex justify-center items-center flex-col gap-1">
            <label htmlFor="productName" className=" text-2xl font-bold">
              Product ShortName
            </label>
            <input
              disabled={productNameDisabl}
              name="SName"
              form="create"
              required
              placeholder="Product Short Name..."
              type="text"
              id="SName"
              onChange={(e) =>
                setFormData({ ...FormData, SName: e.target.value })
              }
              value={FormData.SName}
            />
          </div>
          <div className=" flex justify-center items-center flex-col gap-1">
            <label htmlFor="prodcutPrice" className=" text-2xl font-bold">
              Product Price
            </label>
            <input
              name="price"
              form="create"
              placeholder="Product Price..."
              type="number"
              onChange={(e) =>
                setFormData({ ...FormData, price: e.target.value })
              }
              value={FormData.price}
              id="prodcutPrice"
              required
            />
          </div>
          <div className=" text-center">
            {createBtn ? (
              <button
                onClick={hundalarSubmit}
                className="border border-white bg-blue-900 p-2 text-white "
              >
                Create Product
              </button>
            ) : (
              <button
                onClick={hendalEditCreate}
                className="border border-white bg-blue-900 p-2 text-white "
              >
                Edit Product
              </button>
            )}
          </div>
        </form>

        {createProductList.length > 0 ? (
          <div className=" maxContent px-3 py-3">
            <table className=" mx-auto  pt-4 table-auto text-center  w-full border-collapse border border-slate-900 ">
              <thead className=" text-xl">
                <tr className="border  border-slate-900 p-2">
                  <th className="border border-slate-900 p-2">No</th>
                  <th className="border border-slate-900 p-2">Product Name</th>
                  <th className="border border-slate-900 p-2">Short Name</th>
                  <th className="border border-slate-900 p-2">Product Price</th>

                  <th className="border border-slate-900 p-2">Delete</th>
                  {/* <th className=" text-center">Edit</th> */}
                </tr>
              </thead>
              <tbody className=" text-lg">
                {createProductList?.map((list, index) => {
                  return (
                    <tr key={index} className="border border-slate-900">
                      <td className=" p-3 border-slate-900 flex justify-between align-items-center">
                        {" "}
                        {index + 1}.{" "}
                      </td>
                      <td className="border p-3 border-slate-900 text-center">
                        {" "}
                        {list.name}{" "}
                      </td>
                      <td className="border p-3 border-slate-900 text-center">
                        {" "}
                        {list.SName}{" "}
                      </td>
                      <td className="border p-3 border-slate-900">
                        {list.price}
                      </td>

                      <td className="border p-3 border-slate-900 ">
                        <div className="flex items-center gap-3 justify-center">
                          <FaUserEdit
                            onClick={hendalEdit.bind(null, list)}
                            className="  text-3xl  text-blue-600"
                          />
                          <TiDelete
                            onClick={hendalDelete.bind(null, list.name)}
                            className="  text-3xl  text-red-600"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className=" border text-xl w-screen  font-bold p-3 border-spacing-10 m-4">
            <h1 className=" ">There are no Product Lists ! </h1>
          </div>
        )}
      </div>
    </Template>
  );
};

export default ProductListHendal;
