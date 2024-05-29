import { useSelector } from "react-redux";

const Cart = () => {
  const cartProduct = useSelector((state) => state.cartReducer);
  console.log(cartProduct);
  return (
    <div className="grid items-start justify-center mx-28">
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
              <p>Your bag is empty</p>
            )}
          </div>
        </div>
        <div className="border-2 border-green-500"></div>
      </div>
    </div>
  );
};

export default Cart;
