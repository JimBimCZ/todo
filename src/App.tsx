import { ErrorPage, MainPage } from "./Pages";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
]);

export const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
