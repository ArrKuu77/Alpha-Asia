import React, { useEffect, useRef, useState } from "react";
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
import DoctorCallList from "../pages/DoctorCallList";
import Swal from "sweetalert2";
import ProductListHendal from "../pages/CreateProductList";
import ReportReview from "../pages/ReportReview";
import EditReportReview from "../pages/EditReportReview";
// import { list } from "postcss";

const ReportForm = () => {
  const [Product, setProduct] = useState(
    JSON.parse(localStorage.getItem("CreateProductList"))
      ? JSON.parse(localStorage.getItem("CreateProductList"))
      : []
  );

  const [Lists, setLists] = useState([]);
  const [DoctorList, setDoctor] = useState([]);
  const createTable = (
    DoctorName,
    CustomerFeedback,
    NextPlan,
    Hospital,
    Objective,
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
      Objective,
      Hospital,
      ShortName: currentShortName,
      id: Date.now(),
    };
    console.log(NewDoctorlist);

    console.log(Lists);

    setDoctor([...DoctorList, NewDoctorlist]);
    setShortName([]);
    localStorage.setItem(
      DoctorNameDate,
      JSON.stringify([...DoctorList, NewDoctorlist])
    );
    // setShortName([...ShortName]);
    // }
  };
  // console.log(DoctorList);

  const addList = (productname, quantity) => {
    const currentItem = Product.find((product) => product.name == productname);
    console.log(currentItem);

    const ExitList = Lists.find((list) => list.item.name == currentItem.name);
    console.log(ExitList);

    if (ExitList) {
      setLists(
        Lists.map((list) => {
          if (list.item.name == currentItem.name) {
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
        // console.log(list.id, id);
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
    //   ? []
    //   : JSON.parse(localStorage.getItem("QuantityList"))
  );

  console.log(QuantityList);

  const [changeName, setchangeName] = useState(true);
  // console.log(QuantityList);
  // console.log(changeName);
  console.log(Lists);
  const [CPL_name, setCPL_name] = useState();
  const [Quantity_name, setQuantity_name] = useState();

  useEffect(() => {
    const copyCPL = JSON.parse(localStorage.getItem("CreateProductList"));
    const copyCPL_name = new Set(copyCPL?.map((item) => item.name));
    setCPL_name(copyCPL_name);
    setQuantity_name(Quantity_name);
  }, []);
  const TotalsalesLGet = JSON.parse(localStorage.getItem("TotalSales"));

  const [TotalSales, setTotalSales] = useState(
    TotalsalesLGet == null ? 0 : parseInt(TotalsalesLGet.TotalSale)
  );

  const AddQuantityFuction = (setnoProductSpan, calculator) => {
    let canMinus = true;
    const Todaysales = Lists.reduce((pv, cv) => pv + cv.amount, 0);
    const OldTodaysale = JSON.parse(localStorage.getItem("TotalSales"))
      ?.Todaysales
      ? JSON.parse(localStorage.getItem("TotalSales"))?.Todaysales
      : 0;

    setchangeName(false);
    const copyQTY = JSON.parse(localStorage.getItem("QuantityList"))
      ? JSON.parse(localStorage.getItem("QuantityList"))
      : [];
    const Quantity_name = new Set(copyQTY?.map((item) => item.name));

    setQuantityList(JSON.parse(localStorage.getItem("QuantityList")));
    const differenceNames = [...CPL_name].filter(
      (name) => !Quantity_name.has(name)
    );
    // console.log(differenceNames);
    const DifferenceNameArray = differenceNames.map((list) => {
      return { name: list, quantity: 0 };
    });

    console.log(DifferenceNameArray);
    if (DifferenceNameArray.length > 0) {
      console.log(QuantityList);
      setQuantityList([...copyQTY, ...DifferenceNameArray]);
      localStorage.setItem(
        "QuantityList",
        JSON.stringify([...copyQTY, ...DifferenceNameArray])
      );
    }

    // if (differenceNames) {
    //   localStorage.setItem("QuantityList",...QuantityList,)
    // }

    // setQuantityList(  );
    const QuantityListLS =
      JSON.parse(localStorage.getItem("QuantityList")) == null ? false : true;

    if (!QuantityListLS) {
      console.log("have");

      setnoProductSpan(true);
      const CopyCreatProductList = localStorage.getItem("CreateProductList")
        ? JSON.parse(localStorage.getItem("CreateProductList"))
        : [];
      const MainQtyList = CopyCreatProductList.map((list) => {
        return { name: list.name, quantity: 0 };
      });

      localStorage.setItem("QuantityList", JSON.stringify(MainQtyList));
      // console.log(noProductSpan);
      setQuantityList(MainQtyList);
    }
    console.log(Lists, QuantityList);

    Lists.map((list) => {
      return QuantityList.find((qtyList) => {
        if (list.item.name == qtyList.name) {
          if (list.quantity > qtyList.quantity) {
            canMinus = false;
            return qtyList;
          }
        }
      });
    });
    console.log(canMinus);

    if (!changeName) {
      console.log("have");

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#228b22",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Add calculator ",
      }).then((result) => {
        if (result.isConfirmed) {
          if (QuantityListLS) {
            setQuantityList(JSON.parse(localStorage.getItem("QuantityList")));
            for (let x = 0; x < QuantityList.length; x++) {
              const currentList = Lists.find(
                (list) => list.item.name == QuantityList[x].name
              );
              console.log(currentList);

              const currentListAdd = Lists.find(
                (list) => list.item.id > QuantityList.length
              );
              // console.log(currentListAdd, QuantityList);

              if (currentListAdd) {
                console.log("have");

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
                if (calculator == "SalePlus") {
                  setQuantityList(
                    QuantityList.map((list) => {
                      if (list.name == currentList.item.name) {
                        return (list.quantity += currentList.quantity);
                      }
                      return list;
                    })
                  );
                  Swal.fire({
                    title: "Add quantity!",
                    text: "Product quantity has been added.",
                    icon: "success",
                  });
                } else {
                  if (!canMinus) {
                    Swal.fire({
                      title: "Minus quantity!",
                      text: `Some Product quantity can not  minus.`,
                      icon: "error",
                    });
                    return;
                  } else {
                    localStorage.setItem(
                      "TotalSales",
                      JSON.stringify({
                        TotalSale:
                          TotalSales - Todaysales < 1
                            ? 0
                            : TotalSales - Todaysales,
                        Todaysales:
                          OldTodaysale - Todaysales < 1
                            ? 0
                            : OldTodaysale - Todaysales,
                      })
                    );
                    // }
                    const TotalAmount = JSON.parse(
                      localStorage.getItem("TotalSales")
                    ).TotalSale;
                    // console.log(TotalAmount);
                    setTotalSales(parseInt(TotalAmount));
                    setQuantityList(
                      QuantityList.map((list) => {
                        if (list.name == currentList.item.name) {
                          return (list.quantity -= currentList.quantity);
                        }
                        return list;
                      })
                    );

                    Swal.fire({
                      title: "Minus quantity!",
                      text: "Product quantity has been minus.",
                      icon: "success",
                    });
                  }
                }
                const AddTodaySale = !canMinus
                  ? OldTodaysale + Todaysales
                  : Todaysales;

                setnoProductSpan(false);
                setQuantityList([...QuantityList]);
                localStorage.setItem(
                  "QuantityList",
                  JSON.stringify(QuantityList)
                );
                if (calculator == "SalePlus") {
                  const calculateTotal = Todaysales + TotalSales;

                  localStorage.setItem(
                    "TotalSales",
                    JSON.stringify({
                      TotalSale: TotalSales + Todaysales,
                      Todaysales: AddTodaySale,
                      Achievement: (
                        (calculateTotal /
                          parseInt(localStorage.getItem("Target"))) *
                        100
                      ).toFixed(2),
                      Target: parseInt(localStorage.getItem("Target")),
                    })
                  );
                }
                // } else {
                // localStorage.setItem(
                //   "TotalSales",
                //   JSON.stringify({
                //     TotalSale: TotalSales - Todaysales,
                //     Todaysales,
                //   })
                // );
                // }
                const TotalAmount = JSON.parse(
                  localStorage.getItem("TotalSales")
                ).TotalSale;
                // console.log(TotalAmount);
                setTotalSales(parseInt(TotalAmount));
              }
            }
          }
        }
        if (!result.isConfirmed) {
          console.log("hehfalse");
          return;
        }
      });
    }

    // console.log(QuantityListLS);
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
          <Route path="/DoctorCallList" element={<DoctorCallList />} />
          <Route
            path="/productForm"
            element={
              <ProductForm
                TotalSales={TotalSales}
                setTotalSales={setTotalSales}
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
          <Route path="/CreateProductList" element={<ProductListHendal />} />

          <Route path="/report-review" element={<ReportReview />} />
          <Route
            path="/report-review/edit/:id"
            element={<EditReportReview />}
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
      </div>
    </div>
  );
};

export default ReportForm;
