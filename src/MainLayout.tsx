import { ThemeProvider, THEME_ID, CssBaseline } from "@mui/material";
import useThemeContext from "./hooks/useThemeContext";
import QueryProvider from "./lib/react-query/QueryProvider";
import { AuthContextProvider } from "./context/AuthContextProvider";
import { ToastContainer } from "react-toastify";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
  const { theme } = useThemeContext();

  return (
    <>
      <ToastContainer />
      <AuthContextProvider>
        <ThemeProvider theme={{ [THEME_ID]: theme }}>
          <CssBaseline />
          <QueryProvider>
            <App />
          </QueryProvider>
        </ThemeProvider>
      </AuthContextProvider>
    </>
  );
};

export default MainLayout;
