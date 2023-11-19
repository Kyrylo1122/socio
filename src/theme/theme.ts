import { PaletteMode } from "@mui/material";

export const getDesignTokens = (mode: PaletteMode) => {
  return {
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: {
              main: "#fff",
              light: "ff0",
              accent: "#ff5252",
            },
            secondary: {
              main: "#ff5252",
              light: "#989193",
            },
            background: {
              default: "#fff",
              paper: "#efefef ",
              translucent: "rgba(255, 255, 255, 0.15)",
            },
            text: {
              primary: "#525252",
              light: "#242424",
              white: "#fff",
              grey: "#989193",
              accent: "#ff5252",
            },
          }
        : {
            primary: {
              main: "#242424",
              light: "#fff",
              dark: "#000",
              accent: "#f9aa33",
            },
            secondary: {
              main: "#f9aa33",
              light: "#989193",
            },
            background: {
              default: "#222",
              paper: "#333  ",
              translucent: "rgba(34, 34, 34, 0.15)",
            },
            text: {
              light: "#fff",
              accent: "#f9aa33",
              white: "#fff",
            },
          }),
    },
  };
};
