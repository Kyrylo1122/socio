import { Box } from "@mui/material";
import { useUserContext } from "./context/AuthContext";
import DecorateImage from "./Components/DecorateImage";
import useThemeContext from "./hooks/useThemeContext";
import { Header } from "./Components";
import Spinner from "./Components/Spinner";
import Body from "./Components/Body";

const App = () => {
  const { isAuthenticated, isLoading } = useUserContext();
  const { mode } = useThemeContext();

  if (isLoading) return <Spinner />;
  return (
    <Box>
      {isAuthenticated ? (
        <Box>
          <Header />
        </Box>
      ) : null}
      <Body />
      <DecorateImage mode={mode} />
    </Box>
  );
};

export default App;
