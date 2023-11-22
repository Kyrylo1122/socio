import { Box } from "@mui/material";
import spinner from "/pablita-finance.gif";

export default function Spinner() {
  return (
    <Box sx={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Box component="img" src={spinner} alt="React logo" />
      </Box>
    </Box>
  );
}
