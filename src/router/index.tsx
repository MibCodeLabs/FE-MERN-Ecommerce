import { createBrowserRouter } from "react-router-dom";

import NotFoundPage from "../pages/NotFoundPage";
import { customerRoutes } from "./customerRoutes";
import { shopRoutes } from "./shopRoutes";
import { staffRoutes } from "./staffRoutes";


export const router = createBrowserRouter([
  ...customerRoutes,
  ...shopRoutes,
  ...staffRoutes,
  {
    path: "*",
    element: <NotFoundPage />,
  },

]);
