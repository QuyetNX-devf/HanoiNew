import { Box, Grid, Link, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import SavingsIcon from "@mui/icons-material/Savings";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { NavLink, useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import "./styles.scss";
import { ToSlug } from "utils/format";
import { useState } from "react";
import { useEffect } from "react";
import { getAllCategoryProduct } from "utils/category";
import { useContext } from "react";
import { BlurContext } from "component/Header";

const useStyles = makeStyles((theme) => ({
  buttonCategory: {
    background: theme.backgroundColor.gradient,
  },
  bgTheme: {
    background: theme.backgroundColor.primary,
  },
  buttomSupport: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    backgroundColor: theme.backgroundColor.blackWhite2,
    justifyContent: "center",
    fontWeight: "bold",
    height: "37px",
    borderRadius: "5px",
    [theme.breakpoints.down("xxl")]: {
      height: "34px",
    },
    "&:hover": {
      background: theme.backgroundColor.gradient,
      color: theme.palette.common.white,
      "& .MuiTypography-root": {
        color: theme.palette.common.white,
      },
    },
  },
  headerBot: {
    backgroundColor: theme.header.background,
    paddingBottom: "10px",
  },
  listItem: {
    "&:hover": {
      "& .itemLv1": {
        backgroundColor: theme.palette.secondary.main,
      },
    },
    "& .itemLv1": {
      "&::after": {
        borderTop: "31px solid transparent",
        borderBottom: "31px solid transparent",
        borderLeft: `19px solid ${theme.palette.secondary.main}`,
        [theme.breakpoints.down("xxl")]: {
          borderTop: "29px solid transparent",
          borderBottom: "29px solid transparent",
        },
        [theme.breakpoints.down("xl")]: {
          borderTop: "24px solid transparent",
          borderBottom: "24px solid transparent",
        },
      },
    },
  },
  filterIcon: {
    filter: theme.iconNav.main,
  },
}));

const ButtonSupport = (props) => {
  const classes = useStyles();
  const { icon, link, name } = props;
  return (
    <Box>
      <Link to={link} component={NavLink} className={classes.buttomSupport}>
        {icon}
        <Typography
          component={"div"}
          sx={{ fontWeight: "bold", paddingLeft: "10px" }}
        >
          {name}
        </Typography>
      </Link>
    </Box>
  );
};

export default function HeaderBot() {
  const dataCategoryProduct = useSelector((state) => state.categoryProducts);
  let location = useLocation();

  const classes = useStyles();

  const context = useContext(BlurContext);

  const [categoryProduct, setCategotyProduct] = useState([]);

  useEffect(() => {
    const data = getAllCategoryProduct({ data: dataCategoryProduct });
    setCategotyProduct(data);
  }, []);

  return (
    <Box className={`headerBot ${classes.headerBot}`}>
      <Box className={`wrap-label `}>
        <Grid container columnSpacing={"10px"}>
          <Grid item xs={2.4}>
            <Box
              sx={{ position: "relative" }}
              className="group-cat"
              onMouseEnter={() => context.handleMouseEnter("hoverCategory")}
              onMouseLeave={() => context.handleMouseLeave()}
            >
              <Box className={`buttonCategory ${classes.buttonCategory}`}>
                <MenuIcon />
                <Typography
                  component={"div"}
                  sx={{
                    paddingLeft: "10px",
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  Danh mục sản phẩm
                </Typography>
              </Box>
              {(context.hoverEnter || location.pathname === "/") &&
                categoryProduct.length > 0 && (
                  <Box
                    className={`wrap-list-category ${
                      location.pathname !== "/" && "no-home"
                    }`}
                  >
                    <Box className={`wrap-spacing ${classes.bgTheme}`}>
                      {categoryProduct.map((category, lv1) => (
                        <Box
                          key={lv1}
                          className={`listItem ${
                            category.isParent === 1 ? "isParent" : ""
                          } ${classes.listItem}`}
                        >
                          <Link
                            component={NavLink}
                            to={`/danh-muc-san-pham/${ToSlug(category.name)}-${
                              category.id
                            }.html`}
                            className={`itemLv1`}
                          >
                            <Box component={"span"}>
                              <img
                                className={classes.filterIcon}
                                src={category.thumbnail.icons}
                              />
                            </Box>
                            <Box component={"span"}>{category.name}</Box>
                          </Link>
                          {category.isParent === 1 && (
                            <Box className={`wrapItemLv2 ${classes.bgTheme}`}>
                              {category.children.map((category2, lv2) => (
                                <Box className="wrapListCatlv2" key={lv2}>
                                  <Link
                                    className={`itemLv2`}
                                    component={NavLink}
                                    to={`/danh-muc-san-pham/${ToSlug(
                                      category2.name
                                    )}-${category2.id}.html`}
                                  >
                                    {category2.name}
                                  </Link>
                                  {category2.isParent === 1 &&
                                    category2.children.map((category3, lv3) => (
                                      <Box className="wrapListCatLv3" key={lv3}>
                                        <Link
                                          className={`itemLv3`}
                                          component={NavLink}
                                          to={`/danh-muc-san-pham/${ToSlug(
                                            category3.name
                                          )}-${category3.id}.html`}
                                        >
                                          {category3.name}
                                        </Link>
                                      </Box>
                                    ))}
                                </Box>
                              ))}
                            </Box>
                          )}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
            </Box>
          </Grid>
          <Grid item xs={2.4}>
            <ButtonSupport
              link="/gia-uu-dai.html"
              icon={<LocalAtmIcon />}
              name={"Giá ưu đãi nhất"}
            />
          </Grid>
          <Grid item xs={2.4}>
            <ButtonSupport
              link="ho-tro-tra-gop.html"
              icon={<SavingsIcon />}
              name={"Hỗ trợ trả góp"}
            />
          </Grid>
          <Grid item xs={2.4}>
            <ButtonSupport
              link="bao-hanh-tan-nha.html"
              icon={<SettingsIcon />}
              name={"Bảo hành tận nhà"}
            />
          </Grid>
          <Grid item xs={2.4}>
            <ButtonSupport
              link="mien-phi-van-chuyen.html"
              icon={<LocalShippingIcon />}
              name={"Miễn phí vận chuyển"}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
