import { Box, CardMedia } from "@mui/material";
import { ModeType } from "src/types";

const DecorateImage = ({ mode }: { mode: ModeType }) => (
  <Box
    sx={{
      position: "fixed",
      bottom: 0,
      right: 0,
      width: 100,
    }}
  >
    <CardMedia
      component="img"
      image={
        mode === "light" ? "/GroovySittingDoodle.png" : "/LayingDoodle.png"
      }
    />
  </Box>
);
export default DecorateImage;
