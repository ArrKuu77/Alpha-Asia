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
      <div className="w-full min-h-screen bg-slate-900 text-white p-4 space-y-6">
        {/* Form Section */}
        <form
          className="w-full max-w-2xl mx-auto flex flex-col gap-4"
          id="create"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="productName" className="text-xl font-semibold">
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
              className="w-full p-2 rounded bg-slate-800 text-white placeholder-gray-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="SName" className="text-xl font-semibold">
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
              className="w-full p-2 rounded bg-slate-800 text-white placeholder-gray-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="prodcutPrice" className="text-xl font-semibold">
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
              className="w-full p-2 rounded bg-slate-800 text-white placeholder-gray-400"
            />
          </div>

          <div className="text-center">
            {createBtn ? (
              <button
                onClick={hundalarSubmit}
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded"
              >
                Create Product
              </button>
            ) : (
              <button
                onClick={hendalEditCreate}
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded"
              >
                Edit Product
              </button>
            )}
          </div>
        </form>

        {/* Table Section */}
        {createProductList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-slate-700 text-sm sm:text-base">
              <thead className="bg-slate-800 text-yellow-400 font-bold">
                <tr>
                  <th className="border border-slate-700 px-4 py-2">No</th>
                  <th className="border border-slate-700 px-4 py-2">
                    Product Name
                  </th>
                  <th className="border border-slate-700 px-4 py-2">
                    Short Name
                  </th>
                  <th className="border border-slate-700 px-4 py-2">Price</th>
                  <th className="border border-slate-700 px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {createProductList.map((list, index) => (
                  <tr key={index} className="hover:bg-slate-800 transition">
                    <td className="border border-slate-700 px-3 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-slate-700 px-3 py-2">
                      {list.name}
                    </td>
                    <td className="border border-slate-700 px-3 py-2">
                      {list.SName}
                    </td>
                    <td className="border border-slate-700 px-3 py-2 text-center">
                      {list.price}
                    </td>
                    <td className="border border-slate-700 px-3 py-2">
                      <div className="flex justify-center gap-4">
                        <FaUserEdit
                          onClick={() => hendalEdit(list)}
                          className="text-blue-500 hover:text-blue-400 cursor-pointer text-lg"
                        />
                        <TiDelete
                          onClick={() => hendalDelete(list.name)}
                          className="text-red-500 hover:text-red-400 cursor-pointer text-lg"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-lg font-semibold text-yellow-400">
            There are no Product Lists!
          </div>
        )}
      </div>
    </Template>
  );
};

export default ProductListHendal;
