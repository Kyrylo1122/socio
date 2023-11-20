import { Box } from "@mui/material";
import { useUserContext } from "./context/AuthContext";
import DecorateImage from "./Components/DecorateImage";
import useThemeContext from "./hooks/useThemeContext";
import { Header, Sidebar } from "./Components";
import { Outlet } from "react-router-dom";
import Spinner from "./Components/Spinner";

const App = () => {
  const { isAuthenticated, isLoading } = useUserContext();
  const { mode } = useThemeContext();

  if (isLoading) return <Spinner />;
  return (
    <Box>
      {isAuthenticated ? <Header /> : null}
      <Box sx={{ display: "flex" }}>
        {isAuthenticated ? <Sidebar /> : null}
        <Outlet />
      </Box>
      <DecorateImage mode={mode} />
    </Box>
  );
};

export default App;
