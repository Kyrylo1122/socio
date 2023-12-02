import { Box } from "@mui/material";
import DecorateImage from "./Components/DecorateImage";
import useThemeContext from "./hooks/useThemeContext";
import { Header } from "./Components";
import Spinner from "./Components/Spinner";
import Body from "./Components/Body";
import { useUserContext } from "./hooks/useUserContext";

const App = () => {
  const { isAuthenticated, isLoading } = useUserContext();
  const { mode } = useThemeContext();

  if (isLoading) return <Spinner />;
  return (
    <Box sx={{ position: "relative" }}>
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
