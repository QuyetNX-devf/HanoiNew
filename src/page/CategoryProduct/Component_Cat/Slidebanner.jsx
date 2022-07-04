// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";
import { Link } from "@mui/material";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  linkSlide: {
    display: "block",
    "& img": {
      display: "block",
      width: "100%",
      height: "auto",
    },
  },
}));
export default function SliderBanner({ listBanner }) {
  const classes = useStyles();
  return (
    <Swiper
      className="Swiper-banner-category"
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
    >
      {listBanner.map((banner, index) => (
        <SwiperSlide key={index}>
          <Link
            to={banner.url}
            component={NavLink}
            className={classes.linkSlide}
          >
            <img src={banner.image} alt={banner.title} />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
