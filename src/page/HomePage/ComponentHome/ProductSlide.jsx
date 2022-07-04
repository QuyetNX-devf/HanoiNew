import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import LazyLoad from "react-lazyload";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper";
import { makeStyles } from "@mui/styles";

import { useState } from "react";
import Tooltip from "./Tooltip";
import ItemProduct from "component/ItemProduct";
import { useCallback } from "react";

const useStyles = makeStyles((theme) => ({
  linkSwiper: {
    display: "block",
    "& img": {
      display: "block",
      width: "100%",
      height: "auto",
    },
  },
  bgTheme: {
    background: theme.backgroundColor.primary,
  },
  bgSlideItem: {
    background: theme.backgroundColor.secondary,
  },
}));

export default function ProductSlide(props) {
  const classes = useStyles();

  const { data } = props;

  const initialState = {
    m: {
      top: 0,
      left: 0,
    },
    disp: "none",
    index: 0,
    data: null,
  };

  const [tooltip, setTooltip] = useState(initialState);

  const handleMouseMove = useCallback((e, infoProduct) => {
    setTooltip({
      m: {
        top: e.pageY,
        left: e.pageX + 10,
      },
      disp: "block",
      index: 0,
      data: infoProduct,
    });
  }, []);

  const handleMouseLeave = useCallback((e) => {
    setTooltip({
      ...tooltip,
      disp: "none",
    });
  }, []);

  const Loading = () => (
    <div className="post loading">
      <h5>Loading...</h5>
    </div>
  );

  return (
    <LazyLoad placeholder={<Loading />}>
      <Box className={`list-product ${classes.bgTheme}`}>
        <Swiper
          className="mySwiper"
          spaceBetween={10}
          slidesPerView={6}
          navigation={true}
          modules={[Navigation]}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              spaceBetween: 10,
              slidesPerView: 4,
            },
            1200: {
              spaceBetween: 10,
              slidesPerView: 5,
            },
            1651: {
              spaceBetween: 10,
              slidesPerView: 6,
            },
          }}
        >
          {data.map((itemSlide, indexSlide) => (
            <SwiperSlide key={indexSlide}>
              <ItemProduct
                itemData={itemSlide}
                indexItemData={indexSlide}
                handleMouseMove={handleMouseMove}
                handleMouseLeave={handleMouseLeave}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Tooltip hovermouse={tooltip} />
      </Box>
    </LazyLoad>
  );
}
