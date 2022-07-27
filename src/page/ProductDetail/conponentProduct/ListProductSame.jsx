import { Box, Typography } from "@mui/material";
import ItemProduct from "component/ItemProduct";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import LazyLoad from "react-lazyload";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";
import { makeStyles } from "@mui/styles";
import _ from "lodash";
import { useEffect, useState } from "react";
import { getProductSame } from "utils/category";
import { useSelector } from "react-redux";
import { getProducts } from "contants/api";
import { useQuery } from "react-query";
import useLazyLoadGroup from "Hooks/useLazyLoadGroup";

const useStyles = makeStyles((theme) => ({
  listSame: {
    background: theme.backgroundColor.primary,
  },
}));

const Loading = () => (
  <div className="post loading">
    <h5>Loading...</h5>
  </div>
);

export default function ListProductSame({ product }) {
  const { ref, scrollpoint } = useLazyLoadGroup();
  const classes = useStyles();
  const { productId } = product;
  const idCategory = _.findLast(product.categoryInfo, "id").id;

  const { data } = useQuery({
    queryKey: ["/product-same", { categoryId: idCategory }],
    queryFn: getProducts,
    enabled: !!scrollpoint,
  });

  const sameProducts = data?.products.filter(
    (product) => product.productId !== productId
  );

  return (
    <Box ref={ref}>
      {sameProducts && sameProducts?.length > 0 ? (
        <LazyLoad placeholder={<Loading />}>
          <Box className={`list-product-same ${classes.listSame}`}>
            <Typography className="h-product" sx={{ marginBottom: "15px" }}>
              Sản phẩm liên quan
            </Typography>
            <Box className="list-product">
              <Swiper
                className="mySwiper"
                spaceBetween={10}
                slidesPerView={6}
                navigation={true}
                modules={[Navigation]}
                breakpoints={{
                  0: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                  },
                  1200: {
                    slidesPerView: 5,
                    spaceBetween: 10,
                  },
                  1651: {
                    slidesPerView: 6,
                    spaceBetween: 20,
                  },
                }}
              >
                {sameProducts.map((itemSlide, indexSlide) => (
                  <SwiperSlide key={indexSlide}>
                    <ItemProduct
                      itemData={itemSlide}
                      indexItemData={indexSlide}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </Box>
        </LazyLoad>
      ) : (
        ""
      )}
    </Box>
  );
}
