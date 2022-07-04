import { Box, Typography } from "@mui/material";
import { addCart } from "page/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function GroupButtonBy({ idProduct }) {
  const listCart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddIdCart = (now) => {
    if ((now = "now")) {
      dispatch(addCart([{ id: idProduct, count: 1 }]));
      navigate("/gio-hang");
    } else {
      dispatch(addCart([{ id: idProduct, count: 1 }]));
    }
  };
  return (
    <Box className="group-btn-buy">
      <Box
        className="item-btn"
        sx={{ cursor: "pointer" }}
        onClick={() => handleAddIdCart("now")}
      >
        <Typography className="white h-label">Mua ngay</Typography>
        <Typography className="white sub-text">
          Giao hàng tận nơi nhanh chóng
        </Typography>
      </Box>
      <Box
        className="item-btn"
        sx={{ cursor: "pointer" }}
        onClick={handleAddIdCart}
      >
        <Typography className="white h-label">Thêm vào giỏ</Typography>
        <Typography className="white sub-text">
          Thêm vào giỏ hàng để chọn tiếp
        </Typography>
      </Box>
      <Box className="item-btn" sx={{ cursor: "pointer" }}>
        <Typography className="white h-label">Mua trả góp</Typography>
        <Typography className="white sub-text">Thủ tục đơn giản</Typography>
      </Box>
    </Box>
  );
}
