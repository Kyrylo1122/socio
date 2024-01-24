import { Navigation } from "../Components";
import { Box } from "@mui/material";

const Sidebar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "fixed",
        width: "25%",
        backgroundColor: "background.default",
      }}
    >
      <Navigation />
    </Box>
  );
};

export default Sidebar;
