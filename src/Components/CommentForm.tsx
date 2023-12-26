import { Box, Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  body: string;
};
interface ICommentForm {
  handleClick: (value: Inputs) => void;
}
const CommentForm = ({ handleClick }: ICommentForm) => {
  const { register, handleSubmit, reset } = useForm<Inputs>();

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
        placeholder="write your comment"
        {...register("body")}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
};

export default CommentForm;
