import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { sortPrice } from "utils/category";
import { NavLink, useNavigate } from "react-router-dom";
import { Link, Typography } from "@mui/material";
import { formatCurrency } from "utils/formatNumBerPrice";

export default function SearchProduct({ sttActive }) {
  const navigate = useNavigate();
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
      navigate(`/tim-kiem.html?q=${keySearch}`);
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
    <Box className={`box-search-mobile ${sttActive ? "active" : ""}`}>
      <Box className={`wrap-popup-search`}>
        <Box className={`group-ip`}>
          <input
            className="ip-search"
            type="text"
            placeholder="Nhập từ khóa ..."
            onChange={(e) => handleSearch(e)}
            onKeyDown={(e) => onEnterSearch(e)}
            onClick={() => setActiveBlur(true)}
          />
          <Box className="icon-search" component={"span"}>
            <SearchIcon />
          </Box>
          {dataSearch.length > 0 && (
            <Box className="box-insearch custom-scroll-bar">
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
      </Box>
    </Box>
  );
}
