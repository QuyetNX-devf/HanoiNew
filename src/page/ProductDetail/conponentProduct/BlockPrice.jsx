import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { formatCurrency } from "utils/formatNumBerPrice";

const useStyles = makeStyles((theme) => ({
  groupPrice: {
    background: theme.backgroundColor.secondary,
  },
}));
export default function BlockPrice({ isProduct }) {
  const classes = useStyles();
  return (
    <Box className={`group-price ${classes.groupPrice}`}>
      <Box className="item-price">
        <Typography component={"span"}>Giá khuyến mãi: </Typography>
        <Typography
          component={"span"}
          sx={{
            fontSize: "1.3rem",
            color: "red",
            fontWeight: "700",
            padding: "0 12px",
          }}
        >
          {formatCurrency(isProduct.price)} đ
        </Typography>
        {isProduct.hasVAT === 1 && (
          <Typography component={"span"}>[Giá đã có VAT]</Typography>
        )}
      </Box>
      <Box className="item-price">
        <Typography component={"span"}>Giá thị trường: </Typography>
        {isProduct.marketPrice > 0 && (
          <Typography
            component={"span"}
            sx={{
              padding: "0 12px",
              fontSize: "1.2rem",
              textDecoration: "line-through",
              fontWeight: "500",
            }}
          >
            {formatCurrency(isProduct.marketPrice)} đ
          </Typography>
        )}
      </Box>
    </Box>
  );
}
