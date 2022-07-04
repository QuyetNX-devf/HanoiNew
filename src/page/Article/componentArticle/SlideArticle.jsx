import { Box, Link, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

import { NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { formatDate } from "utils/format";

const useStyles = makeStyles((theme) => ({
  textArticle: {
    "& .article-name": {
      color: theme.colorText.secondary,
    },
    "& .time-create": {
      color: theme.colorText.secondary,
    },
  },
}));
export default function SlideArticle({ dataArticle }) {
  const classes = useStyles();
  return (
    <Box className="book-slide-article">
      <Swiper
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {dataArticle.map((article, index) => (
          <SwiperSlide key={index}>
            <Link className="item-article" to="#" component={NavLink}>
              <Box className="wrap-img">
                <img src={article.articleDetail.image} />
              </Box>
              <Box className={`group-text ${classes.textArticle}`}>
                <Typography variant="h7" className="article-name">
                  {article.title}
                </Typography>
                <Typography className="time-create">
                  {formatDate(article.articleDetail.createDate)}
                </Typography>
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
