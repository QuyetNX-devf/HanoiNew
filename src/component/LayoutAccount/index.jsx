import { Box, Button, Link, Typography } from "@mui/material";
import React, { useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import useGlobalState from "Hooks/useGlobalState";
import useAuthUser from "Hooks/useAuthUser";
import CircularProgress from "@mui/material/CircularProgress";
import { IconsPage } from "contants/images";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockIcon from "@mui/icons-material/Lock";
import { useSelector } from "react-redux";
import "./index.scss";
import Breadcrumb from "component/Breadcrumb";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  leftAcc: {
    background: theme.backgroundColor.blackWhite,
  },
  rightAcc: {
    background: theme.backgroundColor.blackWhite,
  },
}));
const routes = [
  {
    title: "Thông tin tài khoản",
    icon: <PersonIcon fontSize="small" />,
    url: "/account",
  },
  {
    title: "Quản lý đơn hàng",
    icon: <NotificationsIcon fontSize="small" />,
    url: "/order",
  },
  {
    title: "Thiết lập lại mật khẩu",
    icon: <LockIcon fontSize="small" />,
    url: "/account/change-password",
  },
];

const LayoutAccount = ({ children }) => {
  const classes = useStyles();
  const authState = useSelector((state) => state.authLogin);
  const { authLoading, isAuthenticated, user } = authState;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      console.log("check-poinst");
      navigate("/dang-nhap");
    }
  }, [authLoading]);

  if (authLoading) {
    return (
      <Box className="page-acc">
        <Box className="wrap-label">
          <Box className="loading">
            <CircularProgress />
          </Box>
        </Box>
      </Box>
    );
  } else if (isAuthenticated) {
    return (
      <>
        <Breadcrumb path="account" namePage="Tài khoản" />
        <Box className="page-acc">
          <Box className="wrap-label">
            <Box className="wrap-ct">
              <Box className={`left-acc ${classes.leftAcc}`}>
                <Box className="name-acc">
                  <Box className="left-img">
                    <img src={IconsPage.Avatar} />
                  </Box>
                  <Box className="right-text">
                    <Typography className="sub">Tài khoản của</Typography>
                    {user && (
                      <Typography className="nameuser">
                        {user.userName}
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Box className="wrap-nav">
                  {routes.map((route, index) => (
                    <Link
                      className="link-nav"
                      to={route.url}
                      component={NavLink}
                      key={index}
                    >
                      <Box className="icon">{route.icon}</Box>
                      <Box className="text">{route.title}</Box>
                    </Link>
                  ))}
                </Box>
              </Box>
              <Box className={`right-acc ${classes.rightAcc}`}>{children}</Box>
            </Box>
          </Box>
        </Box>
      </>
    );
  } else {
    return (
      <Box className="page-acc">
        <Box className="wrap-label">
          <Box className="login-error">
            <Typography variant="h5">
              Đăng nhập để theo dõi thông tin đơn hàng
            </Typography>
            <Link className="to-login" to="#" component={NavLink}>
              Đăng nhập
            </Link>
          </Box>
        </Box>
      </Box>
    );
  }
};

export default LayoutAccount;
