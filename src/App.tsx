import { Box } from "@mui/material";
import DecorateImage from "./Components/DecorateImage";
import useThemeContext from "./hooks/useThemeContext";
import { Header } from "./Components";
import Body from "./Components/Body";
import { useUserContext } from "./hooks/useUserContext";

const App = () => {
  const { user } = useUserContext();
  const { mode } = useThemeContext();

  return (
    <Box sx={{ position: "relative" }}>
      {user ? (
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
