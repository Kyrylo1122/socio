import { Body, Header } from "./Components";
import {
  ThemeProvider,
  THEME_ID,
  CssBaseline,
  Box,
  CardMedia,
} from "@mui/material";
import useThemeContext from "./hooks/useThemeContext";
import QueryProvider from "./lib/react-query/QueryProvider";
import { AuthContextProvider } from "./context/AuthContextProvider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ModeType } from "./types";

const DecorateImage = ({ mode }: { mode: ModeType }) => (
  <Box
    sx={{
      position: "fixed",
      bottom: 0,
      right: 0,
      width: 100,
    }}
  >
    <CardMedia
      component="img"
      image={
        mode === "light" ? "/GroovySittingDoodle.png" : "/LayingDoodle.png"
      }
    />
  </Box>
);

const MainLayout = () => {
  const { theme, mode } = useThemeContext();

  return (
    <>
      <ToastContainer />
      <AuthContextProvider>
        <ThemeProvider theme={{ [THEME_ID]: theme }}>
          <CssBaseline />
          <QueryProvider>
            {/* <Header /> */}
            <Body />
            <DecorateImage mode={mode} />
          </QueryProvider>
        </ThemeProvider>
      </AuthContextProvider>
    </>
  );
};

export default MainLayout;
