import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage, Root } from "./routes";

import { ThemeProvider, THEME_ID, createTheme } from "@mui/material/styles";

import "./index.css";
import "./assets/styles/styles.scss";
import Home from "./Pages/Home";

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#00423a",
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#E0C2FF",
      light: "#F5EBFF",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#47008F",
    },
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contacts",
        element: <>Contacts</>,
      },
      {
        path: "/events",
        element: <>Events</>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={{ [THEME_ID]: theme }}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
