import { Box } from "@mui/material";
import { Header, Body } from "../Components";
import { ThemeProvider, THEME_ID } from "@mui/material/styles";
import useThemeContext from "src/hooks/useThemeContext";
import { AuthContextProvider } from "src/context/AuthContextProvider";

const Root = () => {
  const { theme } = useThemeContext();
  return (
    <ThemeProvider theme={{ [THEME_ID]: theme }}>
      <AuthContextProvider>
        <Box sx={{ width: "100%", backgroundColor: "background.default" }}>
          <Header />
          <Body />
        </Box>
      </AuthContextProvider>
    </ThemeProvider>
  );
};

export default Root;
