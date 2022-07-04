import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import Banner from "./ComponentHome/Banner";
import CategoryProduct from "./ComponentHome/CategoryProduct";
import "./styles.scss";

import _ from "lodash";
import ArticleFeatured from "./ComponentHome/ArticleFeadtured";
import { getListCategoryProduct } from "utils/category";
import { useEffect, useState } from "react";
export default function HomePage() {
  const dataCategoryProduct = useSelector((state) => state.categoryProducts);
  const dataArticle = useSelector((state) => state.article);
  const [resultCat, setResultCat] = useState([]);
  let articleFeatured = _.filter(dataArticle, {
    articleDetail: { isFeatured: 1 },
  });

  useEffect(() => {
    const apiCategory = getListCategoryProduct({
      data: dataCategoryProduct,
      type: "featured",
    });
    setResultCat(apiCategory);
  }, []);

  return (
    <Box>
      <Banner />
      {resultCat.length > 0 &&
        resultCat.map(
          (category, index) =>
            category.isFeatured === 1 && (
              <CategoryProduct dataCat={category} key={index} />
            )
        )}
      <ArticleFeatured />
    </Box>
  );
}
