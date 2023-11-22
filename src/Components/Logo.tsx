import { Box, Typography } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import layingImage from "/LayingDoodleYYY.png";

interface ILogo {
  sx?: SxProps<Theme>;
}
const style = { fontFamily: `Kablammo`, color: "#f9aa33" };

const Logo = ({ sx = [] }: ILogo) => {
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
      }}
    >
      {" "}
      <Typography variant="h2" sx={[style, ...(Array.isArray(sx) ? sx : [sx])]}>
        SOCIO
      </Typography>{" "}
      <Box component="img" src={layingImage} alt="logo" width={150} />
    </Box>
  );
};
export default Logo;
