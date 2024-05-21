import { lazy } from "react";
import LoginPage from "../components/LoginPage";
const LazyDashBoard = lazy(() => delayRoute(import("../components/Dashboard")));
import Home from "../components/Home";
import Profile from "../components/Profile";

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
    ],
  },
];

export default routes;

function delayRoute(promise) {
  return new Promise((resolve) => {
    setTimeout(resolve, 3500);
  }).then(() => promise);
}
