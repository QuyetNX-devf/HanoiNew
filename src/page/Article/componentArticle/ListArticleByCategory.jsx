import { Box, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getArticle } from "utils/category";
import { formatDate, ToSlug } from "utils/format";

export default function ListArticleByCategory({ idCategory }) {
  const dataAticle = useSelector((state) => state.article);
  const [listArticle, setListArticle] = useState([]);
  useEffect(() => {
    const dataArticle = getArticle({
      dataArticle: dataAticle,
      idCategory: idCategory,
      limit: 4,
    }).data;
    setListArticle(dataArticle);
  }, []);
  return (
    <>
      {listArticle.map((article, index) => (
        <Link
          key={index}
          className="item-article"
          to={`/tin-tuc/${ToSlug(article.title)}-${article.id}.html`}
          component={NavLink}
        >
          <Box className="wrap-img">
            <img src={article.articleDetail.image} />
          </Box>
          <Box className="group-text">
            <Typography className="article-name" variant="h6" component={"div"}>
              {article.title}
            </Typography>
            <Typography className="time-create" component={"div"}>
              {formatDate(article.articleDetail.createDate)}
            </Typography>
          </Box>
        </Link>
      ))}
    </>
  );
}
