import { Box, InputLabel, MenuItem, FormControl } from "@mui/material";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useTranslation } from "react-i18next";
import useThemeContext from "src/hooks/useThemeContext";

export default function LanguageSelect() {
  const { mode } = useThemeContext();
  const { i18n, t } = useTranslation();
  const handleChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel
          id="demo-simple-select-label"
          sx={{
            color: "text.accent",
            backgroundColor:
              mode === "light" ? "background.default" : "transparent",
            paddingLeft: 1,
            pr: 1,
            "&.Mui-focused": { color: "text.accent" },
          }}
        >
          {t("language")}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={i18n.resolvedLanguage}
          onChange={handleChange}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="ua">Українська</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
