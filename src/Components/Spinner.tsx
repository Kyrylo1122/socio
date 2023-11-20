import { Box } from "@mui/material";
import spinner from "/pablita-finance.gif";

export default function Spinner() {
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: "100%",
          transform: "translate(-50%,50%)",
        }}
        component="img"
        src={spinner}
        className="logo react"
        alt="React logo"
      />
    </Box>
  );
}
