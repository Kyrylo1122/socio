import { Box, Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUserContext } from "src/hooks/useUserContext";

type Inputs = {
  comment: string;
};
interface ICommentForm {
  handleClick: (value: string) => void;
}
const CommentForm = ({ handleClick }: ICommentForm) => {
  const {
    user: { $id, imageUrl, defaultCharacter, name },
  } = useUserContext();

  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const value = {
      user: { $id, imageUrl, defaultCharacter, name },
      commentId: Date.now().toString(),
      createdAt: Date.now(),
      updated: false,
      body: data.comment,
    };
    handleClick(JSON.stringify(value));
    reset();
  };
  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <TextField
        autoComplete="off"
        fullWidth
        defaultValue=""
        placeholder="write your comment"
        {...register("comment")}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
};

export default CommentForm;
