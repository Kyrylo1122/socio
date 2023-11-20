import { CircularProgress } from "@mui/material";
import { Box } from "@mui/material";

export default function Spinner() {
  return (
    <Box sx={{ display: "flex", color: "black", width: "300px" }}>
      <CircularProgress size="500px" color="secondary" />
      <CircularProgress size="500px" color="primary" />
      <CircularProgress size="500px" color="inherit" />
      <CircularProgress size="500px" color="secondary" />
      <CircularProgress size="500px" color="primary" />
      <CircularProgress size="500px" color="inherit" />
    </Box>
  );
}
