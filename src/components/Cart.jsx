import { useSelector } from "react-redux";

const Cart = () => {
  const cartProduct = useSelector((state) => state.cartReducer);
  console.log(cartProduct);
  return <></>;
};

export default Cart;
