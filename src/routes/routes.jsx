import { lazy } from "react";
import LoginPage from "../components/LoginPage";
const LazyDashBoard = lazy(() => delayRoute(import("../components/Dashboard")));
import Home from "../components/Home";
import Profile from "../components/Profile";
import ProductDetail from "../components/ProductDetail";
import Cart from "../components/Cart";
import Checkout from "../components/Checkout";

const routes = [
  {
    path: "/",
    name: "Login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    element: <LazyDashBoard />,
    children: [
      { path: "home", name: "Home", element: <Home />, index: true },
      { path: "profile", name: "Profile", element: <Profile /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "cart", name: "Cart", element: <Cart /> },
      { path: "checkout", name: "Checkout", element: <Checkout /> },
    ],
  },
];

export default routes;

function delayRoute(promise) {
  return new Promise((resolve) => {
    setTimeout(resolve, 3500);
  }).then(() => promise);
}
