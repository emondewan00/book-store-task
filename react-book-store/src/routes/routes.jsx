import { createBrowserRouter } from "react-router-dom";
import App from "../pages/App";
import Layout from "./Layout";
import Wishlist from "../pages/Wishlist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <App /> },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
    ],
  },
]);

export default router;
