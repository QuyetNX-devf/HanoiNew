import { Box, Link, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";

import { formatCurrency } from "utils/formatNumBerPrice";
import "./styles.scss";
import { ToSlug } from "utils/format";
import Tooltip from "page/HomePage/ComponentHome/Tooltip";
import { useState } from "react";
import { memo } from "react";

const useStyles = makeStyles((theme) => ({
  linkSwiper: {
    display: "block",
    "& img": {
      display: "block",
      width: "100%",
      height: "auto",
    },
  },
  bgSlideItem: {
    background: theme.backgroundColor.secondary,
    "&.custom": {
      background: theme.backgroundColor.customPd,
    },
  },
}));
function ItemProduct({
  itemData,
  // indexItemData,
  handleMouseMove,
  handleMouseLeave,
  classPrivate,
  cssCategory,
}) {
  const classes = useStyles();
  const domain = "https://hanoinew.vn/";
  return (
    <Box
      className={`item-pd ${classes.bgSlideItem} ${
        cssCategory === "custom" ? "custom" : ""
      }`}
    >
      <Link
        to={`/san-pham/${ToSlug(itemData.productName)}-${itemData.id}.html`}
        component={NavLink}
        className={`wrap-img ${classes.linkSwiper}`}
        onMouseMove={(e) => {
          return handleMouseMove && handleMouseMove(e, itemData);
        }}
        onMouseLeave={(e) => {
          return handleMouseLeave && handleMouseLeave();
        }}
      >
        <img
          src={domain + itemData.productImage.large}
          alt={itemData.productName}
        />
      </Link>
      <Box className="wrap-icon">
        <Link to={"/ssss"} component={NavLink}>
          {itemData.productType.isNew === 0 && (
            <img
              className="icon-new"
              src={`${domain}/static/assets/default/images/ic_new.png`}
              alt=""
            />
          )}
          <Box className="icon-discount">
            <Box className="text" component={"span"}>
              -{itemData.price_off} %
            </Box>
          </Box>
        </Link>
      </Box>
      <Box className="text-pd">
        <Link to={"#"} component={NavLink} className="name-pd">
          {itemData.productName}
        </Link>
        <Box className="price-pd">{formatCurrency(itemData.price)} đ</Box>
        {itemData.marketPrice > 0 && (
          <Box className="market-pd">
            {formatCurrency(itemData.marketPrice)} đ
          </Box>
        )}
      </Box>
      <Box className={"box-check"}>
        {itemData.quantity > 0 ? (
          <Box component={"span"} className={"check"}>
            {" "}
            <CheckIcon /> <Typography component={"span"}>Còn hàng</Typography>
          </Box>
        ) : (
          <Typography component={"span"} className={"call-sp"}>
            Liên hệ
          </Typography>
        )}
        <Typography className={"add-cart"} component={"span"}>
          <ShoppingCartIcon />
          <Typography component={"span"}>Thêm vào giỏ</Typography>
        </Typography>
      </Box>
    </Box>
  );
}
export default memo(ItemProduct);
