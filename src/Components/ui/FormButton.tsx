import { Button, SxProps, Theme } from "@mui/material";

interface IFormBtn {
  type: "submit" | "button";
  children: string;
  sx?: SxProps<Theme>;
}
const style = {
  mt: 3,
  mb: 2,
  "&:hover": {
    backgroundColor: "text.accent",
    color: "text.white",
  },
};
export const FormButton = ({ sx, type, children }: IFormBtn) => (
  <Button
    type={type}
    fullWidth
    variant="contained"
    sx={[style, ...(Array.isArray(sx) ? sx : [sx])]}
  >
    {children}
  </Button>
);
