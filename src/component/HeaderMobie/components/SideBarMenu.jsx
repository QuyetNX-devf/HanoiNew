import { Box, Link, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FeedIcon from "@mui/icons-material/Feed";
import CallIcon from "@mui/icons-material/Call";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { getAllCategoryProduct } from "utils/category";
import { useSelector } from "react-redux";

import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import SettingsIcon from "@mui/icons-material/Settings";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightIcon from "@mui/icons-material/Nightlight";
import styled from "@emotion/styled";
import { ToSlug } from "utils/format";
import { makeStyles } from "@mui/styles";
import { ThemeContext } from "context/ThemeContext";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: "none",
  background: "none",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(
  ({ theme }) => ({
    display: "block",
    padding: 0,
    minHeight: "auto",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      display: "block",
      margin: 0,
    },
  })
);

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
}));

const useStyles = makeStyles((theme) => ({
  sidebarMb: {
    background: theme.backgroundColor.blackWhite,
  },
}));
export default function SideBarMenu({ active, onShowSideBar }) {
  const classes = useStyles();
  const dataCategory = useSelector((state) => state.categoryProducts);
  const [cats, setCats] = useState([]);

  const contextTheme = useContext(ThemeContext);

  useEffect(() => {
    const listCat = getAllCategoryProduct({
      data: dataCategory,
    });
    setCats(listCat);
  }, []);

  const [expandedLv1, setExpandedLv1] = useState(false);
  const [expandedLv2, setExpandedLv2] = useState(false);
  const [expandedLv3, setExpandedLv3] = useState(false);

  const handleShowChildenLv1 = (panel) => {
    setExpandedLv1(panel === expandedLv1 ? false : panel);
  };
  const handleShowChildenLv2 = (panel) => {
    setExpandedLv2(panel === expandedLv2 ? false : panel);
  };
  const handleShowChildenLv3 = (panel) => {
    setExpandedLv3(panel === expandedLv3 ? false : panel);
  };

  return (
    <>
      <Box
        className={`sidebar-mb ${active ? "active-show" : ""} ${
          classes.sidebarMb
        }`}
      >
        <Box className="sidebar__wrap custom-scroll-bar">
          <Link to="/" component={NavLink} className="item-single">
            <HomeIcon />
            <Typography>Trang chủ</Typography>
          </Link>
          <Accordion>
            <AccordionSummary>
              <Box className="item-single item-category">
                <FormatListBulletedIcon />
                <Typography>Danh mục sản phẩm</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box className="group-menu">
                {cats.length > 0 &&
                  cats.map((catlv1, index1) => (
                    <Accordion
                      key={index1}
                      expanded={expandedLv1 === `panel1${catlv1.id}`}
                    >
                      <AccordionSummary>
                        <Box className="wrap-lv1">
                          <Link
                            to={`/danh-muc-san-pham/${ToSlug(catlv1.name)}-${
                              catlv1.id
                            }.html`}
                            component={NavLink}
                          >
                            {catlv1.name}
                          </Link>
                          {catlv1.isParent === 1 && (
                            <Typography
                              className={`icon-show ${
                                expandedLv1 === "panel1" + catlv1.id
                                  ? "active"
                                  : ""
                              }`}
                              onClick={() =>
                                handleShowChildenLv1(`panel1${catlv1.id}`)
                              }
                            >
                              <ArrowForwardIosSharpIcon />
                            </Typography>
                          )}
                        </Box>
                      </AccordionSummary>
                      {catlv1.children && catlv1.children.length > 0 && (
                        <AccordionDetails>
                          <Box className="wrap-detail">
                            {catlv1.children.map((catlv2, index2) => (
                              <Accordion
                                key={index2}
                                expanded={expandedLv2 === `panel1${catlv2.id}`}
                              >
                                <AccordionSummary>
                                  <Box className="wrap-lv1">
                                    <Link
                                      to={`/danh-muc-san-pham/${ToSlug(
                                        catlv2.name
                                      )}-${catlv2.id}.html`}
                                      component={NavLink}
                                    >
                                      {catlv2.name}
                                    </Link>
                                    {catlv2.isParent === 1 && (
                                      <Typography
                                        className={`icon-show ${
                                          expandedLv2 === "panel1" + catlv2.id
                                            ? "active"
                                            : ""
                                        }`}
                                        onClick={() =>
                                          handleShowChildenLv2(
                                            `panel1${catlv2.id}`
                                          )
                                        }
                                      >
                                        <ArrowForwardIosSharpIcon />
                                      </Typography>
                                    )}
                                  </Box>
                                </AccordionSummary>
                                {catlv2.children && catlv2.children.length > 0 && (
                                  <AccordionDetails>
                                    <Box className="wrap-detail">
                                      {catlv2.children.map((catlv3, index3) => (
                                        <Accordion
                                          key={index3}
                                          expanded={
                                            expandedLv2 === `panel1${catlv3.id}`
                                          }
                                        >
                                          <AccordionSummary>
                                            <Box className="wrap-lv1">
                                              <Link
                                                to={`/danh-muc-san-pham/${ToSlug(
                                                  catlv3.name
                                                )}-${catlv3.id}.html`}
                                                component={NavLink}
                                              >
                                                {catlv3.name}
                                              </Link>
                                              {catlv3.isParent === 1 && (
                                                <Typography
                                                  className="icon-show"
                                                  onClick={() =>
                                                    handleShowChildenLv2(
                                                      `panel1${catlv3.id}`
                                                    )
                                                  }
                                                >
                                                  <ArrowForwardIosSharpIcon />
                                                </Typography>
                                              )}
                                            </Box>
                                          </AccordionSummary>
                                          {catlv3.children &&
                                            catlv3.children.length > 0 && (
                                              <AccordionDetails></AccordionDetails>
                                            )}
                                        </Accordion>
                                      ))}
                                    </Box>
                                  </AccordionDetails>
                                )}
                              </Accordion>
                            ))}
                          </Box>
                        </AccordionDetails>
                      )}
                    </Accordion>
                  ))}
              </Box>
            </AccordionDetails>
          </Accordion>
          <Link to="#" component={NavLink} className="item-single">
            <CallIcon />
            <Typography>Liên hệ</Typography>
          </Link>
          <Link to="/tin-tuc" component={NavLink} className="item-single">
            <FeedIcon />
            <Typography>Tin tức</Typography>
          </Link>
          <Link
            to="/tin-tuc/danh-muc/tin-khuyen-mai-sd9jdw.html"
            component={NavLink}
            className="item-single"
          >
            <CardGiftcardIcon />
            <Typography>Tin khuyến mại</Typography>
          </Link>
          <Link to="/buildpc" component={NavLink} className="item-single">
            <SettingsIcon />
            <Typography>Xây dựng cấu hình</Typography>
          </Link>
          <Link
            to="/bao-hanh-tan-nha.html"
            component={NavLink}
            className="item-single"
          >
            <AddBusinessIcon />
            <Typography>Bảo hành tận nhà</Typography>
          </Link>
          <Box className="item-single" onClick={contextTheme.toggleTheme}>
            {contextTheme.theme === "dark" ? (
              <>
                <NightlightIcon />
                <Typography>Tối</Typography>
              </>
            ) : (
              <>
                <LightModeIcon />
                <Typography>Sáng</Typography>
              </>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        onClick={onShowSideBar}
        className={`blur-bg-sidebar ${active ? "active" : ""}`}
      ></Box>
    </>
  );
}
