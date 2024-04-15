import LoginPage from "../components/LoginPage";
import Dashboard from "../components/Dashboard";

const routes = [
  {
    path: "/",
    name: "Login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    element: <Dashboard />,
  },
];

export default routes;
