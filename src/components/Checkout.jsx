import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserInformation from "./forms/UserInformation";
import AddressInformation from "./forms/AddressInformation";
import storageManager from "../utils/storageManager";
import { getCurrentDate } from "../utils/dateHandler";
import { removeAllProductFromCart } from "../actions/userActions";

const Checkout = () => {
  const location = useLocation();
  const { deliveryCharge, totalPrice } = location.state;
  const userData = useSelector((state) => state.userReducer);
  const cartProduct = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const [sectionVisibility, setSectionVisiblity] = useState({
    userInformation: true,
    addressInformation: true,
  });

  const handleSectionVisibility = (section) => {
    setSectionVisiblity((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handlePlaceOrder = () => {
    alert("Order Placed Successfull!");

    const unixDate = Date.now();
    const updatedCartProducts = cartProduct.map((product) => ({
      ...product,
      orderPlaced: getCurrentDate(unixDate),
    }));

    const database = storageManager.loadFromLocalStorage("usersDb");
    const userDB = database.find((user) => user.id === userData.id);
    const existingUsers = database.filter((user) => user.id !== userData.id);

    const existingOrders = userDB.userDetails.orderHistory || [];
    const updatedUserDB = {
      ...userDB,
      userDetails: {
        ...userDB.userDetails,
        orderHistory: [...existingOrders, ...updatedCartProducts],
      },
    };

    const updatedUsers = [...existingUsers, updatedUserDB];
    storageManager.saveToLocalStorage("usersDb", updatedUsers);

    dispatch(removeAllProductFromCart());
  };

  return (
    <div className="mx-28">
      <div className="grid grid-cols-[3fr_2fr] ">
        <div className="flex flex-col p-6 gap-3">
          <div>
            <p className="text-2xl font-bold"> Checkout</p>
          </div>
          <div className="p-3">
            <p className="text-lg font-medium mb-4">My information</p>
            <UserInformation
              userData={userData}
              sectionVisibility={sectionVisibility}
              handleSectionVisibility={handleSectionVisibility}
            />
          </div>
          <div className="p-3">
            <p className="text-lg font-medium mb-4">Billing address</p>
            <AddressInformation
              userData={userData}
              sectionVisibility={sectionVisibility}
              handleSectionVisibility={handleSectionVisibility}
            />
          </div>
          <div className="p-3">
            <p className="text-lg font-medium mb-4">View order details</p>
            <div className="flex gap-2">
              {cartProduct.map((product) => (
                <div
                  key={product.id}
                  className="grid  w-44 grid-rows-[max-content_1fr] text-neutral-800 outline outline-1 outline-neutral-600 rounded p-2"
                >
                  <img
                    className="place-self-center h-40 rounded"
                    src={product.image}
                  />
                  <div className="grid grid-rows-[max-content_1fr] gap-1">
                    <p className="text-sm font-medium">{product.name}</p>
                    <div className="self-end">
                      <p className="text-sm font-medium">₹ {product.price}</p>
                      <div className="flex gap-2">
                        <p className="text-sm font-normal text-neutral-600">
                          Size:
                        </p>
                        <p className=" text-sm font-medium">{product.size}</p>
                      </div>
                      <div className="flex gap-2">
                        <p className="text-sm font-normal text-neutral-600">
                          Color:
                        </p>
                        <p className=" text-sm font-medium">{product.color}</p>
                      </div>
                      <div className="flex gap-2">
                        <p className="text-sm font-normal text-neutral-600">
                          Total:
                        </p>
                        <p className=" text-sm font-medium">
                          ₹ {product.price * product.quantity}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <p className="text-sm font-normal text-neutral-600">
                          Quantity:
                        </p>
                        <p className=" text-sm font-medium">
                          {product.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-2 p-3">
          <div className="flex flex-col bg-slate-100 p-3 rounded-md">
            <div className="flex justify-between pb-3 border-b-2 border-neutral-500">
              <div>
                <p className=" text-base font-normal">Order value</p>
                <p className=" text-base font-normal">Delivery charges</p>
              </div>
              <div>
                <p className=" text-base font-normal">Rs. {totalPrice}</p>
                <p className=" text-base font-normal">
                  {deliveryCharge === 0 ? "Free" : `Rs. ${deliveryCharge}`}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center pt-3">
              <p className="text-xl font-medium">Total charges</p>
              <p className="text-xl font-medium">Rs. {totalPrice}</p>
            </div>
            <button
              className="py-2 px-3 self-center w-3/5 mt-3 text-center align-middle bg-neutral-800 text-base text-neutral-50 font-normal rounded hover:drop-shadow-lg"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
