import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

interface ITagsForm {
  chipData: string[];

  setChipData: (state: string[]) => void;
}

const TagsForm = ({ chipData, setChipData }: ITagsForm) => {
  const { t } = useTranslation();

  const [value, setValue] = useState("");

  const handleAddTag = () => {
    if (value.trim() === "") return toast.info(t("tags_form_empty_error"));
    if (chipData.includes(value)) return toast.info(t("error_repeat_tag"));
    setChipData([...chipData, value]);
    setValue("");
  };
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <TextField
        placeholder="Cat, dogs ..."
        label={t("tag")}
        variant="standard"
        fullWidth
        sx={{
          outline: "none",
          "& .MuiFormLabel-root.Mui-focused": {
            color: "text.accent",
          },
        }}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
      />
      <Button
        type="button"
        variant="text"
        sx={{
          backgroundColor: "primary.accent",
          width: "auto",
          fontSize: "10px",
        }}
        onClick={handleAddTag}
      >
        {t("add_tag")}
      </Button>
    </Box>
  );
};

export default TagsForm;
