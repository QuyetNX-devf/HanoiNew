import {
  Badge,
  Box,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  SvgIcon,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useLocation } from "react-router-dom";
import { ImgeHeader } from "contants/images";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { AccountCircle } from "@mui/icons-material";
import { useEffect, useState } from "react";
import "./index.scss";
import { makeStyles } from "@mui/styles";
import SearchProduct from "./components/SearchProduct";
import SideBarMenu from "./components/SideBarMenu";

const useStyles = makeStyles((theme) => ({
  headerMb: {
    background: theme.palette.primary.main,
  },
}));
export default function HeaderMobile() {
  const classess = useStyles();
  const [toggleCustomer, setToggleCustomer] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);

  const location = useLocation();
  const keyPage = location.key;
  useEffect(() => {
    setShowSideBar(false);
  }, [keyPage]);

  const handleToggleSearch = () => {
    setShowSearch(!showSearch);
    if (toggleCustomer === true) setToggleCustomer(false);
    if (showSideBar === true) setShowSideBar(false);
  };
  const handleShowPopup = () => {
    setToggleCustomer(!toggleCustomer);
    if (showSearch === true) setShowSearch(false);
    if (showSideBar === true) setShowSideBar(false);
  };
  const handleShowSideBar = () => {
    setShowSideBar(!showSideBar);
    if (showSearch === true) setShowSearch(false);
    if (toggleCustomer === true) setToggleCustomer(false);
  };
  return (
    <Box className={`header-mobile ${classess.headerMb}`}>
      <Box className="wrap-label">
        <Box className="wrap-ct">
          <Box
            className="btn-bar text-white"
            onClick={() => handleShowSideBar()}
          >
            {showSideBar ? <CloseRoundedIcon /> : <MenuIcon />}
          </Box>
          <Box className="logo-mb">
            <Link to="/" component={NavLink}>
              <img src={ImgeHeader.Logo} />
            </Link>
          </Box>
          <Box className="top-right-mb text-white">
            <Box display={"flex"} width={"25px"} className="icon-search">
              {showSearch ? (
                <CloseRoundedIcon onClick={handleToggleSearch} />
              ) : (
                <SearchIcon onClick={handleToggleSearch} />
              )}
            </Box>

            <Link to="/gio-hang" component={NavLink}>
              <Badge
                sx={{ "& .MuiBadge-badge": { background: "red" } }}
                className="text-white"
                badgeContent={0}
              >
                <ShoppingCartIcon fontSize="small" />
              </Badge>
            </Link>

            <Box className="customer" display={"flex"} width={"25px"}>
              {toggleCustomer ? (
                <CloseRoundedIcon onClick={() => handleShowPopup()} />
              ) : (
                <AccountCircle
                  fontSize="small"
                  onClick={() => handleShowPopup()}
                />
              )}
              <Box className={`menu-popup ${toggleCustomer ? "active" : ""}`}>
                <Link
                  to="/dang-nhap"
                  component={NavLink}
                  onClick={() => handleShowPopup()}
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/dang-ky"
                  component={NavLink}
                  onClick={() => handleShowPopup()}
                >
                  Đăng ký
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* {showSearch && <Box className="bur-mb"></Box>} */}
      <Box className={`blur-mb ${showSearch ? "active" : ""}`}></Box>
      <SearchProduct sttActive={showSearch} />
      <SideBarMenu onShowSideBar={handleShowSideBar} active={showSideBar} />
    </Box>
  );
}
