import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Router"; // Import the fixed router
import { ToastContainer } from "react-toastify";
import "./index.css";
// Create a Material-UI theme
const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Suspense>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures consistent MUI styling */}
      <ToastContainer position="top-center" autoClose={5000} />
      <RouterProvider router={router} />
    </ThemeProvider>
  </Suspense>
);
