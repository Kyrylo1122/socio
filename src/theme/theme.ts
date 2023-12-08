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
              grey: "#989193",
              white: "#fff",
              contrast: "#000",
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
              grey: "#ccc",
              white: "#fff",
              contrast: "#fff",
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
    typography: {
      fontFamily: [
        "Roboto",
        "Helvetica",
        "Arial",
        "Kablammo",
        "sans-serif",
        "Tourney",
      ].join(","),
      h2: {
        fontSize: "1rem",
        "@media (min-width:500px)": {
          fontSize: "1.5rem",
        },
        "@media (min-width:600px)": {
          fontSize: "2rem",
        },
        "@media (min-width:900px)": {
          fontSize: "2.5rem",
        },
      },
    },
    components: {
      MuiAvatar: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            backgroundColor: mode === "light" ? "#ff5252" : "#f9aa33",
          },
        },
      },
    },
  };
};
