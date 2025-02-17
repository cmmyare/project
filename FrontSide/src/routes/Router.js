import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import Loadable from "../layouts/full/shared/loadable/Loadable";

/* ***Layouts**** */
import FullLayout from "../layouts/full/FullLayout";

import BlankLayout from "../layouts/blank/BlankLayout";
import HomeLayout from "../views/dashboard/HomeLayout"; // ✅ Added HomeLayout

/* ****Pages***** */
import Dashboard from "../views/dashboard/Dashboard";
//import { Loader as dashbooardLoader } from "../views/dashboard/dashboard/dashboard";
import SamplePage from "../views/sample-page/SamplePage";
import Icons from "../views/icons/Icons";
import TypographyPage from "../views/utilities/TypographyPage";
import Shadow from "../views/utilities/Shadow";
import Error from "../views/authentication/Error";
import Register from "../views/authentication/Register";
import Login from "../views/authentication/Login";
import Landing from "../views/authentication/Landing";

/* actions */
import { action as dashboardAction } from "../views/dashboard/Dashboard";
import { Loader as fullLoader } from "../layouts/full/FullLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />, // ✅ Handles errors at the root level
    children: [
      { index: true, element: <Landing /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "dashboard",
        element: <FullLayout />,
        loader: fullLoader,
        errorElement: <Error />, // ✅ Ensures dashboard errors are handled
        children: [
          {
            index: true,
            element: <Dashboard />,
            action: dashboardAction,
          }, // ✅ Dashboard loads properly now
          { path: "sample-page", element: <SamplePage /> },
          { path: "icons", element: <Icons /> },
          { path: "ui/form", element: <TypographyPage /> },
          { path: "ui/shadow", element: <Shadow /> },
        ],
      },
    ],
  },
]);

export default router;
