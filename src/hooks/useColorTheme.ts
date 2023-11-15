import { createTheme } from "@mui/material";
import { useMemo, useState } from "react";
import { getDesignTokens } from "src/theme/theme";

const useColorTheme = () => {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const toggleColorMode = () =>
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));

  const modifiedTheme = useMemo(
    () => createTheme(getDesignTokens(mode)),
    [mode]
  );

  return { mode, toggleColorMode, theme: modifiedTheme };
};

export default useColorTheme;
