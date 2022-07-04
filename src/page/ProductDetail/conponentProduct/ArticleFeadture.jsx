import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Link } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getArticle } from "utils/category";
import { NavLink } from "react-router-dom";
import { ToSlug } from "utils/format";

const useStyles = makeStyles((theme) => ({
  blockArticle: {
    background: theme.backgroundColor.primary,
    padding: "12px",
    borderRadius: "10px",
    height: "100%",
  },
  card: {
    background: theme.backgroundColor.blackWhite2,
  },
}));

export default function ArticleFeadture() {
  const dataArticle = useSelector((state) => state.article);
  const [articleFeatured, setArticleFeatured] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const isArticle = getArticle({
      type: "featured",
      dataArticle: dataArticle,
      limit: 3,
    }).data;
    console.log(isArticle);
    setArticleFeatured(isArticle);
  }, []);

  return (
    <Box className={`block-article ${classes.blockArticle}`}>
      <Typography className="h-product" sx={{ marginBottom: "13px" }}>
        Tin nổi bật
      </Typography>
      {articleFeatured.length > 0
        ? articleFeatured.map((article, index) => (
            <Link
              to={`/tin-tuc/${ToSlug(article.title)}-${article.id}.html`}
              component={NavLink}
              key={index}
            >
              <Card
                className={classes.card}
                sx={{ width: "100%", marginBottom: "15px" }}
              >
                <CardMedia
                  component="img"
                  alt={article.title}
                  height="200"
                  image={article.articleDetail.image}
                />
                <CardContent>
                  <Typography
                    className="h2-product"
                    gutterBottom
                    component="div"
                  >
                    {article.title}
                  </Typography>
                  <Typography>{article.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Xem Thêm</Button>
                </CardActions>
              </Card>
            </Link>
          ))
        : ""}
    </Box>
  );
}
