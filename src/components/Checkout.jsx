import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const { deliveryCharge, totalPrice } = location.state;
  return (
    <div className="mx-28">
      <div className="grid grid-cols-[3fr_2fr] ">
        <div className="flex flex-col p-4 gap-3">
          <div>
            <p className="text-2xl font-bold"> Checkout</p>
          </div>
          <p className="text-lg font-medium">My information</p>
          <p className="text-lg font-medium">Billing address</p>
          <p className="text-lg font-medium">View order details</p>
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
            <button className="py-2 px-3 self-center w-3/5 mt-3 text-center align-middle bg-neutral-800 text-base text-neutral-50 font-normal rounded hover:drop-shadow-lg">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
