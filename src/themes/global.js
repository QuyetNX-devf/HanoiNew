import { createTheme } from "@mui/material";
import FontFace from "./fonts";
let theme = createTheme();

const breakpointValues = {
  xs: 0,
  sm: 596,
  md: 769,
  mmd: 1025,
  lg: 1201,
  xl: 1441,
  xxl: 1651,
};

const commonSettings = {
  breakpoints: { values: breakpointValues },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        FontFace,
        "*": {
          boxSizing: "border-box",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#222",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        sizeSmall: {
          // fontSize: "17px !important",
          // [theme.breakpoints.down("md")]: {
          //   fontSize: "14px !important",
          // },
        },
      },
    },
  },
  direction: "ltr",
  typography: {
    fontSize: 16,
    h1: {
      fontSize: "1.5rem",
      color: "green",
      fontWeight: "700",
    },
    h2: {
      fontSize: "2.3rem",
      fontWeight: 600,
      letterSpacing: "1.3px",
    },
    h3: {
      fontSize: "1.75rem",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: "500",
    },
    h5: {
      fontSize: "20px",
      letterSpacing: "0.4px",
      fontWeight: "500",
    },
    h6: {
      lineHeight: "1.3",
      fontSize: "16px",
      "@media (min-width:1025px)": {
        fontSize: "18px",
      },
    },
    h7: {
      fontSize: "14px",
      fontWeight: "500",
    },
    body1: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 1,
    },
    button: {
      textTransform: "none",
      fontSize: "1.25rem",
    },
  },
};

export default commonSettings;
