import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useContext } from "react";
import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import HeaderBot from "./components/HeaderBot";
import HeaderCenter from "./components/HeaderCenter";
import HeaderTop from "./components/HeaderTop";
import "./styles.scss";

const useStyles = makeStyles((theme) => ({
  bgBranding: {
    backgroundColor: theme.palette.primary.main,
  },
  colorWhite: {
    color: "#fff",
  },
  fillBackground: {
    background: "rgba(0, 0, 0, 0.5)",
  },
}));
export const BlurContext = createContext();
export default function Header() {
  const classes = useStyles();
  const location = useLocation();
  const keyPage = location.key;
  const [hoverEnter, setHoverEnter] = useState(false);

  useEffect(() => {
    setHoverEnter(false);
  }, [keyPage]);

  const handleMouseEnter = (e) => {
    setHoverEnter(e);
  };
  const handleMouseLeave = (e) => {
    setHoverEnter(false);
  };
  const value = {
    hoverEnter,
    handleMouseEnter,
    handleMouseLeave,
  };
  return (
    <>
      <BlurContext.Provider value={value}>
        <Box className="header">
          <Box
            className={`fill-background ${classes.fillBackground} ${
              hoverEnter === "hoverSupport"
                ? "active"
                : hoverEnter === "hoverCategory"
                ? "activeCategory"
                : ""
            }`}
          ></Box>
          <HeaderTop />
          <HeaderCenter />
          <HeaderBot />
        </Box>
      </BlurContext.Provider>
    </>
  );
}
