import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseProductQuantity,
  increaseProductQuantity,
  removeProductFromCart,
} from "../actions/userActions";
import { NavLink } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { trash, trashOutline } from "ionicons/icons";

const Cart = () => {
  const cartProduct = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const [orderValue, setOrderValue] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [icon, setIcon] = useState(trashOutline);

  useEffect(() => {
    const calculateOrderValue = () => {
      const value = cartProduct.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      );
      setOrderValue(value);
    };

    const calculateTotalPrice = () => {
      const total = orderValue + deliveryCharge;
      setTotalPrice(total);
    };

    calculateOrderValue();
    calculateTotalPrice();
  }, [cartProduct, deliveryCharge, orderValue]);

  const handleRemoveProduct = (id) => {
    dispatch(removeProductFromCart(id));
  };

  const handleQuantityIncrement = (id) => {
    dispatch(increaseProductQuantity(id));
  };

  const handleQuantityDecrement = (id) => {
    dispatch(decreaseProductQuantity(id));
  };

  const handleNext = (e) => {
    if (cartProduct.length === 0) {
      e.preventDefault();
    }
  };

  return (
    <div className="mx-28 min-h-screen">
      <div className="grid grid-cols-[3fr_2fr] ">
        <div className="flex flex-col p-4 gap-3">
          <div>
            <p className="text-2xl font-bold"> Shopping bag</p>
            <p className="text-base font-medium">
              {cartProduct.length} {cartProduct.length > 1 ? "items" : "item"}{" "}
              in your bag
            </p>
          </div>
          <div className="flex flex-col bg-neutral-50 outline outline-1 outline-neutral-200 p-3 rounded-md">
            {cartProduct.length > 0 ? (
              cartProduct.map((product) => (
                <div
                  key={product.name}
                  className="grid grid-cols-[1fr_4fr_max-content] py-4 gap-3 border-b-2 border-neutral-300"
                >
                  <img className="rounded-md" src={product.image} />
                  <div className="text-neutral-800  self-center">
                    <p className="text-lg font-semibold">{product.name}</p>
                    <p className="font-medium">₹ {product.price}</p>
                    <div className="flex gap-2">
                      <p className="font-normal text-neutral-600">Size:</p>
                      <p className="font-medium">{product.size}</p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-normal text-neutral-600">Color:</p>
                      <p className="font-medium">{product.color}</p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-normal text-neutral-600">Total:</p>
                      <p className="font-medium">
                        ₹ {product.price * product.quantity}
                      </p>
                    </div>
                    <div className="flex items-center justify-items-center mt-3 drop-shadow">
                      <button
                        className={`px-4 py-1  text-neutral-500 font-semibold text-lg rounded-l-md hover:scale-[1.05] ${
                          product.quantity === 0
                            ? "bg-neutral-300 hover:scale-100"
                            : "bg-slate-200"
                        }`}
                        disabled={product.quantity === 0}
                        onClick={() => handleQuantityDecrement(product.id)}
                      >
                        -
                      </button>
                      <p className="px-4 py-1 font-semibold text-lg text-neutral-800">
                        {product.quantity}
                      </p>
                      <button
                        className="px-4 py-1 bg-slate-200 text-neutral-500 font-semibold text-lg rounded-r-md hover:scale-[1.05]"
                        onClick={() => handleQuantityIncrement(product.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="self-start text-neutral-50 rounded"
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    <IonIcon
                      icon={icon}
                      onMouseEnter={() => setIcon(trash)}
                      onMouseLeave={() => setIcon(trashOutline)}
                      className=" text-red-600 text-xl"
                    />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-2xl font-semibold align-middle text-center p-7 text-neutral-700">
                Your bag is empty
              </p>
            )}
          </div>
        </div>
        <div className="mt-2 p-3">
          <div className="flex flex-col bg-neutral-50 text-neutral-800 outline outline-1 outline-neutral-200 p-3 rounded-md">
            <div className="flex justify-between pb-3 border-b-2 border-neutral-400">
              <div>
                <p className=" text-base font-normal">Order value</p>
                <p className=" text-base font-normal">Delivery charges</p>
              </div>
              <div>
                <p className=" text-base font-normal">Rs. {orderValue}</p>
                <p className=" text-base font-normal">
                  {deliveryCharge === 0 ? "Free" : `Rs. ${deliveryCharge}`}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center pt-3">
              <p className="text-xl font-medium">Total charges</p>
              <p className="text-xl font-medium">Rs. {totalPrice}</p>
            </div>
            <NavLink
              to="/dashboard/checkout"
              state={{ deliveryCharge, totalPrice }}
              className={`self-center w-3/5 py-2 px-3 mt-3 text-center align-middle text-base text-neutral-50 font-medium rounded ${
                cartProduct.length > 0
                  ? "bg-neutral-700 hover:bg-neutral-800 hover:shadow-lg"
                  : "bg-neutral-500 cursor-default"
              }`}
              onClick={handleNext}
            >
              Checkout
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
