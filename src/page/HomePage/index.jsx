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
  return (
    <Box>
      <Banner />
      {dataCategoryProduct.length > 0 &&
        dataCategoryProduct.map(
          (category, index) =>
            category.isFeatured === 1 && (
              <CategoryProduct dataCat={category} key={index} />
            )
        )}
      {dataCategoryProduct.length > 0 && <ArticleFeatured />}
    </Box>
  );
}
