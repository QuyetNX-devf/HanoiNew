import { Box, Link, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ToSlug } from "utils/format";
import _ from "lodash";
import getBreadcrumbsCategory from "utils/getBreadcrumbsCategory";
const useStyles = makeStyles((theme) => ({
  breadcrumb: {
    background: theme.backgroundColor.blackWhite2,
    marginBottom: "15px",
  },
  wrapCt: {
    // display: "flex",
    alignItems: "center",
    padding: "10px 0",
  },
  spac: {
    padding: "0 10px",
  },
}));

const CategoryProduct = ({ categoryId }) => {
  const classes = useStyles();
  const dataCategoryProduct = useSelector((state) => state.categoryProducts);
  const [breadCrumb, setBreadCrumb] = useState([]);
  console.log(categoryId);
  useEffect(() => {
    const isBreadCrumb = getBreadcrumbsCategory(
      dataCategoryProduct,
      categoryId
    ).breadcrumbs;
    setBreadCrumb(isBreadCrumb);
  }, [categoryId]);
  return (
    <>
      {breadCrumb.length > 0 && (
        <Box className={classes.breadcrumb}>
          <Box className="wrap-label">
            <Box className={classes.wrapCt}>
              <Link to="/" component={NavLink}>
                Trang chủ
              </Link>
              {breadCrumb.map((item, index) => (
                <Link
                  key={index}
                  to={`/danh-muc-san-pham/${ToSlug(item.name)}-${item.id}.html`}
                  component={NavLink}
                >
                  <Typography className={classes.spac} component={"span"}>
                    /
                  </Typography>
                  <Typography component={"span"}>{item.name}</Typography>
                </Link>
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

const Product = (props) => {
  const dataCategoryProduct = useSelector((state) => state.categoryProducts);

  const classes = useStyles();
  const { product } = props;
  const idCategory = _.findLast(product.categoryInfo, "id").id;
  const [breadCrumb, setBreadCrumb] = useState([]);

  useEffect(() => {
    const isBreadCrumb = getBreadcrumbsCategory(
      dataCategoryProduct,
      idCategory
    ).breadcrumbs;
    setBreadCrumb(isBreadCrumb);
  }, [product]);

  return breadCrumb.length > 0 ? (
    <Box className={classes.breadcrumb}>
      <Box className="wrap-label">
        <Box className={classes.wrapCt}>
          <Link to="/" component={NavLink}>
            Trang chủ
          </Link>
          {breadCrumb.map((item, index) => (
            <Link
              key={index}
              to={`/danh-muc-san-pham/${ToSlug(item.name)}-${item.id}.html`}
              component={NavLink}
            >
              <Typography className={classes.spac} component={"span"}>
                /
              </Typography>
              <Typography component={"span"}>{item.name}</Typography>
            </Link>
          ))}
          <Link
            to={`/san-pham/${ToSlug(product.productName)}-${product.id}.html`}
            component={NavLink}
          >
            <Typography className={classes.spac} component={"span"}>
              /
            </Typography>
            <Typography component={"span"}>{product.productName}</Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  ) : (
    ""
  );
};

const PathDefault = (props) => {
  const classes = useStyles();
  const { path, namePage } = props;
  return (
    <Box className={classes.breadcrumb}>
      <Box className="wrap-label">
        <Box className={classes.wrapCt}>
          <Link to="/" component={NavLink}>
            Trang chủ
          </Link>
          <Link to={`/${path}`} component={NavLink}>
            <Typography className={classes.spac} component={"span"}>
              /
            </Typography>
            <Typography component={"span"}>{namePage}</Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

const CategoryArticle = (props) => {
  const classes = useStyles();
  const { idCategory, nameCategory } = props;

  return (
    <Box className={classes.breadcrumb}>
      <Box className="wrap-label">
        <Box className={classes.wrapCt}>
          <Link to="/" component={NavLink}>
            Trang chủ
          </Link>
          <Link to={`/tin-tuc`} component={NavLink}>
            <Typography className={classes.spac} component={"span"}>
              /
            </Typography>
            <Typography component={"span"}>Tin tức</Typography>
          </Link>
          <Link
            to={`/tin-tuc/danh-muc/${ToSlug(nameCategory)}-${idCategory}.html`}
            component={NavLink}
          >
            <Typography className={classes.spac} component={"span"}>
              /
            </Typography>
            <Typography component={"span"}>{nameCategory}</Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

const ArticleDetailBread = (props) => {
  const { category, idArticle, nameArticle } = props;
  const classes = useStyles();
  return (
    <Box className={classes.breadcrumb}>
      <Box className="wrap-label">
        <Box className={classes.wrapCt}>
          <Link to="/" component={NavLink}>
            Trang chủ
          </Link>
          <Link
            to={`/tin-tuc/danh-muc/${ToSlug(category.title)}-${
              category.id
            }.html`}
            component={NavLink}
          >
            <Typography className={classes.spac} component={"span"}>
              /
            </Typography>
            <Typography component={"span"}>{category.title}</Typography>
          </Link>
          <Link
            to={`/tin-tuc/${ToSlug(nameArticle)}-${idArticle}.html`}
            component={NavLink}
          >
            <Typography className={classes.spac} component={"span"}>
              /
            </Typography>
            <Typography component={"span"}>{nameArticle}</Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default function Breadcrumb(props) {
  const { path } = props;

  switch (path) {
    case "categoryProduct":
      return <CategoryProduct {...props} />;

    case "product":
      return <Product {...props} />;

    case "categotyArticle":
      return <CategoryArticle {...props} />;

    case "articleDetail":
      return <ArticleDetailBread {...props} />;

    default:
      return <PathDefault {...props} />;
  }
}
