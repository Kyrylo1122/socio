import { Button, TextField, TextFieldProps } from "@mui/material";
import { Path, UseFormRegister } from "react-hook-form";

export interface IFormValues {
  name: string;
  surname: string;
  email: string;
  password: string;
}

type InputProps = {
  name: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
};
type InputType = TextFieldProps & InputProps;

export const Input = ({ register, name, ...rest }: InputType) => {
  return (
    <TextField
      margin="normal"
      variant="outlined"
      fullWidth
      autoFocus
      sx={{ "& .MuiFormLabel-root.Mui-focused": { color: "text.primary" } }}
      {...register(name, { required: true })}
      {...rest}
    />
  );
};

interface IFormBtn {
  type: "submit" | "button";
  children: string;
}

export const FormButton = ({ type, children }: IFormBtn) => (
  <Button
    type={type}
    fullWidth
    variant="contained"
    sx={{
      mt: 3,
      mb: 2,
      "&:hover": {
        backgroundColor: "text.accent",
        color: "text.white",
      },
    }}
  >
    {children}
  </Button>
);
