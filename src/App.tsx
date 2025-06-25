import { ErrorPage, HomeLayout, MainPage } from "./Pages";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { store } from "./utilities/redux";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
    ],
  },
]);

export const App = () => {
  return (
    <Provider store={store}>
      <ToastContainer position="bottom-right" />
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
};
