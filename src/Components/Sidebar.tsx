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
        width: { xs: "25%", md: "20%" },
        backgroundColor: "background.default",
      }}
    >
      <Navigation />
    </Box>
  );
};

export default Sidebar;
