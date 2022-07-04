import { Box, Link, Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Breadcrumb from "component/Breadcrumb";
import LayoutArticle from "component/LayoutArticle";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getArticle, getCategoryArticle } from "utils/category";
import { formatDate, ToSlug } from "utils/format";
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

export default function Article() {
  const classes = useStyles();

  const categoryArticle = useSelector((state) => state.categoryArticle);
  const dataAticle = useSelector((state) => state.article);

  const { categoryId } = useParams();
  const [listArticle, setListArticle] = useState([]);
  const [isCategoryArticle, setIsCategoryArticle] = useState(false);

  useEffect(() => {
    if (categoryId) {
      const data = getArticle({
        dataArticle: dataAticle,
        idCategory: categoryId,
        limit: 10,
      }).data;
      setListArticle(data);
      const infoIsCategory = getCategoryArticle({
        dataCategory: categoryArticle,
        idCategory: categoryId,
      });
      setIsCategoryArticle(infoIsCategory);
    }
  }, [categoryId]);
  return (
    <Box className="main-article">
      {isCategoryArticle ? (
        <Breadcrumb
          path={"categotyArticle"}
          idCategory={isCategoryArticle.id}
          nameCategory={isCategoryArticle.title}
        />
      ) : (
        <Breadcrumb path={"/tin-tuc"} namePage="Tin tức" />
      )}
      <Box className="wrap-label">
        <LayoutArticle>
          <Box className="wrap-ct">
            <Box className="wrap-list-article-by-cat">
              {listArticle.length > 0
                ? listArticle.map((article, index) => (
                    <Link
                      key={index}
                      className={`item-article ${classes.bg}`}
                      to={`/tin-tuc/${ToSlug(article.title)}-${
                        article.id
                      }.html`}
                      component={NavLink}
                    >
                      <Box className="wrap-img">
                        <img src={article.articleDetail.image} />
                      </Box>
                      <Box className="group-text">
                        <Typography className="article-name" variant="h6">
                          {article.title}
                        </Typography>
                        <Typography className="time-create">
                          {formatDate(article.articleDetail.createDate)}
                        </Typography>
                        <Typography className="article-summary">
                          {article.description}
                        </Typography>
                      </Box>
                    </Link>
                  ))
                : ""}
            </Box>
          </Box>
        </LayoutArticle>
      </Box>
    </Box>
  );
}
