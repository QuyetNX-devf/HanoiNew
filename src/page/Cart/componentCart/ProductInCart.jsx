import { Box, SvgIcon, Typography } from "@mui/material";
import { deleteCart, updateCart } from "page/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "utils/formatNumBerPrice";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  wrapList: {
    background: theme.backgroundColor.blackWhite,
  },
}));
export default function ProductInCart() {
  const classes = useStyles();
  const dataCart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const onChangeValue = (e, productId) => {
    const value = e.target.value.trim();
    if (value === "") {
      dispatch(updateCart({ id: productId, countCart: 1 }));
    }
  };
  const handleChangeValue = (e, productId) => {
    const value = e.target.value.trim();
    dispatch(updateCart({ id: productId, countCart: value }));
  };
  const handleRemoveProduct = (productId) => {
    dispatch(deleteCart(productId));
  };
  return (
    <Box className={`wrap-info ${classes.wrapList}`}>
      <Box className="list-pd">
        {dataCart.products.map((product, index) => (
          <Box className="row-item" key={index}>
            <Box className="col-item">
              <img
                src={"https://hanoinew.vn/" + product.productImage.large}
                alt=""
              />
            </Box>
            <Box className="col-item">
              <Typography className="name-pd" variant="h7">
                {product.productName}
              </Typography>
              <Typography className="warranty">
                Bảo hành: {product.warranty}
              </Typography>
            </Box>
            <Box className="wrap-sm">
              <Typography component={"div"} className="col-item">
                {formatCurrency(product.price)} vnd
              </Typography>
              <Typography component={"div"} className="col-item">
                <input
                  onChange={(e) => handleChangeValue(e, product.id)}
                  onBlur={(e) => onChangeValue(e, product.id)}
                  type="text"
                  value={product.countCart}
                />
              </Typography>
              <Typography component={"div"} className="col-item">
                {formatCurrency(product.totalCart)} vnd
              </Typography>
              <Typography
                component={"div"}
                className="col-item"
                onClick={() => handleRemoveProduct(product.id)}
              >
                <SvgIcon fontSize="small" color="red" component={DeleteIcon} />
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Box className="total-price">
        <Typography variant="h6">
          Tổng tiền: {formatCurrency(dataCart.summaryCart.totalPrice)} vnd
        </Typography>
        <Typography>Chưa bao gồm phí vận chuyển</Typography>
      </Box>
    </Box>
  );
}
