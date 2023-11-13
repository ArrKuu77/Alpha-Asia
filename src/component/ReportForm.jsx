import React, { useRef, useState } from "react";
// import MrInput from "../pages/MrInput";
import ProductForm from "../pages/ProductForm";
import ProductList from "./ProductList";
import ReportDoctorForm from "../pages/ReportDoctorForm";
import DoctorFeedbackList from "./DoctorFeedbackList";
import SalesForm from "./SalesForm";
import { list } from "postcss";
import { Route, Routes } from "react-router-dom";
import MrInput from "../pages/MrInput";
import EditDoctorForm from "./EditDoctorForm";
import ReadyDoctorList from "../pages/ReadyDoctorList";
import ClearDoctorLists from "../pages/ClearDoctorLists";
import NotFound from "../pages/NotFound";
// import { list } from "postcss";

const ReportForm = () => {
  const [Product, setProduct] = useState([
    {
      id: 1,
      name: "GI-Boost",
      SName: "GI",
      price: 17700,
    },
    {
      id: 2,
      name: "Hepa-Boost",
      SName: "HP",
      price: 23800,
    },
    {
      id: 3,
      name: "4G-Boost",
      SName: "4G",
      price: 66000,
    },
    {
      id: 4,
      name: "PantoTop-40",
      SName: "PT",
      price: 22000,
    },
    {
      id: 5,
      name: "Multi-Gin",
      SName: "MG",
      price: 21000,
    },
    {
      id: 6,
      name: "Immune-5",
      SName: "IMU",
      price: 15200,
    },
    {
      id: 7,
      name: "Alpha-Lady",
      SName: "ALD",
      price: 23800,
    },
    {
      id: 8,
      name: "Liver-Boost",
      SName: "LB",
      price: 22500,
    },
    {
      id: 9,
      name: "Pregnan Boost",
      SName: "PGB",
      price: 28300,
    },
  ]);
  const [Lists, setLists] = useState([]);
  const [DoctorList, setDoctor] = useState([]);

  const createTable = (
    DoctorName,
    CustomerFeedback,
    NextPlan,
    CallPurpose,
    currentShortName,
    DoctorNameDate
  ) => {
    // if (localStorage.getItem("QuantityList") == null) {
    //   alert("You forget AddQuantity Button");
    // } else {
    console.log(DoctorList);
    const NewDoctorlist = {
      DoctorName,
      CustomerFeedback,
      NextPlan,
      CallPurpose,
      ShortName: currentShortName,
      id: Date.now(),
    };
    console.log(Lists);

    setDoctor([...DoctorList, NewDoctorlist]);
    setShortName(currentShortName);
    localStorage.setItem(
      DoctorNameDate,
      JSON.stringify([...DoctorList, NewDoctorlist])
    );
    // }
  };
  // console.log(DoctorList);

  const addList = (productId, quantity) => {
    const currentItem = Product.find((product) => product.id == productId);
    const ExitList = Lists.find((list) => list.item.id === currentItem.id);
    if (ExitList) {
      setLists(
        Lists.map((list) => {
          if (list.item.id === currentItem.id) {
            list.quantity += quantity;
            list.amount = list.quantity * currentItem.price;
          }
          return list;
        })
      );
    } else {
      const Newlist = {
        id: Date.now(),
        quantity,
        item: currentItem,
        amount: currentItem.price * quantity,
      };
      setLists([...Lists, Newlist]);
    }
  };
  // console.log(Lists);

  // console.log(QuantityList);
  let [ItemListShowHide, setItemListShowHide] = useState(false);
  const ItemListShowFunction = (list) => {
    setItemListShowHide((ItemListShowHide = true));
    console.log(ItemListShowHide, list);
    // setInvoiceEdit(list)
  };
  const DeleteItem = (id) => {
    setLists(
      Lists.filter((list) => {
        console.log(list.id, id);
        return list.id !== id;
      })
    );
  };
  const DeleteDoctorList = (id, DoctorNameDate) => {
    console.log(id, DoctorNameDate);

    const DeleteDoctor = DoctorList.filter((list) => {
      console.log(list.id, id);
      return list.id !== id;
    });
    setDoctor(DeleteDoctor);
    localStorage.setItem(DoctorNameDate, JSON.stringify([...DeleteDoctor]));
  };
  const [EditDoctor, setEditDoctor] = useState();
  const EditDoctorList = (id) => {
    const currentDoctor = DoctorList.find((list) => list.id == id);
    setEditDoctor(currentDoctor);
    setShortName(currentDoctor.ShortName.filter((name) => name));
    console.log(EditDoctor);
  };
  const [QuantityList, setQuantityList] = useState(
    []
    // localStorage.getItem("QuantityList") == null
    //   ? false
    //   : JSON.parse(localStorage.getItem("QuantityList"))
  );
  const [changeName, setchangeName] = useState(true);
  // console.log(QuantityList);

  const AddQuantityFuction = (setnoProductSpan) => {
    // console.log(setnoProductSpan);
    setchangeName(false);
    const QuantityListLS =
      JSON.parse(localStorage.getItem("QuantityList")) == null ? false : true;
    // console.log(QuantityListLS);
    if (QuantityListLS) {
      // console.log(QuantityList);
      setQuantityList(JSON.parse(localStorage.getItem("QuantityList")));
      for (let x = 0; x < QuantityList.length; x++) {
        const currentList = Lists.find(
          (list) => list.item.name == QuantityList[x].name
        );

        const currentListAdd = Lists.find(
          (list) => list.item.id > QuantityList.length
        );
        // console.log(currentListAdd, QuantityList);

        if (currentListAdd) {
          setQuantityList([
            ...QuantityList,
            {
              name: currentListAdd.item.name,
              quantity: currentListAdd.quantity,
            },
          ]);
          // console.log(QuantityList);
          localStorage.setItem(
            "QuantityList",
            JSON.stringify([
              ...QuantityList,
              {
                name: currentListAdd.item.name,
                quantity: currentListAdd.quantity,
              },
            ])
          );
          setnoProductSpan(false);
        }
        if (currentList) {
          // console.log(typeof currentList, currentList);

          setQuantityList(
            QuantityList.map((list) => {
              if (list.name == currentList.item.name) {
                list.quantity += currentList.quantity;
              }
              return list;
            })
            // localStorage.setItem(
            //   "QuantityList",
            //   JSON.stringify(

            //   )
            // )
          );
          setnoProductSpan(false);
          localStorage.setItem("QuantityList", JSON.stringify(QuantityList));
        }
      }
    } else {
      localStorage.setItem(
        "QuantityList",

        JSON.stringify([
          {
            quantity: 0,
            name: "GI-Boost",
          },
          {
            quantity: 0,
            name: "Hepa-Boost",
          },
          {
            quantity: 0,
            name: "4G-Boost",
          },
          {
            quantity: 0,
            name: "PantoTop-40",
          },
          {
            name: "Multi-Gin",
            quantity: 0,
          },
          {
            name: "Immune-5",
            quantity: 0,
          },
          {
            name: "Alpha-Lady",
            quantity: 0,
          },
          {
            name: "Liver-Boost",
            quantity: 0,
          },
          {
            name: "Pregnan Boost",
            quantity: 0,
          },
        ])
      );
      setnoProductSpan(true);
      // console.log(noProductSpan);
      setQuantityList(JSON.parse(localStorage.getItem("QuantityList")));
    }
    // console.log(QuantityList.length);
    // if (QuantityList.length == 0) {
    //   // console.log("kfdgdjfd");
    //   let newList = [];
    //   for (let x = 0; x < Lists.length; x++) {
    //     newList.push({
    //       name: Lists[x].item.name,
    //       quantity: Lists[x].quantity,
    //     });
    //   }
    //   console.log(newList);
    //   setQuantityList(newList);
    //   console.log(QuantityList);
    // }
  };
  const [ShortName, setShortName] = useState([]);
  // console.log(ShortName);

  // const AddShortNameFunction = (event) => {
  //   const Shorttrue = ShortName.includes(event);
  //   // console.log(Shorttrue);
  //   if (!Shorttrue) {
  //     setShortName([...ShortName, event]);
  //   } else {
  //     setShortName(
  //       ShortName.filter((currentName) => {
  //         // console.log(currentName, event);
  //         return currentName !== event;
  //       })
  //     );
  //   }
  // };

  const [CurrentDate, setCurrentDate] = useState();
  // console.log(CurrentDate);
  const [DoctorListsDate, setDoctorListsDate] = useState(
    localStorage.getItem("DoctorListsDate") == null
      ? []
      : JSON.parse(localStorage.getItem("DoctorListsDate"))
  );
  // console.log(DoctorListsDate);
  const [Township, setTownship] = useState();
  // console.log(Township);
  return (
    <div className=" bg-slate-500      ">
      <div className="  text-center">
        {/* <MrInput /> */}
        <Routes>
          <Route path="/" element={<MrInput setTownship={setTownship} />} />
          <Route
            path="/productForm"
            element={
              <ProductForm
                Product={Product}
                addList={addList}
                // noProductSpan={noProductSpan}
                AddQuantityFuction={AddQuantityFuction}
                changeName={changeName}
                QuantityList={QuantityList}
                Lists={Lists}
                DeleteItem={DeleteItem}
                ItemListShowFunction={ItemListShowFunction}
              />
            }
          />

          <Route
            path="/doctorListForm"
            element={
              <ReportDoctorForm
                DoctorListsDate={DoctorListsDate}
                setDoctorListsDate={setDoctorListsDate}
                setCurrentDate={setCurrentDate}
                setDoctor={setDoctor}
                // AddShortNameFunction={AddShortNameFunction}
                Product={Product}
                ShortName={ShortName}
                createTable={createTable}
                QuantityList={QuantityList}
                Lists={Lists}
                DoctorList={DoctorList}
                DeleteDoctorList={DeleteDoctorList}
                EditDoctorList={EditDoctorList}
                EditDoctor={EditDoctor}
                setEditDoctor={setEditDoctor}
                setShortName={setShortName}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/ClearDoctorLists"
            element={
              <ClearDoctorLists
                setchangeName={setchangeName}
                setQuantityList={setQuantityList}
                DoctorListsDate={DoctorListsDate}
                setDoctorListsDate={setDoctorListsDate}
              />
            }
          />
          <Route
            path="/ReadyDoctorList"
            element={
              <ReadyDoctorList
                Township={Township}
                CurrentDate={CurrentDate}
                DoctorList={DoctorList}
                DeleteDoctorList={DeleteDoctorList}
                EditDoctorList={EditDoctorList}
              />
            }
          />
        </Routes>
        {/* <ProductForm Product={Product} addList={addList} /> */}
        {/* <ProductList
          noProductSpan={noProductSpan}
          AddQuantityFuction={AddQuantityFuction}
          changeName={changeName}
          QuantityList={QuantityList}
          Lists={Lists}
          DeleteItem={DeleteItem}
          ItemListShowFunction={ItemListShowFunction}
        /> */}
        {/* <ReportDoctorForm
          // AddShortNameFunction={AddShortNameFunction}
          Product={Product}
          ShortName={ShortName}
          createTable={createTable}
        /> */}
        {/* <DoctorFeedbackList
          // ShortName={ShortName}
          QuantityList={QuantityList}
          Lists={Lists}
          DoctorList={DoctorList}
          DeleteDoctorList={DeleteDoctorList}
        /> */}
      </div>
    </div>
  );
};

export default ReportForm;
