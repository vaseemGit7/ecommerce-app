import { lazy, Suspense } from "react";
import LoginPage from "../components/LoginPage";
import Loading from "../components/Loading";
const LazyDashBoard = lazy(() => delayRoute(import("../components/Dashboard")));

const routes = [
  {
    path: "/",
    name: "Login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyDashBoard />
      </Suspense>
    ),
  },
];

export default routes;

function delayRoute(promise) {
  return new Promise((resolve) => {
    setTimeout(resolve, 3500);
  }).then(() => promise);
}
