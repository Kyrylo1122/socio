import { Path, UseFormRegister } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";
import { IFormNames } from "src/types";

type InputProps = {
  validation?: any;
  name: Path<IFormNames>;
  register: UseFormRegister<IFormNames>;
};
type InputType = TextFieldProps & InputProps;

export const Input = ({ register, validation, name, ...rest }: InputType) => {
  return (
    <TextField
      margin="normal"
      variant="outlined"
      fullWidth
      autoFocus
      sx={{
        "& .MuiFormLabel-root.Mui-focused": { color: "text.primary" },
        "& .-internal-autofill-selected": {
          bgcolor: "none",
        },
      }}
      {...register(name, { required: true, ...validation })}
      {...rest}
    />
  );
};
