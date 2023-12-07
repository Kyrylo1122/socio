import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useUserContext } from "src/hooks/useUserContext";

const Body = () => {
  const { isAuthenticated, user } = useUserContext();
  console.log("isAuthenticated: ", isAuthenticated);
  console.log("user: ", user);

  return (
    <Box sx={{ display: "flex", mt: 11 }}>
      {isAuthenticated ? (
        <Box sx={{ flex: 1, display: { xs: "none", sm: "block" } }}>
          <Sidebar />
        </Box>
      ) : null}
      <Box sx={{ flex: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
export default Body;
