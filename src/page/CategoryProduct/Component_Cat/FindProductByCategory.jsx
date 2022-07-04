import { Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getListCategoryProduct } from "utils/category";
import { ToSlug } from "utils/format";
import getBreadcrumbsCategory from "utils/getBreadcrumbsCategory";

export default function FindProductByCategory({ categoryId }) {
  const dataCategoryProduct = useSelector((state) => state.categoryProducts);
  const [category, setCategory] = useState();
  useEffect(() => {
    const isCategory = getBreadcrumbsCategory(
      dataCategoryProduct,
      categoryId
    ).isCategory;

    setCategory(isCategory);
  }, [categoryId]);
  return (
    <Box className="p-filter-item">
      {category && (
        <>
          <Typography component={"div"} className="title-fiter">
            {category.name}
          </Typography>
          <Box className="p-filter-list-value">
            {category.children
              ? category.children.length > 0 &&
                category.children.map((categoryChildren, index) => (
                  <Link
                    key={index}
                    to={`/danh-muc-san-pham/${ToSlug(categoryChildren.name)}-${
                      categoryChildren.id
                    }.html`}
                    component={NavLink}
                  >
                    {categoryChildren.name}
                  </Link>
                ))
              : ""}
          </Box>
        </>
      )}
    </Box>
  );
}
