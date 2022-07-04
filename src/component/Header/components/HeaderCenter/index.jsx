import { Badge, Grid, Link, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { ImgeHeader } from "contants/images";
import { NavLink } from "react-router-dom";
import WifiCalling3Icon from "@mui/icons-material/WifiCalling3";
import SettingsIcon from "@mui/icons-material/Settings";
import { ShoppingCart } from "@mui/icons-material";
import _ from "lodash";
import { useSelector } from "react-redux";
import SearchProduct from "./SearchProduct.jsx";
import { useContext } from "react";
import { ThemeContext } from "context/ThemeContext.jsx";

const useStyles = makeStyles((theme) => ({
  wrapperHeaderCenter: {
    backgroundColor: theme.header.background,
  },
  logo: {
    display: "block",
    width: "176px",
    height: "auto",
    margin: "5px auto",
    [theme.breakpoints.down("xxl")]: {
      width: "125px",
    },
  },
  contactCpt: {
    display: "flex",
    alignItems: "center",
    "& .MuiTypography-root": {
      color: `${theme.palette.common.white} !important`,
    },
  },
  iconCpt: {
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    borderRadius: "50%",
    backgroundColor: theme.backgroundColor.search,
    color: theme.colorText.changeColorBrand,
    justifyContent: "center",
    marginRight: "10px",
    [theme.breakpoints.down("xxl")]: {
      width: "33px",
      height: "33px",
    },
    "& svg": {
      // color: theme.palette.primary.main,
    },
    "& .MuiBadge-root": {
      margin: "2px 7px 0 0",
    },
    "& .MuiBadge-badge": {
      top: "5px",
      right: "0px",
      border: `2px solid ${theme.palette.background.paper}`,
      backgroundColor: "#ff5b2b",
    },
  },
}));

export default function HeaderCenter() {
  const classes = useStyles();
  const infoCart = useSelector((state) => state.cart);
  const contextTheme = useContext(ThemeContext);
  const { theme } = contextTheme;

  return (
    <Box
      component={"div"}
      className={`header-center ${classes.wrapperHeaderCenter}`}
    >
      <Box className="wrap-label">
        <Box className="wrap-ct">
          <Grid container columnSpacing={"10px"} alignItems="center">
            <Grid item xs={2.4}>
              <Link component={NavLink} to="/">
                {theme === "light" ? (
                  <img src={ImgeHeader.Logo} alt="" className={classes.logo} />
                ) : (
                  <img src={ImgeHeader.Logo} alt="" className={classes.logo} />
                )}
              </Link>
            </Grid>
            <Grid item xs={4.8}>
              <SearchProduct />
            </Grid>
            <Grid item xs={4.8}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingLeft: {
                    xs: "20px",
                    lg: "13%",
                  },
                }}
              >
                <Link
                  to="#"
                  component={NavLink}
                  className={`contact-cpt ${classes.contactCpt}`}
                >
                  <Box
                    className={`icon-cpt ${classes.iconCpt}`}
                    // sx={{ display: { xxl: "none" } }}
                  >
                    <WifiCalling3Icon
                      sx={{ fontSize: { xs: "18px", xxl: "22px" } }}
                    />
                  </Box>
                  <Box className="text-ctp">
                    <Typography component={"div"}>Hotline mua hàng</Typography>
                    <Typography
                      component={"div"}
                      sx={{
                        fontWeight: "bold",
                        fontSize: { xs: "14px", xxl: "16px" },
                      }}
                    >
                      098.161.8988
                    </Typography>
                  </Box>
                </Link>
                <Link
                  to="buildpc"
                  component={NavLink}
                  className={`contact-cpt ${classes.contactCpt}`}
                >
                  <Box className={`icon-cpt ${classes.iconCpt}`}>
                    <SettingsIcon
                      sx={{ fontSize: { xs: "18px", xxl: "22px" } }}
                    />
                  </Box>
                  <Box className="text-ctp">
                    <Typography component={"div"}>Xây dựng</Typography>
                    <Typography
                      component={"div"}
                      sx={{
                        fontWeight: "bold",
                        fontSize: { xs: "14px", xxl: "16px" },
                      }}
                    >
                      Cấu hình Pc
                    </Typography>
                  </Box>
                </Link>
                <Link
                  to="/gio-hang"
                  component={NavLink}
                  className={classes.iconCpt}
                >
                  <Badge
                    badgeContent={infoCart.products.length}
                    color="secondary"
                  >
                    <ShoppingCart
                      sx={{ fontSize: { xs: "18px", xxl: "22px" } }}
                    />
                  </Badge>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
