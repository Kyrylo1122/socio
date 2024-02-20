import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useUserContext } from "src/hooks/useUserContext";

const Main = () => {
  const { user } = useUserContext();

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        overflow: "auto",
        height: "100%",
        pt: user.uid ? { xs: 15, sm: 20, tb: 11 } : 4,
        pb: 12,
      }}
    >
      {user.uid ? (
        <Box
          sx={{
            position: "relative",
            flex: 1,
            display: { xs: "none", tb: "block" },
          }}
        >
          <Sidebar />
        </Box>
      ) : null}
      <Box
        sx={{
          flex: { xs: 1, sm: 3, md: 4 },
          bgcolor: "background.default",
          width: { xs: 280 },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
export default Main;
