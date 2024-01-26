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
        pt: 11,
      }}
    >
      {user.uid ? (
        <Box sx={{ flex: 1, display: { xs: "none", sm: "block" } }}>
          <Sidebar />
        </Box>
      ) : null}
      <Box sx={{ flex: 3, bgcolor: "background.default" }}>
        <Outlet />
      </Box>
    </Box>
  );
};
export default Main;
