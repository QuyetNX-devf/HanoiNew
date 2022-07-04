import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import StorageIcon from "@mui/icons-material/Storage";
import { Translate } from "@mui/icons-material";
import { formatCurrency } from "utils/formatNumBerPrice";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  bgTooltip: {
    background: theme.backgroundColor.blackWhite2,
  },
  bgBrand: {
    background: theme.backgroundColor.changeBgBrand2,
  },
}));
export default function Tooltip({ hovermouse }) {
  const data = hovermouse.data;
  const classes = useStyles();
  const widtWindow = window.innerWidth;
  var styleTooltip = {
    position: "absolute",
    top: hovermouse.m.top,
    left:
      hovermouse.m.left + 350 > widtWindow
        ? hovermouse.m.left - 350 - 10
        : hovermouse.m.left + 10,
    zIndex: 999999999999,
    display: hovermouse.disp,
    transform: "translateY(-100%)",
  };

  return data ? (
    <Box sx={{ width: "350px" }}>
      <Typography
        component={"div"}
        // key={indexSlide}
        sx={{ width: "350px" }}
        style={styleTooltip}
        className={`hover_content_pro ${classes.bgTooltip}`}
      >
        <Typography className={`hover-name ${classes.bgBrand}`}>
          {data.productName}
        </Typography>
        <Typography className="parameter" component={"div"}>
          <Box component={"span"}>Giá bán:</Box>
          <Box sx={{ fontSize: "18px", color: "red" }} component={"span"}>
            {formatCurrency(data.price)} đ
          </Box>
        </Typography>
        <Box className="parameter">
          <Box component={"span"}>Bảo hành:</Box>
          <Box component={"span"}>{data.warranty}</Box>
        </Box>
        <Box className={`tooltip-title ${classes.bgBrand}`}>
          <StorageIcon />{" "}
          <Typography component={"span"}>Thông số sản phẩm</Typography>
        </Box>
        <Box className="text-tt">
          {data.productSummary
            ? data.productSummary.split("\n").map((line, id1) => (
                <Box key={id1} component={"span"}>
                  - {line} <br />
                </Box>
              ))
            : ""}
        </Box>
      </Typography>
    </Box>
  ) : (
    ""
  );
}
