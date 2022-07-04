import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  Link,
  OutlinedInput,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import _, { debounce } from "lodash";
import { formatCurrency } from "utils/formatNumBerPrice";
import AddIcon from "@mui/icons-material/Add";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "./popupBuild.scss";
import PaginationBuild from "./PaginationBuild";
import { useEffect, useRef, useState } from "react";
import { sortPrice } from "utils/category";
import getCategory from "utils/getBreadcrumbsCategory";
import { NavLink } from "react-router-dom";
import { ToSlug } from "utils/format";
import SliderPrice from "./SliderPrice";
import DistancePrice from "./DistancePrice";
import BrandFind from "./BrandFind";
import { addProduct } from "page/builSlice";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import styled from "@emotion/styled";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: "none",
  background: "none",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(
  ({ theme }) => ({
    display: "block",
    padding: 0,
    minHeight: "auto",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      display: "block",
      margin: 0,
    },
  })
);

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
}));

const useStyles = makeStyles((theme) => ({
  search: {
    width: "100%",
    borderRadius: "5px",
    overflow: "hidden",
    background: theme.backgroundColor.blackWhite2,
    "& .MuiOutlinedInput-input": {
      color: theme.colorText.primary,
      padding: "9px 14px",
      [theme.breakpoints.down("md")]: {
        padding: "5px 10px",
      },
    },
  },
  iconSearch: {
    color: theme.colorText.primary,
  },
  bg: {
    background: theme.backgroundColor.primary,
  },
  bgBranding: {
    background: theme.palette.primary.main,
  },
  titleFilter: {
    border: `solid 1px ${theme.palette.primary.main}`,
    "& .title-filter": {
      color: theme.palette.primary.main,
      textTransform: "uppercase",
    },
  },
  btn: {
    fontSize: "17px",
    [theme.breakpoints.down("mmd")]: {
      fontSize: "14px",
    },
  },
  mainLeft: {
    background: theme.backgroundColor.secondary,
  },
}));

