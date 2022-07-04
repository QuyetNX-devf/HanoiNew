import { Box, Grid, Link, Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { NavLink } from "react-router-dom";
import { IconsPage } from "../../../contants/images";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import styled from "@emotion/styled";
import { useState } from "react";

const listLinkSupport = [
  {
    title: "Thông tin chung",
    childrenLinks: [
      {
        name: "Giới thiệu QuetyComputer",
        url: "#",
      },
      {
        name: "Thông tin công ty",
        url: "#",
      },
      {
        name: "Khách hàng doanh nghiệp",
        url: "#",
      },
      {
        name: "Liên hệ góp ý",
        url: "#",
      },
      {
        name: "Xây dựng cấu hình pc",
        url: "#",
      },
    ],
  },
  {
    title: "Hỗ trợ khách hàng",
    childrenLinks: [
      {
        name: "Hướng dẫn mua hàng trực tuyến",
        url: "#",
      },
      {
        name: "Hướng dẫn thanh toán",
        url: "#",
      },
      {
        name: "Hướng dẫn mua hàng trả góp",
        url: "#",
      },
      {
        name: "Gửi yêu cầu kỹ thuật & bảo hành",
        url: "#",
      },
      {
        name: "Gửi góp ý khiếu nại",
        url: "#",
      },
    ],
  },
  {
    title: "Quy định và chính sách",
    childrenLinks: [
      {
        name: "Hướng dẫn mua hàng trực tuyến",
        url: "#",
      },
      {
        name: "Hướng dẫn thanh toán",
        url: "#",
      },
      {
        name: "Hướng dẫn mua hàng trả góp",
        url: "#",
      },
      {
        name: "Gửi yêu cầu kỹ thuật & bảo hành",
        url: "#",
      },
      {
        name: "Gửi góp ý khiếu nại",
        url: "#",
      },
    ],
  },
  {
    title: "Cộng đồng HanoiNew",
    childrenLinks: [
      {
        icon: `${IconsPage.IconFace}`,
        name: "FaceBook",
        url: "#",
      },
      {
        icon: `${IconsPage.IconYoutube}`,
        name: "Youtube",
        url: "#",
      },
      {
        icon: `${IconsPage.IconHeadphone}`,
        name: "Group QuetyComputer",
        url: "#",
      },
    ],
  },
];
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
  footerCenter: {
    background: theme.backgroundColor.primary,
    padding: "22px 0",
    boxShadow: "0 0 6px #0000004f",
  },
}));
export default function FooterCenter() {
  const classes = useStyles();
  const isSmallerScreen = useMediaQuery("(max-width: 768px)");
  const [activeShowIcon, setActiveShowIcon] = useState(false);
  const handleToggleActiveIcon = (value) => {
    setActiveShowIcon(value);
  };
  return (
    <Box className={`footer-center ${classes.footerCenter}`}>
      <Box className="wrap-label">
        <Grid container>
          {listLinkSupport.map(
            (item, index) =>
              index < 3 && (
                <Grid item xs={12} md={3} key={index}>
                  <Box className={"col-item"}>
                    <Accordion
                      expanded={
                        isSmallerScreen ? activeShowIcon === index : true
                      }
                    >
                      <AccordionSummary>
                        <Box
                          className="title-wrap"
                          onClick={() => handleToggleActiveIcon(index)}
                        >
                          <Typography className="title" component={"div"}>
                            {item.title}
                          </Typography>
                          <Typography
                            className={`icon-show ${
                              activeShowIcon === index ? "active" : ""
                            }`}
                          >
                            <ArrowForwardIosSharpIcon />
                          </Typography>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box className="wrap-detail">
                          {item.childrenLinks.map((link, inLink) => (
                            <Box key={inLink}>
                              <Link
                                className="link-label"
                                to={link.url}
                                component={NavLink}
                              >
                                {link.icon && (
                                  <Box className="icon" component={"span"}>
                                    <img src={link.icon} />
                                  </Box>
                                )}
                                <Typography
                                  className="textLink"
                                  component={"span"}
                                >
                                  {link.name}
                                </Typography>
                              </Link>
                            </Box>
                          ))}
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                </Grid>
              )
          )}
          {listLinkSupport.map(
            (item, index) =>
              index === 3 && (
                <Grid item xs={12} md={3} key={index}>
                  <Box
                    className={"col-item"}
                    sx={{ border: "none !important" }}
                  >
                    <Accordion expanded={true}>
                      <AccordionSummary>
                        <Box className="title-wrap">
                          <Typography className="title" component={"div"}>
                            {item.title}
                          </Typography>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box className="wrap-detail">
                          {item.childrenLinks.map((link, inLink) => (
                            <Box key={inLink}>
                              <Link
                                className="link-label"
                                to={link.url}
                                component={NavLink}
                              >
                                {link.icon && (
                                  <Box className="icon" component={"span"}>
                                    <img src={link.icon} />
                                  </Box>
                                )}
                                <Typography
                                  className="textLink"
                                  component={"span"}
                                >
                                  {link.name}
                                </Typography>
                              </Link>
                            </Box>
                          ))}
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                </Grid>
              )
          )}
        </Grid>
      </Box>
    </Box>
  );
}
