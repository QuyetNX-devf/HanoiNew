import { Box, Link, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import ArticleSlide from "../ArticleSlide";
import { makeStyles } from "@mui/styles";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToSlug } from "utils/format";
import useLazyLoadGroup from "Hooks/useLazyLoadGroup";
import { getArticle } from "contants/api";
import { useQuery, useQueryClient } from "react-query";

const useStyles = makeStyles((theme) => ({
  titleArticle: {
    color: theme.colorText.changeColorBrand,
  },
  bgTheme: {
    background: theme.backgroundColor.primary,
  },
}));

function ArticleFeatured() {
  const classes = useStyles();
  const { ref, scrollpoint } = useLazyLoadGroup();

  const queryClient = useQueryClient();
  const key = ["article-featured", { type: "featured", limit: 10 }];
  queryClient.setQueryData("keys", { k1: "", k2: key });

  const { data: dataArticle } = useQuery({
    queryKey: key,
    queryFn: getArticle,
    enabled: !!scrollpoint,
  });

  return (
    <Box className={`block-articles ${classes.bgTheme}`} ref={ref}>
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
          {dataArticle?.article.length > 0 ? (
            <ArticleSlide data={dataArticle.article} />
          ) : (
            ""
          )}
        </Box>
      </Box>
    </Box>
  );
}
export default memo(ArticleFeatured);
