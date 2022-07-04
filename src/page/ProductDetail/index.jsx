import { Box, Grid, Link, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";
import "./styles.scss";
import { ToSlug } from "utils/format";
import { useEffect } from "react";
import getCategory from "utils/getBreadcrumbsCategory";
import Breadcrumb from "component/Breadcrumb";
import StatusPd from "./conponentProduct/StatusPd";
import SlideProduct from "./conponentProduct/SlideProduct";
import SpecificationPd from "./conponentProduct/SpecificationPd";
import GroupButtonBy from "./conponentProduct/GroupButtonBuy";
import SideBarSupport from "./conponentProduct/SideBarSupport";
import BlockPrice from "./conponentProduct/BlockPrice";
import Describe from "./conponentProduct/Describe";
import { makeStyles } from "@mui/styles";
import BlockReview from "./conponentProduct/BlockReview";
import ListReview from "./conponentProduct/ListReview";
import ArticleFeadture from "./conponentProduct/ArticleFeadture";

import ListProductSame from "./conponentProduct/ListProductSame";
import fnRate from "utils/rateStart";
import Offer from "./conponentProduct/Offer";
import { useState } from "react";
import { getProductById } from "utils/category";

const useStyles = makeStyles((theme) => ({
  backgroundColor: {
    background: theme.backgroundColor.primary,
  },
}));
export default function ProductDetail() {
  const classes = useStyles();
  const navigate = useNavigate();

  const { productId, nameProduct } = useParams();

  const listProduct = useSelector((state) => state.product);

  //danh sách đánh giá cho sản phẩm hiện hành
  const listReview = useSelector((state) =>
    _.filter(state.rate, { idProduct: parseInt(productId) })
  );

  //Thông tin sản phẩm hiện hành
  const isProduct = _.find(listProduct, ["id", parseInt(productId)]);

  const rateStart = fnRate(listReview);

  // check id product
  useEffect(() => {
    if (!isProduct || nameProduct !== ToSlug(isProduct.productName)) {
      navigate("/");
    }
  }, []);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const isProduct = getProductById({
      data: listProduct,
      idProduct: +productId,
    });
    setProduct(isProduct);
  }, [productId]);

  return product ? (
    <Box className="main-product">
      <Breadcrumb path={"product"} product={product} />
      <Box className="pd-main-top" component={"section"}>
        <Box className="wrap-label">
          <Box className={`wrap-ct ${classes.backgroundColor}`}>
            <Box className="header-pd">
              <Box className="name-pd">
                <Typography className="name-pd-text">
                  {product.productName}
                </Typography>
              </Box>
              <StatusPd isProduct={product} />
            </Box>
            <Box className="main-top-detaial">
              <Grid container spacing={"12px"}>
                <Grid item xs={12} md={6} mmd={5}>
                  <Box className="col-left">
                    <SlideProduct product={product} />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} mmd={4}>
                  <Box className="col-center">
                    <SpecificationPd product={product} />
                    <Box className="title-warranty">
                      <Typography className="h-label">
                        Bảo hành :{" "}
                        <Box component={"span"} sx={{ color: "red" }}>
                          {product.warranty}
                        </Box>
                      </Typography>
                    </Box>
                    <BlockPrice isProduct={product} />
                    <Offer />
                    <GroupButtonBy idProduct={productId} />
                    <Link
                      className="linkCall"
                      href="tel:0981618988"
                      component={"a"}
                    >
                      <Typography
                        className="h-label"
                        sx={{ textAlign: "center" }}
                      >
                        Gọi ngay{" "}
                        <span style={{ color: "red" }}>098.161.8988</span> để
                        đặt hàng
                      </Typography>
                    </Link>
                  </Box>
                </Grid>
                <Grid item xs={12} mmd={3}>
                  <Box className="col-right">
                    <SideBarSupport />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="pd-main-center">
        <Box className="wrap-label">
          <Box className="wrap-ct">
            <Grid container spacing="12px">
              <Grid item xs={12} mmd={8}>
                <Box className={`block-left`}>
                  <Describe />
                  <Box className={`group-review ${classes.backgroundColor}`}>
                    <BlockReview idProduct={productId} rateStart={rateStart} />
                    {listReview.length > 0 && <ListReview data={listReview} />}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} mmd={4}>
                <ArticleFeadture />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      <Box className="block-same">
        <Box className="wrap-label">
          <ListProductSame product={product} />
        </Box>
      </Box>
    </Box>
  ) : (
    ""
  );
}
