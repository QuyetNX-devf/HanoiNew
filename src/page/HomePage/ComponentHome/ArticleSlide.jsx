import { Box, Link, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { ToSlug } from "utils/format";
import { Navigation } from "swiper";

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

function FormatTimeV21({ time }) {
  var currentdate = new Date();
  var currentDate =
    currentdate.getDate() < 10
      ? `0${currentdate.getDate()}`
      : currentdate.getDate();
  var currentMonth =
    currentdate.getMonth() < 9
      ? currentdate.getMonth() + 1
      : `0${currentdate.getMonth() + 1}`;

  var currentTime = time.split(",")[0];
  return (
    <>
      {
        (currentTime = "Hôm nay" ? (
          <div className="left">
            <span className="day">{currentDate}</span>
            <span className="month">
              TH<span className="in-month">{currentMonth}</span>
            </span>
          </div>
        ) : (
          <div className="left">
            <span className="day">${currentTime.split("-")[0]}</span>
            <span className="month">
              TH<span className="in-month">{currentTime.split("-")[1]}</span>
            </span>
          </div>
        ))
      }
    </>
  );
}
export default function ArticleSlide(props) {
  const classes = useStyles();
  const { data } = props;
  return (
    <Box className="wrap-slider-article">
      <Swiper
        className="mySwiper"
        spaceBetween={10}
        slidesPerView={3}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          0: {
            slidesPerView: 1.5,
            spaceBetween: 5,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          1024: {
            spaceBetween: 15,
            slidesPerView: 3,
          },
        }}
      >
        {data.map((itemSlide, indexSlide) => (
          <SwiperSlide key={indexSlide}>
            <Link
              to={`/tin-tuc/${ToSlug(itemSlide.title)}-${itemSlide.id}.html`}
              component={NavLink}
              className={"item-article-home"}
            >
              <Box className="wrap-img">
                <img
                  src={itemSlide.articleDetail.image}
                  alt={itemSlide.title}
                />
              </Box>
              <Box className="group-text">
                <Box className="text-left">
                  <FormatTimeV21 time={itemSlide.articleDetail.createDate} />
                </Box>
                <Box className="text-right">
                  <Typography component={"div"} className={"is-this"}>
                    Tin tức
                  </Typography>
                  <Typography component={"div"} className="name-article">
                    {itemSlide.title}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
