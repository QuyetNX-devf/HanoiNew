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
import { NavLink } from "react-router-dom";
import { ToSlug } from "utils/format";
import { useQuery, useQueryClient } from "react-query";
import { getArticle } from "contants/api";
import useLazyLoadGroup from "Hooks/useLazyLoadGroup";

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
  const { ref, scrollpoint } = useLazyLoadGroup();
  const queryClient = useQueryClient();
  const keys = queryClient.getQueryData("keys");
  const key = ["article-featured", { type: "featured", limit: 3 }];

  const { data: dataArticle } = useQuery({
    queryKey: key,
    queryFn: getArticle,
    enabled: !!scrollpoint,
    initialData: () => {
      if (keys?.k2) {
        const data = queryClient.getQueryData(keys.k2);
        return data;
      }
    },
    // initialDataUpdatedAt: 600,
  });

  const classes = useStyles();

  return (
    <Box className={`block-article ${classes.blockArticle}`} ref={ref}>
      <Typography className="h-product" sx={{ marginBottom: "13px" }}>
        Tin nổi bật
      </Typography>
      {dataArticle && dataArticle?.article.length > 0
        ? dataArticle.article.map(
            (article, index) =>
              index < 3 && (
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
              )
          )
        : ""}
    </Box>
  );
}
