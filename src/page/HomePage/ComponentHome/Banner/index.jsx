import { Box, Grid, Link, Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getBanenrHomePage } from "utils/category";
import BannerSlide from "../BannerSlide";
import BannerMobile from "./BannerMobile";
import BannerPc from "./BannerPc";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CallIcon from "@mui/icons-material/Call";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import FeedIcon from "@mui/icons-material/Feed";

const useStyles = makeStyles((theme) => ({
  stBanner: {
    display: "block",
    "& img": {
      display: "block",
      width: "100%",
      height: "auto",
    },
  },
  nullLeftBanner: {
    background: "#fff",
    height: "100%",
  },
}));

export default function Banner() {
  const isSmallerScreen = useMediaQuery("(max-width: 768px)");

  const dataBanner = useSelector((state) => state.banner);
  const listBannerSlide = dataBanner.banner_homepage.banner_slide_home;
  const bannerSmall = dataBanner.banner_homepage.banner_small;

  const [resultApiBanner, setResultApiBanner] = useState({
    bannerSlide: [],
    bannerSmall: [],
    bannerSlideMobile: [],
  });

  useEffect(() => {
    const dataCallApiBanner = getBanenrHomePage({
      data: dataBanner,
      keyName: "banner_homepage",
    });
    if (dataCallApiBanner) {
      setResultApiBanner({
        bannerSlide: dataCallApiBanner.banner_slide_home,
        bannerSmall: dataCallApiBanner.banner_small,
        bannerSlideMobile: dataCallApiBanner.banner_mobile,
      });
    }
  }, []);

  console.log(resultApiBanner, "check banner home page");

  const classes = useStyles();

  return (
    <Box className="block_banner">
      <Box className="wrap-label">
        {!isSmallerScreen && <BannerPc dataBanner={resultApiBanner} />}
      </Box>
      {isSmallerScreen && (
        <>
          <BannerMobile dataBanner={resultApiBanner} />
          <Box className="block-shortcuts">
            <Link className="item-sh" to="#" component={NavLink}>
              <Box className="icon-shortcuts">
                <FormatListBulletedIcon />
              </Box>
              <Typography className="title-item">Danh mục</Typography>
            </Link>
            <Link className="item-sh" to="#" component={NavLink}>
              <Box className="icon-shortcuts">
                <CallIcon />
              </Box>
              <Typography className="title-item">Hotline</Typography>
            </Link>
            <Link className="item-sh" to="#" component={NavLink}>
              <Box className="icon-shortcuts">
                <DesktopWindowsIcon />
              </Box>
              <Typography className="title-item">Cấu hình</Typography>
            </Link>
            <Link className="item-sh" to="#" component={NavLink}>
              <Box className="icon-shortcuts">
                <FeedIcon />
              </Box>
              <Typography className="title-item">Tin tức</Typography>
            </Link>
          </Box>
        </>
      )}
    </Box>
  );
}
