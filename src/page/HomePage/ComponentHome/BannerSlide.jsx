import { Box, Link } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

import { NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  linkSwiper: {
    display: "block",
    "& img": {
      display: "block",
      width: "100%",
      height: "auto",
    },
  },
}));

export default function BannerSlide(props) {
  const classes = useStyles();

  const { data } = props;
  return (
    <Box>
      <Swiper
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {data.map((itemSlide, indexSlide) => (
          <SwiperSlide key={indexSlide}>
            <Link
              to={itemSlide.url}
              component={NavLink}
              className={classes.linkSwiper}
            >
              <img src={itemSlide.image} all={itemSlide.title} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
