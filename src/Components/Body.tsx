import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/joy";
import { useUserContext } from "src/context/AuthContext";

export default function Body() {
  const user = useUserContext();

  return (
    <Box sx={{ display: "flex" }}>
      {user.isAuthenticated ? <Sidebar /> : null}

      <Outlet />
    </Box>
  );
}
