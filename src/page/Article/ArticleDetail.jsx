import { Box, Link, Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Breadcrumb from "component/Breadcrumb";
import LayoutArticle from "component/LayoutArticle";
import LoremText from "component/LoremText";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getArticle, getArticleDetail } from "utils/category";
import { formatDate, ToSlug } from "utils/format";

import _ from "lodash";
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
}));

export default function ArticleDetail() {
  const classes = useStyles();
  const categoryArticle = useSelector((state) => state.categoryArticle);
  const dataAticle = useSelector((state) => state.article);
  const { articleId } = useParams();

  const [infoArticle, setInfoArticle] = useState(false);
  const [isCategory, setIsCategory] = useState(false);

  useEffect(() => {
    if (articleId) {
      const data = getArticleDetail({
        dataArticle: dataAticle,
        idArticle: articleId,
      });
      if (data) {
        const category = _.findLast(data.categoryInfo, "id");
        setIsCategory(category);
        setInfoArticle(data);
      }
    }
  }, [articleId]);

  return (
    <Box className="main-article">
      {infoArticle ? (
        <>
          <Breadcrumb
            path={"articleDetail"}
            category={isCategory}
            idArticle={infoArticle.id}
            nameArticle={infoArticle.title}
          />
          <Box className="wrap-label">
            <LayoutArticle>
              <Box className="wrap-ct">
                <Box className={`main-article-detail ${classes.bg}`}>
                  {infoArticle ? (
                    <>
                      <Typography
                        variant="h1"
                        component={"div"}
                        className="title-Article"
                      >
                        {infoArticle.title}
                      </Typography>
                      <Typography className="create-time">
                        {formatDate(infoArticle.articleDetail.createDate)}
                      </Typography>
                      <Typography className="description-article">
                        {infoArticle.description}
                      </Typography>
                      <Box className="wrap-img">
                        <img src={infoArticle.articleDetail.image} />
                      </Box>
                      <Box className="ct-article">
                        <LoremText />
                      </Box>
                    </>
                  ) : (
                    ""
                  )}
                </Box>
              </Box>
            </LayoutArticle>
          </Box>
        </>
      ) : (
        <Box className="notFound" sx={{ padding: "40px 0" }}>
          <Box className="wrap-label">
            <Typography variant="h1" component={"h1"}>
              Notfound...
            </Typography>
            <Typography variant="h6" component={"p"}>
              Rât tiếc! trang bạn tìm không tồn tai. Vui lòng liên hệ
              Cskh@quetycomputer.com.vn
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
