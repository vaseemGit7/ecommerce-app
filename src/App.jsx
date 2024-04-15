import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/routes";

const App = () => {
  const route = createBrowserRouter(routes);

  return (
    <>
      <RouterProvider router={route}></RouterProvider>
    </>
  );
};

export default App;
