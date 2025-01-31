import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import routes from "./routes/routes";
import Loading from "./components/Loading";
import { ToastContainer } from "react-toastify";

const App = () => {
  const route = createBrowserRouter(routes);

  return (
    <>
      <ToastContainer />
      <Suspense fallback={<Loading />}>
        <RouterProvider router={route}></RouterProvider>
      </Suspense>
    </>
  );
};

export default App;
