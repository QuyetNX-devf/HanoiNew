import { Box, Typography } from "@mui/material";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  textColor: {
    color: theme.palette.secondary.main,
  },
  iconGiftTitle: {
    color: theme.palette.secondary.main,
    marginRight: "12px",
  },
  iconGift: {
    color: theme.palette.secondary.main,
    width: "18px",
    marginRight: "5px",
    height: "max-content",
  },
}));
export default function Offer() {
  const classes = useStyles();
  return (
    <Box className="block-gift">
      <Typography className={`title-gift ${classes.textColor}`} variant="h6">
        <CardGiftcardIcon className={classes.iconGiftTitle} /> Quà tặng và ưu
        đãi kèm theo
      </Typography>
      <Box className="wrap-list" component={"ul"}>
        <Typography component={"li"}>
          <CheckCircleIcon className={classes.iconGift} />
          Giảm 10% khi mua các phụ kiện tại QuetyComputer
        </Typography>
        <Typography component={"li"}>
          <CheckCircleIcon className={classes.iconGift} />
          Tặng Balo sành điệu
        </Typography>
        <Typography component={"li"}>
          <CheckCircleIcon className={classes.iconGift} />
          Ưu đãi đặc quyền dành cho Học sinh Sinh viên: Tặng thêm 1 năm bảo hành
        </Typography>
        <Typography component={"li"}>
          <CheckCircleIcon className={classes.iconGift} />
          Tặng PMH 100.000đ mua Microsoft 365 Personal/Family/Home Student
        </Typography>
      </Box>
    </Box>
  );
}
