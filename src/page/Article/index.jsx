import { Box, Link, Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Breadcrumb from "component/Breadcrumb";
import LayoutArticle from "component/LayoutArticle";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getArticle } from "utils/category";
import { formatDate, ToSlug } from "utils/format";
import ListArticleByCategory from "./componentArticle/ListArticleByCategory";
import SlideArticle from "./componentArticle/SlideArticle";

import "./index.scss";

const useStyles = makeStyles((theme) => ({
  titileLabel: {
    borderBottom: `solid 2px ${theme.palette.secondary.main}`,
    "& .text": {
      background: theme.palette.secondary.main,
      color: theme.colorText.secondary,
      "&::after": {
        background: theme.palette.secondary.main,
      },
    },
  },
  textArticle: {
    "& .article-name": {
      color: theme.colorText.secondary,
    },
    "& .time-create": {
      color: theme.colorText.secondary,
    },
  },
  bg: {
    background: theme.backgroundColor.blackWhite,
  },
  wrapCategory: {
    background: theme.backgroundColor.blackWhite,
  },
  navArticle: {
    background: theme.palette.primary.paper,
    "&::after": {
      background: theme.palette.primary.paper,
    },
    "&.active": {
      background: theme.palette.primary.main,
      color: theme.colorText.secondary,
      "&::after": {
        background: theme.palette.primary.main,
      },
    },
  },
}));
export default function Article() {
  const isSmallerScreen = useMediaQuery("(max-width: 768px)");
  const categoryArticle = useSelector((state) => state.categoryArticle);
  const dataAticle = useSelector((state) => state.article);
  const classes = useStyles();
  const [visitArticle, setVisitArticle] = useState([]);

  useEffect(() => {
    const dataArticle = getArticle({
      dataArticle: dataAticle,
      type: "visit",
      limit: 4,
    }).data;
    setVisitArticle(dataArticle);
  }, []);
  return (
    <Box className="main-article">
      <Breadcrumb path={"tin-tuc"} namePage="Tin tức" />
      <Box className="wrap-label">
        <LayoutArticle>
          <Box className="wrap-ct">
            {isSmallerScreen ? (
              <SlideArticle dataArticle={visitArticle} />
            ) : (
              <Box className={`group-article-visit ${classes.bg}`}>
                {visitArticle.length > 0
                  ? visitArticle.map((article, index) => (
                      <Link
                        key={index}
                        className="item-article"
                        to={`/tin-tuc/${ToSlug(article.title)}-${
                          article.id
                        }.html`}
                        component={NavLink}
                      >
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
                    ))
                  : ""}
              </Box>
            )}
            <Box className="group-cat-article">
              {categoryArticle.map((category, index) => (
                <Box
                  key={index}
                  className={`item-category ${classes.wrapCategory}`}
                >
                  <Box className={`title-label ${classes.titileLabel}`}>
                    <Typography className="text" variant="h5">
                      {category.title}
                    </Typography>
                  </Box>
                  <Box className="list-article">
                    <ListArticleByCategory idCategory={category.id} />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </LayoutArticle>
      </Box>
    </Box>
  );
}
