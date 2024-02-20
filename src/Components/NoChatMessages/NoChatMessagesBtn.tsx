import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const styleBtn = {
  dialog: {
    "font-size": "0.7rem",
    padding: "5px",
    "text-transform": "none",
    "line-height": "1.1",
  },
  chat: {
    "line-height": "1.1",
    "font-size": { xs: "0.6rem", sm: "0.75rem" },
    padding: { md: "16px 16px" },
  },
};

const NoChatMessagesBtn = ({
  isDialog = false,
  name,
  setDefaultInputValue,
}: {
  isDialog?: boolean;
  setDefaultInputValue: (value: string) => void;
  name: string;
}) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: "flex", gap: { xs: 1, sm: 2, md: 3 } }}>
      <Button
        sx={isDialog ? styleBtn.dialog : styleBtn.chat}
        variant="contained"
        onClick={() => setDefaultInputValue(t("hi_name", { name }))}
      >
        {t("hi_name", { name })}
      </Button>
      <Button
        sx={isDialog ? styleBtn.dialog : styleBtn.chat}
        variant="contained"
        onClick={() => setDefaultInputValue(t("what's_up", { name }))}
      >
        {t("what's_up", { name })}
      </Button>
      <Button
        sx={isDialog ? styleBtn.dialog : styleBtn.chat}
        variant="contained"
        defaultValue={t("yo")}
        onClick={() => setDefaultInputValue(t("yo"))}
      >
        {t("yo")}
      </Button>
    </Box>
  );
};

export default NoChatMessagesBtn;
