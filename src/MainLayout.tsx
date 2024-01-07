import { ThemeProvider, THEME_ID, CssBaseline } from "@mui/material";
import useThemeContext from "./hooks/useThemeContext";
import QueryProvider from "./lib/react-query/QueryProvider";
import { AuthContextProvider } from "./context/AuthContextProvider";
import { ToastContainer } from "react-toastify";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import { ChatContextProvider } from "./context/ChatContext/ChatContextProvider";
import { MessagesContextProvider } from "./context/MessagesContext/MessagesContextProvider";

const MainLayout = () => {
  const { theme } = useThemeContext();

  return (
    <>
      <ToastContainer />
      <QueryProvider>
        <AuthContextProvider>
          <ChatContextProvider>
            <MessagesContextProvider>
              <ThemeProvider theme={{ [THEME_ID]: theme }}>
                <CssBaseline />
                <App />
              </ThemeProvider>
            </MessagesContextProvider>
          </ChatContextProvider>
        </AuthContextProvider>
      </QueryProvider>
    </>
  );
};

export default MainLayout;
