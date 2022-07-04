import { responsiveFontSizes } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import commonSettings2 from "./global.js";

const lightTheme = {
  colorBrandingLight: "#155aa4",
  colorBrandingLight2: "#2772c3",
  filterIcon: "none",
  color: "#253449",
  gold: "#F8CC82",
  gray: "#A3A3A3",
  colorTextBranding: "#155aa4",
  colorLight: "#fff",
  blueish_gray: "#768299",
  textHighlightColor: "#3BA04B", // "#F4D092",
  backgroundColor: "#fff",
  backgroundColor2: "#ebebeb",
  // background:
  // "radial-gradient(circle at 25% 0%, rgba(227,255,240,.5), rgba(227,255,240,0) 50%), radial-gradient(circle at 80% 80%, rgba(131,165,203,.5), rgba(131,165,203,0) 50%)",
  backgroundGradient: "linear-gradient(100deg, #ff6700 0%, #ffb300 100%);",
  paperBg: "#FFFFFF",
  modalBg: "#FAFAFAEF",
  popoverBg: "rgba(255, 255, 255, 0.95)",
  menuBg: "rgba(255, 255, 255, 0.5)",
  backdropBg: "rgba(200, 200, 200, 0.4)",
  largeTextColor: "#08971e",
  activeLinkColor: "#222222",
  activeLinkSvgColor:
    "invert(64%) sepia(11%) saturate(934%) hue-rotate(157deg) brightness(90%) contrast(86%)",
  // primaryButtonBG: "#08971e",
  primaryButtonBG: "#3BA04B",
  primaryButtonHoverBG: "#08971e",
  // these need fixing
  primaryButtonHoverColor: "#FCFCFC",
  secondaryButtonHoverBG: "rgba(54, 56, 64, 1)",
  outlinedPrimaryButtonHoverBG: "#F8CC82",
  outlinedPrimaryButtonHoverColor: "#FCFCFC",
  outlinedSecondaryButtonHoverBG: "#FCFCFC",
  outlinedSecondaryButtonHoverColor: "#FCFCFC",
  containedSecondaryButtonHoverBG: "#FCFCFC33",
  graphStrokeColor: "rgba(37, 52, 73, .2)",
  colorBorderLine: "#c1c1c1",
};

export const light = responsiveFontSizes(
  createTheme(
    commonSettings2,
    {
      palette: {
        primary: {
          main: lightTheme.colorBrandingLight,
          paper: lightTheme.paperBg,
        },
        secondary: {
          main: lightTheme.colorBrandingLight2,
        },
      },
      colorText: {
        primary: lightTheme.color,
        secondary: lightTheme.colorLight,
        branding: lightTheme.colorTextBranding,
        changeColorBrand: lightTheme.colorBrandingLight,
      },
      backgroundColor: {
        primary: lightTheme.backgroundColor,
        secondary: lightTheme.backgroundColor2,
        gradient: lightTheme.backgroundGradient,
        blackWhite: lightTheme.colorLight,
        blackWhite2: lightTheme.colorLight,
        footerBot: lightTheme.colorBrandingLight,
        changeBgBrand2: lightTheme.colorBrandingLight2,
        gradientMore: "linear-gradient(rgba(255, 255, 255, 0), white)",
        customPd: "none",
        search: "#fff",
      },
      border: {
        main: `solid 1px ${lightTheme.colorBorderLine}`,
        borderIp: "#c1c1c1",
      },
      iconNav: {
        main: lightTheme.filterIcon,
      },
      header: {
        background: "#2772c3",
      },
      headerTop: {
        background: "#155aa4",
      },
      boxShadow: {
        main: "0 0 9px 1px #b7b7b7",
      },
    },
    {
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              fontSize: "14px",
              backgroundColor: "#f1f1f1",
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
        MuiTypography: {
          styleOverrides: {
            root: {
              color: lightTheme.color,
            },
          },
        },
      },
    }
  )
);
