import { Box, Typography } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import layingImage from "/LayingDoodleYYY.png";

interface ILogo {
  sx?: SxProps<Theme>;
}

const Logo = ({ sx = [] }: ILogo) => {
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
      }}
    >
      {" "}
      <Typography
        variant="h2"
        sx={{ fontFamily: `Kablammo`, color: "#f9aa33" }}
      >
        SOCIO
      </Typography>{" "}
      <Box
        component="img"
        src={layingImage}
        alt="logo"
        sx={[
          { width: { xs: 75, sm: 100, md: 150 } },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      />
    </Box>
  );
};
export default Logo;
