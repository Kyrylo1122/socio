import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/joy";

export default function Body() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Outlet />
    </Box>
  );
}