export default function PopupBuild({ idCategory, statePopup, closePopup }) {
  const isSmallerScreen = useMediaQuery("(max-width: 900px)");
  const dataProduct = useSelector((state) => state.product);
  const dataCategoryProduct = useSelector((state) => state.categoryProducts);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [resultApi, setResultApi] = useState({
    products: [],
    totalPage: 0,
    brand: false,
    minMaxPrice: {
      min: null,
      max: null,
    },
  });
  const [keySerch, setKeySerch] = useState("");
  const [isCategory, setIsCategory] = useState([]);
  const [findMinMaxPrice, setFindMinMaxPrice] = useState({
    min: 0,
    max: false,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 7,
  });
  const [findBrand, setFindBrand] = useState(false);
  const [stateIdCategory, setStateIdCategory] = useState(idCategory);

  const handleChangePanelAccordion = (panel) => {
    setExpanded(panel === expanded ? false : panel);
  };

  const handleDispatch = (idCategory, product) => {
    dispatch(addProduct({ idCategory, product }));
    closePopup();
  };

  const handleChangeFindMaxPrice = (value) => {
    setFindMinMaxPrice((prev) => {
      return {
        min: parseInt(value[0]),
        max: parseInt(value[1] ? value[1] : false),
      };
    });
  };

  const handleFindBrand = (value) => {
    setFindBrand(value);
  };

  // debounce search
  const typingTimeoutRef = useRef(null);
  const handleSerchProduct = (value) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setKeySerch(value);
    }, 1000);
  };

  const handleChangePage = (page) => {
    setPagination((prev) => {
      return {
        ...prev,
        page: page,
      };
    });
  };

  const handleChangeIdCategory = (idCategory) => {
    setStateIdCategory(idCategory);
    setFindBrand(false);
    setPagination((prev) => {
      return {
        ...prev,
        page: 1,
      };
    });
  };

  //sau này thành lấy api category product
  useEffect(() => {
    if (idCategory) {
      const data = getCategory(dataCategoryProduct, idCategory).isCategory;
      setStateIdCategory(idCategory);
      setFindBrand(false);
      setIsCategory(data);
      setPagination((prev) => {
        return {
          ...prev,
          page: 1,
        };
      });
    }
  }, [idCategory]);

  // sau này thành lấy api product
  useEffect(() => {
    if (idCategory) {
      const getProduct = sortPrice({
        maxPrice: findMinMaxPrice.max,
        minPrice: findMinMaxPrice.min,
        minMaxPrice: true,
        brand: findBrand,
        listProduct: dataProduct,
        page: pagination.page,
        keySearch: keySerch,
        limit: pagination.limit,
        categoryId: stateIdCategory,
      });

      setResultApi((prev) => {
        return {
          ...prev,
          products: getProduct.data,
          totalPage: Math.ceil(getProduct.total / pagination.limit),
          brand: getProduct.brand,
          minMaxPrice: {
            min: getProduct.minMaxPrice.min,
            max: getProduct.minMaxPrice.max,
          },
        };
      });
    }
  }, [pagination, keySerch, stateIdCategory, findMinMaxPrice, findBrand]);

  const classess = useStyles();
  return (
    <Box className={`wrap-popup ${classess.bg} ${statePopup ? "active" : ""}`}>
      <Box className={`header-popup ${classess.bgBranding}`}>
        <Box className="header-popup__left">
          <Typography variant="h5" sx={{ color: "#fff" }}>
            Chọn linh kiện
          </Typography>
        </Box>
        <Box className="header-popup__right">
          <FormControl variant="outlined" className={classess.search}>
            <OutlinedInput
              id="outlined-adornment-weight"
              onChange={(e) => handleSerchProduct(e.target.value)}
              placeholder="Nhập từ khóa"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon
                      fontSize="small"
                      className={classess.iconSearch}
                    />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        <Box
          className="close-popup"
          onClick={closePopup}
          sx={{ cursor: "pointer" }}
        >
          <SvgIcon component={CloseRoundedIcon} />
        </Box>
      </Box>
      <Box className="popup-main">
        <Box className={`popup-main__left ${classess.mainLeft}`}>
          <Accordion expanded={isSmallerScreen ? expanded === "panel" : true}>
            <AccordionSummary
              onClick={() => handleChangePanelAccordion("panel")}
            >
              <Box className={`popup-main__title ${classess.titleFilter}`}>
                <Typography variant="h6" className="title-filter">
                  Lọc theo sản phẩm
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box className="wrap-filter custom-scroll-bar">
                <Box className="popup-main__filter">
                  <Box className={`wrap-left`}>
                    {idCategory && (
                      <Box className="p-filter-item">
                        <Typography
                          onClick={() => handleChangeIdCategory(isCategory.id)}
                          component={"div"}
                          className="title-fiter"
                          sx={{ cursor: "pointer" }}
                        >
                          {isCategory.name}
                        </Typography>
                        <Box
                          className="p-filter-list-value"
                          sx={{ paddingLeft: "20px" }}
                        >
                          {isCategory.children
                            ? isCategory.children.length > 0 &&
                              isCategory.children.map((category, index) => (
                                <Box
                                  sx={{ cursor: "pointer" }}
                                  onClick={() =>
                                    handleChangeIdCategory(category.id)
                                  }
                                  key={index}
                                >
                                  <Typography>{category.name}</Typography>
                                </Box>
                              ))
                            : ""}
                        </Box>
                      </Box>
                    )}
                    <Box className="p-filter-item">
                      <Typography component={"div"} className="title-fiter">
                        Lọc giá sản phẩm
                      </Typography>
                      {stateIdCategory && resultApi.minMaxPrice.max && (
                        <SliderPrice
                          idCategory={stateIdCategory}
                          minMaxPrice={resultApi.minMaxPrice}
                          handleChangeFindMaxPrice={handleChangeFindMaxPrice}
                        />
                      )}
                    </Box>
                    <Box className="p-filter-item">
                      <Typography component={"div"} className="title-fiter">
                        Khoảng giá:
                      </Typography>
                      <DistancePrice
                        handleChangeFindMaxPrice={handleChangeFindMaxPrice}
                      />
                    </Box>
                    {resultApi.brand && (
                      <Box className="p-filter-item">
                        <Typography component={"div"} className="title-fiter">
                          Thương hiệu:
                        </Typography>
                        <BrandFind
                          data={resultApi.brand}
                          handleFindBrand={handleFindBrand}
                          idCategory={stateIdCategory}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box
                  className="close-find"
                  onClick={() => handleChangePanelAccordion("panel")}
                >
                  Đóng lại <ArrowDropUpIcon />{" "}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box className="popup-main__right ">
          <Box>
            <PaginationBuild
              handleChangePage={handleChangePage}
              totalRows={resultApi.totalPage}
              idCategory={stateIdCategory}
            />
          </Box>
          <Box className="list-product custom-scroll-bar">
            {resultApi.products.length > 0 ? (
              resultApi.products.map((product, index) => (
                <Box className="pick-product" key={index}>
                  <Box className="img-pd">
                    <img
                      src={"https://hanoinew.vn/" + product.productImage.small}
                      alt=""
                    />
                  </Box>
                  <Box className="text-pd">
                    <Typography
                      className="pd-name"
                      variant="h7"
                      component={"div"}
                    >
                      <b>{product.productName}</b>
                    </Typography>
                    <Typography variant="h7" component={"div"}>
                      <b>Mã Sp:</b> {product.productSKU}
                    </Typography>
                    <Typography variant="h7" component={"div"}>
                      <b>Bảo hành:</b> {product.warranty}
                    </Typography>
                    <Typography variant="h7" component={"div"}>
                      <b>Kho hàng:</b>{" "}
                      {product.quantity > 0 ? "còn hàng" : "tạm hết"}
                    </Typography>
                    <Typography
                      variant="h7"
                      className="pd-price"
                      component={"div"}
                      sx={{ color: "red" }}
                    >
                      {formatCurrency(product.price)} đ
                    </Typography>
                  </Box>
                  <Box className="add-product">
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<AddIcon size="small" />}
                      className={classess.btn}
                      onClick={() => handleDispatch(stateIdCategory, product)}
                    >
                      THÊM VÀO CẤU HÌNH
                    </Button>
                  </Box>
                </Box>
              ))
            ) : (
              <Box
                sx={{ fontSize: "26px", padding: "50px", textAlign: "center" }}
              >
                Đang cập nhật ...{" "}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
