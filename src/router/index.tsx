import Home from "@/pages/home";
import Markets from "@/pages/markets";
import Orders from "@/pages/orders";
import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/markets",
    element: <Markets />,
  },
  {
    path: "/orders/:marketId",
    element: <Orders />,
  },
]);