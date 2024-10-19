import { createBrowserRouter } from "react-router-dom";
import App from "../pages/App";
import Layout from "./Layout";
import Wishlist from "../pages/Wishlist";
import Book from "../pages/Book";

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
      {
        path: "/book/:bookId",
        element: <Book />,
      },
    ],
  },
]);

export default router;
