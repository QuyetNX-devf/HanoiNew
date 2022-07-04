import { Box, Link, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import ArticleSlide from "../ArticleSlide";
import { makeStyles } from "@mui/styles";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getArticle } from "utils/category";
import { ToSlug } from "utils/format";

const useStyles = makeStyles((theme) => ({
  titleArticle: {
    color: theme.colorText.changeColorBrand,
  },
  bgTheme: {
    background: theme.backgroundColor.primary,
  },
}));

function ArticleFeatured() {
  const dataArticle = useSelector((state) => state.article);
  const [articleFeatured, setArticleFeatured] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    const isArticle = getArticle({
      type: "featured",
      dataArticle: dataArticle,
      limit: 3,
    }).data;
    setArticleFeatured(isArticle);
  }, []);
  return (
    <Box className={`block-articles ${classes.bgTheme}`}>
      <Box className="wrap-label">
        <Box className="head-article">
          <Box className={`title-article ${classes.titleArticle}`}>
            Tin nổi bật trong ngày
          </Box>
          <Link
            to={`/tin-tuc`}
            component={NavLink}
            className={`more-pd ${classes.titleArticle}`}
          >
            <Box component={"span"}>Xem tất cả</Box>
            <DoubleArrowIcon />
          </Link>
        </Box>
        <Box className="wrap-list">
          {articleFeatured.length > 0 ? (
            <ArticleSlide data={articleFeatured} />
          ) : (
            ""
          )}
        </Box>
      </Box>
    </Box>
  );
}
export default memo(ArticleFeatured);
