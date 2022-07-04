import { Box, Link } from "@mui/material";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import RoomIcon from "@mui/icons-material/Room";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import RedeemIcon from "@mui/icons-material/Redeem";
import FeedIcon from "@mui/icons-material/Feed";
import BoxAddress from "../BoxAddress";
import BoxSuport from "../BoxSuport";
import { useContext } from "react";
import { BlurContext } from "component/Header";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import { ThemeContext } from "context/ThemeContext";

const listLinkHeaderTop = [
  {
    link: "/",
    name: "Địa chỉ cửa hàng",
    nickName: "address",
    icon: <RoomIcon />,
  },
  {
    link: "#",
    name: "Hỗ trợ trực tuyến",
    nickName: "support",
    icon: <LocalPhoneIcon />,
  },
  {
    link: "/tin-tuc/danh-muc/tin-khuyen-mai-sd9jdw.html",
    name: "Khuyến mãi",
    nickName: "gift",
    icon: <RedeemIcon />,
  },
  {
    link: "/tin-tuc",
    name: "Tin tức",
    nickName: "news",
    icon: <FeedIcon />,
  },
];

const useStyles = makeStyles((theme) => ({
  bgBranding: {
    backgroundColor: theme.headerTop.background,
  },
  colorWhite: {
    color: "#fff",
  },
  fillBackground: {
    background: "rgba(0, 0, 0, 0.5)",
  },
}));

function HeaderTop() {
  const classes = useStyles();
  const context = useContext(BlurContext);
  const contextTheme = useContext(ThemeContext);
  const { theme, toggleTheme } = contextTheme;
  return (
    <Box
      className={`header-top ${classes.bgBranding}`}
      component={"div"}
      position="relative"
    >
      <Box className="wrap-label">
        <Box className="wrap-ct">
          <Box className="header-top-left">
            {listLinkHeaderTop.map((item, index) => (
              <Box
                className="item"
                key={index}
                onMouseEnter={(e) =>
                  (item.nickName === "address" ||
                    item.nickName === "support") &&
                  context.handleMouseEnter("hoverSupport")
                }
                onMouseLeave={(e) => context.handleMouseLeave(e)}
              >
                <Link
                  component={NavLink}
                  to={item.link}
                  // className="btn-h bg-radien"
                  className={
                    item.nickName === "address"
                      ? "btn-h bg-radien"
                      : item.nickName === "support"
                      ? "btn-h bg-radien"
                      : "btn-h"
                  }
                >
                  <span className="icon-v21">{item.icon}</span>
                  <span className="text">{item.name}</span>
                </Link>
                {item.nickName === "address" && <BoxAddress />}
                {item.nickName === "support" && <BoxSuport />}
              </Box>
            ))}
          </Box>
          <Box className="header-top-right">
            <Box
              onClick={toggleTheme}
              className="icon-theme"
              sx={{ color: "#fff" }}
            >
              {theme === "light" ? (
                <LightModeIcon fontSize="small" />
              ) : (
                <NightlightRoundIcon fontSize="small" />
              )}
            </Box>
            <Box className="acc">
              <Link
                to="/dang-ky"
                component={NavLink}
                className={classes.colorWhite}
              >
                Đăng ký{" "}
                <Box component={"span"} padding="0 12px">
                  |
                </Box>
              </Link>
              <Link
                to="/dang-nhap"
                component={NavLink}
                className={classes.colorWhite}
              >
                Đăng nhập
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default HeaderTop;
