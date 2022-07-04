import { alpha, Box, InputBase, Link, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink, useNavigate } from "react-router-dom";
import { formatCurrency } from "utils/formatNumBerPrice";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { sortPrice } from "utils/category";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  Search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 1),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    zIndex: "99999",
  },
  groupIp: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.backgroundColor.search,
    border: theme.border.search,
    position: "relative",
    zIndex: "99999",
  },
  SearchIconWrap: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.colorText.primary,
  },
  StyledInputBase: {
    color: theme.colorText.primary,
    width: "100%",
    "& .MuiInputBase-input": {
      padding: "8px 8px 8px 47px",
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.down("xxl")]: {
        padding: "6px 8px 6px 47px",
      },
    },
  },
  boxInsearch: {
    background: theme.backgroundColor.search,
    border: `${theme.border.search} !important`,
  },
}));

export default function SearchProduct() {
  const navigate = useNavigate();
  const classes = useStyles();
  const domain = "https://hanoinew.vn";
  const products = useSelector((state) => state.product);
  const [dataSearch, setDataSearch] = useState([]);
  const [keySearch, setKeySearch] = useState(null);
  const [activeBlur, setActiveBlur] = useState(false);

  // debounce search
  const typingTimeoutRef = useRef(null);
  const handleSearch = (e) => {
    const value = e.target.value.trim("");
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    if (value !== "") {
      typingTimeoutRef.current = setTimeout(() => {
        setKeySearch(value);
      }, 500);
    } else {
      setDataSearch([]);
      setKeySearch(null);
    }
  };

  const onEnterSearch = (e) => {
    if (e.keyCode === 13) {
      setDataSearch([]);
      setActiveBlur(false);
      navigate(`/tim-kiem.html?q=${e.target.value}`);
    }
  };

  const handleCloseBoxResult = () => {
    setActiveBlur(false);
    setDataSearch([]);
  };
  useEffect(() => {
    if (keySearch) {
      const getProduct = sortPrice({
        listProduct: products,
        page: 1,
        keySearch: keySearch,
        limit: 15,
      }).data;
      setDataSearch(getProduct);
    }
  }, [keySearch]);
  return (
    <Box className={classes.Search}>
      <Box>
        <Box className={classes.groupIp}>
          <Box className={classes.SearchIconWrap}>
            <SearchIcon />
          </Box>
          <InputBase
            className={classes.StyledInputBase}
            placeholder="Search…"
            onChange={(e) => handleSearch(e)}
            onKeyDown={(e) => onEnterSearch(e)}
            onClick={() => setActiveBlur(true)}
          />
        </Box>
        {dataSearch.length > 0 && (
          <Box
            className={`box-insearch custom-scroll-bar ${classes.boxInsearch}`}
          >
            {dataSearch.map((item, index) => (
              <Link
                key={index}
                to={"#"}
                component={NavLink}
                className={"insearch_item"}
              >
                <Box className="left_img">
                  <img
                    src={domain + item.productImage.large}
                    alt={item.productname}
                  />
                </Box>
                <Box className="right_content">
                  <Typography component={"span"} className="content_title">
                    {item.productName}
                  </Typography>
                  <Typography component={"span"} className="content_price">
                    {formatCurrency(item.price)} đ
                  </Typography>
                </Box>
              </Link>
            ))}
          </Box>
        )}
      </Box>
      <Box
        className={`blur-search ${activeBlur ? "active" : ""}`}
        onClick={() => handleCloseBoxResult()}
      ></Box>
    </Box>
  );
}
