import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { formatLineBreaks } from "utils/formatLineBreaks";
const useStyles = makeStyles((theme) => ({
  ulContent: {
    margin: 0,
    columnCount: 2,
    columnGap: "15px",
  },
}));
export default function SpecificationPd({ product }) {
  const classes = useStyles();

  return (
    <Box className="wrap-specification">
      <Typography className="h-label" sx={{ marginBottom: "10px" }}>
        Mô tả sản phẩm
      </Typography>
      <Box component={"ul"} className={classes.ulContent}>
        {product.productSummary ? (
          formatLineBreaks(product.productSummary).map((text, index) => (
            <Typography key={index} component={"li"}>
              {text}
            </Typography>
          ))
        ) : (
          <Typography component={"li"}>Đang cập nhât...</Typography>
        )}
      </Box>
    </Box>
  );
}
