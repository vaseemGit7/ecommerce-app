import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartProduct = useSelector((state) => state.cartReducer);
  const [orderValue, setOrderValue] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(30);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculateOrderValue = () => {
      const value = cartProduct.reduce(
        (acc, product) => acc + product.price,
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

  console.log(cartProduct);
  return (
    <div className="mx-28">
      <div className="grid grid-cols-[3fr_2fr] ">
        <div className="flex flex-col p-4 gap-3">
          <div>
            <p className="text-2xl font-bold"> Shopping bag</p>
            <p className="text-base font-medium">
              {cartProduct.length} {cartProduct.length > 1 ? "items" : "item"}{" "}
              in your bag
            </p>
          </div>
          <div className="flex flex-col bg-slate-100 p-3  rounded-md">
            {cartProduct.length > 0 ? (
              cartProduct.map((product) => (
                <div
                  key={product.name}
                  className="grid grid-cols-[1fr_4fr] py-4 gap-3 border-b-2 border-neutral-300"
                >
                  <img className="rounded-md" src={product.image} />
                  <div className="text-neutral-800">
                    <p className="font-semibold">{product.name}</p>
                    <p className="font-medium">₹ {product.price}</p>
                  </div>
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
          <div className="flex flex-col bg-slate-100 p-3 rounded-md">
            <div className="flex justify-between pb-3 border-b-2 border-neutral-500">
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
            <button className="py-2 px-3 self-center w-3/5 mt-3 text-center align-middle bg-neutral-800 text-base text-neutral-50 font-normal rounded hover:drop-shadow-lg">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
