import { Box, Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

type Inputs = {
  value: string;
};
interface ICommentForm {
  handleClick: (value: Inputs) => void;
  isComment: boolean;
}
const SimpleInputForm = ({ handleClick, isComment }: ICommentForm) => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleClick(data);
    reset();
  };
  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <TextField
        autoComplete="off"
        fullWidth
        defaultValue=""
        placeholder={t(isComment ? "write_comment" : "write_message")}
        {...register("value")}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
};

export default SimpleInputForm;
