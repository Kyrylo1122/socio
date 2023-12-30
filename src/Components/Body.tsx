import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useUserContext } from "src/hooks/useUserContext";
import Spinner from "./Spinner";

const Body = () => {
  const userContext = useUserContext();
  if (!userContext) return <Spinner />;
  const { user } = userContext;

  return (
    <Box sx={{ display: "flex", pt: 11 }}>
      {user ? (
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
