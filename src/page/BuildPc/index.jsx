import { Box, Button, Typography } from "@mui/material";
import Breadcrumb from "component/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import PopupBuild from "./componentBuild/PopupBuild";
import { formatCurrency } from "utils/formatNumBerPrice";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import "./index.scss";
import { deleteProduct, refreshBuild, updateProduct } from "page/builSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReplayIcon from "@mui/icons-material/Replay";
import { addListCart } from "page/cartSlice";

const useStyles = makeStyles((theme) => ({
  bg: {
    background: theme.backgroundColor.primary,
  },
  branding: {
    color: theme.palette.primary.main,
  },
  btnAddCart: {
    backgroundColor: "#d30808",
  },
}));
export default function BuilPc() {
  const dataCategoryBuildPc = useSelector(
    (state) => state.buildPc.categoryProduct
  );
  const sumaryBuild = useSelector((state) => state.buildPc.sumaryBuild);
  const dispatch = useDispatch();
  // console.log(dataCategoryBuildPc);
  const classess = useStyles();

  const [popupBuild, setPopupBuild] = useState(false);
  const [isCategoryBuild, setIsCategoryBuild] = useState(false);
  const handleClosePopup = () => {
    setPopupBuild(false);
  };
  const handleGetIdCategory = (id) => {
    setIsCategoryBuild(id);
    setPopupBuild(true);
  };
  const handleChangCountProduct = (e, idCategory) => {
    const value = parseInt(e.target.value);
    dispatch(
      updateProduct({
        countProduct: value,
        idCategory: idCategory,
      })
    );
  };
  const handleBlurChangeCountProduct = (e, idCategory) => {
    if (e.target.value.trim() === "" || parseInt(e.target.value.trim()) < 0) {
      dispatch(
        updateProduct({
          countProduct: 1,
          idCategory: idCategory,
        })
      );
    }
  };
  const handleDeteleProduct = (idCategory) => {
    dispatch(deleteProduct(idCategory));
  };
  const handleRefeshBuild = () => {
    dispatch(refreshBuild());
  };
  const handleAddListCart = () => {
    const listIdProduct = sumaryBuild.listIdProduct;
    if (listIdProduct.length > 0) {
      dispatch(addListCart(listIdProduct));
    } else {
      alert("Bạn chưa chọn cấu hình nào");
    }
  };
  return (
    <Box className="main-page">
      <Breadcrumb path="buildpc" namePage="Build Pc" />
      <Box
        className={`blur-build ${popupBuild ? "active" : ""}`}
        onClick={handleClosePopup}
      ></Box>
      <Box className="wrap-label">
        <Box className="title-builpc">
          <Typography variant="h5" sx={{ textTransform: "uppercase" }}>
            Chọn linh kiện để xây dựng cấu hình
          </Typography>
        </Box>
        <PopupBuild
          idCategory={isCategoryBuild}
          statePopup={popupBuild}
          closePopup={handleClosePopup}
        />
        <Box className={`wrap-pick-product ${classess.bg}`}>
          {dataCategoryBuildPc.map((category, index) => (
            <Box key={index} className="item-category">
              <Box className="left-name">
                <Typography className="left-name-category">
                  {index + 1}.{category.nameCategory}
                </Typography>
              </Box>
              <Box className="right-pick">
                {category.product ? (
                  <Box className="wrap-product-pick">
                    <Box className="img-pd">
                      <img
                        src={
                          "https://hanoinew.vn" +
                          category.product.productImage.large
                        }
                        alt=""
                      />
                    </Box>
                    <Box className="infpo-pd">
                      <Typography
                        className="pd-name"
                        variant="h7"
                        component={"div"}
                      >
                        <b>{category.product.productName}</b>
                      </Typography>
                      <Typography variant="" component={"div"}>
                        <b>Mã Sp:</b> {category.product.productSKU}
                      </Typography>
                      <Typography variant="" component={"div"}>
                        <b>Bảo hành:</b> {category.product.warranty}
                      </Typography>
                      <Typography variant="" component={"div"}>
                        <b>Kho hàng:</b>{" "}
                        {category.product.quantity > 0 ? "còn hàng" : "tạm hết"}
                      </Typography>
                    </Box>
                    <Box className="price-pd">
                      <Typography>
                        <b>{formatCurrency(category.product.price)}</b>
                      </Typography>
                    </Box>
                    <Box className="x-pd sm">
                      <Typography>X</Typography>
                    </Box>
                    <Box className="x-pd">
                      <input
                        type="number"
                        value={category.product.countBuild}
                        onChange={(e) =>
                          handleChangCountProduct(e, category.id)
                        }
                        onBlur={(e) =>
                          handleBlurChangeCountProduct(e, category.id)
                        }
                      />
                    </Box>
                    <Box className="x-pd sm">=</Box>
                    <Box className="price-pd red">
                      <b>{formatCurrency(category.product.totalBuild)}</b>
                    </Box>
                    <Box
                      className={`x-pd ${classess.branding}`}
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleGetIdCategory(category.id)}
                    >
                      <EditLocationAltIcon fontSize="small" />
                    </Box>
                    <Box
                      onClick={() => handleDeteleProduct(category.id)}
                      className={`x-pd red`}
                      sx={{ cursor: "pointer" }}
                    >
                      <DeleteIcon fontSize="small" />
                    </Box>
                  </Box>
                ) : (
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={
                      <AddIcon
                        size="small"
                        sx={{
                          display: {
                            xs: "none",
                            sm: "inherit",
                          },
                        }}
                      />
                    }
                    sx={{
                      fontSize: {
                        xs: "14px !important",
                        lg: "17px !important",
                      },
                      display: {
                        xs: "block",
                        sm: "inline-flex",
                      },
                    }}
                    onClick={() => handleGetIdCategory(category.id)}
                  >
                    Chọn {category.nameCategory}
                  </Button>
                )}
              </Box>
            </Box>
          ))}
        </Box>
        <Box className="text-total-price-build">
          <Typography variant="h5" className="text-price">
            Total: <span>{formatCurrency(sumaryBuild.totalPrice)}</span>
          </Typography>
        </Box>
        <Box className="btn-buld">
          <Button
            variant="contained"
            startIcon={<ReplayIcon fontSize="small" />}
            sx={{
              fontSize: {
                xs: "14px",
                sm: "18px",
              },
              marginRight: "5px",
            }}
            onClick={handleRefeshBuild}
          >
            Làm mới
          </Button>
          <Button
            className={classess.btnAddCart}
            variant="contained"
            startIcon={<ShoppingCartIcon fontSize="small" />}
            sx={{
              fontSize: {
                xs: "14px",
                sm: "18px",
              },
            }}
            onClick={handleAddListCart}
          >
            Thêm vào giỏ hàng
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
