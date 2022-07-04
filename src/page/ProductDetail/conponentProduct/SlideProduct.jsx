import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";

// import "./styles.css";
const useStyles = makeStyles((theme) => ({
  blockImge: {
    display: "block",
    width: "100%",
    height: "auto",
  },
}));
export default function SlideProduct({ product }) {
  const classes = useStyles();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
          marginBottom: "10px",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        <SwiperSlide>
          <Box>
            <img
              className={classes.blockImge}
              src={`https://hanoinew.vn${product.productImage.large}`}
            />
          </Box>
        </SwiperSlide>

        {product.imageCollection.map(
          (item, index) =>
            product.productImage.large !== item.image.large && (
              <SwiperSlide key={index}>
                <Box>
                  <img
                    className={classes.blockImge}
                    src={`https://hanoinew.vn${item.image.large}`}
                  />
                </Box>
              </SwiperSlide>
            )
        )}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {product.imageCollection.map((item, index) => (
          <SwiperSlide key={index}>
            <Box sx={{ border: "solid 1px #afafaf" }}>
              <img
                className={classes.blockImge}
                src={`https://hanoinew.vn${item.image.large}`}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
