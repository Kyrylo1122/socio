import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./routes";

import "./index.css";
import "./assets/styles/styles.scss";
import Home from "./Pages/Home";
import { ThemeContextProvider } from "./hooks/useThemeContext";
import "./i18n";
import Contacts from "./Pages/Contacts";
import SignIn from "./_auth/forms/SignIn";
import SignUp from "./_auth/forms/SignUp";

import MainLayout from "./MainLayout";
import { ContactPage } from "./Components/ContactPage";
import Saves from "./Pages/Saves";
import Chat from "./Pages/Chat";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },

      {
        path: "/contacts",
        element: <Contacts />,
      },
      {
        path: "/:id",
        element: (
          <>
            <ContactPage />
          </>
        ),
      },
      {
        path: "/saves",
        element: <Saves />,
      },

      {
        path: "/chats",
        element: <Chat />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <RouterProvider router={router} />
    </ThemeContextProvider>
  </React.StrictMode>
);
