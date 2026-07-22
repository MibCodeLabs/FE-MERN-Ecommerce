import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import CustomerLayout from "../layouts/customer/CustomerLayout";
import StaffLayout from "../layouts/staff/StaffLayout";
import ShopLayout from "../layouts/shop/ShopLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerLayout />,
    children: [
      {
        index: true,    
        element: <HomePage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "/staff",
    element: <StaffLayout />,
    children: [
      {
        index: true,    
        element: <HomePage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "/shop",
    element: <ShopLayout />,
    children: [
      {
        index: true,    
        element: <HomePage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
