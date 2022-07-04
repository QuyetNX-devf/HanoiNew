import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  statusPd: {
    display: "flex",
    "& li": {
      paddingRight: "50px",
      [theme.breakpoints.down("md")]: {
        paddingRight: "20px",
      },
      [theme.breakpoints.down("sm")]: {
        paddingRight: "5px",
      },
      "& span": {
        [theme.breakpoints.down("sm")]: {
          fontSize: "12px",
        },
      },
    },
  },
  fontBold: {
    fontWeight: "700",
  },
}));
export default function StatusPd({ isProduct }) {
  const classes = useStyles();

  return (
    <Box className={`status-pd ${classes.statusPd}`} component={"ul"}>
      <Typography component={"li"}>
        <Typography component={"span"}>Mã hàng: </Typography>
        <Typography className={classes.fontBold} component={"span"}>
          {isProduct.productSKU}
        </Typography>
      </Typography>
      <Typography component={"li"}>
        <Typography component={"span"}>Lượt xem: </Typography>
        <Typography className={classes.fontBold} component={"span"}>
          {isProduct.visit}
        </Typography>
      </Typography>
      <Typography component={"li"}>
        <Typography component={"span"}>Tình trạng: </Typography>
        {isProduct.quantity > 0 ? (
          <Typography
            className={classes.fontBold}
            sx={{ color: "#1ace1a" }}
            component={"span"}
          >
            Còn hàng
          </Typography>
        ) : (
          <Typography
            className={classes.fontBold}
            sx={{ color: "red" }}
            component={"span"}
          >
            Tạm hết
          </Typography>
        )}
      </Typography>
    </Box>
  );
}
