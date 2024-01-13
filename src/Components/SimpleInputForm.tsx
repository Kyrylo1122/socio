import { Box, Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import SendIcon from "@mui/icons-material/Send";

type Inputs = {
  value: string;
};
interface ICommentForm {
  handleClick: (value: Inputs) => void;
  isComment: boolean;
  defaultValue?: string;
}
const SimpleInputForm = ({
  handleClick,
  isComment,
  defaultValue = "",
}: ICommentForm) => {
  const { register, handleSubmit, reset } = useForm<Inputs>({
    values: { value: defaultValue },
  });
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleClick(data);
    reset();
  };
  return (
    <Box
      component="form"
      sx={{ display: "flex", gap: 1 }}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        autoComplete="off"
        fullWidth
        placeholder={t(
          isComment ? "write_comment_placeholder" : "write_message_placeholder"
        )}
        {...register("value")}
      />
      <Button type="submit" variant="contained">
        {t("submit")}
        <SendIcon />
      </Button>
    </Box>
  );
};

export default SimpleInputForm;
