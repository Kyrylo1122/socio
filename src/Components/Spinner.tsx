import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

export default function Spinner() {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
}
