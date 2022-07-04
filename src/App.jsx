import "./index.scss";
import { light as lightTheme } from "./themes/light.js";
import { dark as darkTheme } from "./themes/dark.js";
import { Box, CssBaseline, Typography, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Header from "./component/Header/index.jsx";
import Footer from "component/Footer";
import HomePage from "page/HomePage";
import Notfound from "page/Notfound";
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryProduct from "page/CategoryProduct";
import ProductDetail from "page/ProductDetail";
import { addListCart } from "page/cartSlice";
import Cart from "page/Cart";
import BuildPc from "page/BuildPc";
import Article from "page/Article";
import CategoryArticle from "page/Article/CategoryArticle";
import ArticleDetail from "page/Article/ArticleDetail";
import PageSearch from "page/CategoryProduct/PageSearch";
import Login from "page/Customer/Login";
import Register from "page/Customer/Register";
import Gia_uu_dai from "page/Static/Gia_uu_dai";
import Ho_tro_tra_gop from "page/Static/Ho_tro_tra_gop";
import Bao_hanh_tan_nha from "page/Static/Bao_hanh_tan_nha";
import Mien_phi_van_chuyen from "page/Static/Mien_phi_van_chuyen";
import HeaderMobile from "component/HeaderMobie";
import { ThemeContext, ThemeProviderContext } from "context/ThemeContext";
import { useContext } from "react";

function App() {
  const isSmallerScreen = useMediaQuery("(max-width: 1024px)");
  const categoryProducts = useSelector((state) => state.categoryProducts);
  let location = useLocation();
  // console.log(location, "check location");
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.localStorage.getItem("listIdProduct")) {
      const localIdProduct = JSON.parse(
        window.localStorage.getItem("listIdProduct")
      );
      if (localIdProduct.length > 0) {
        dispatch(addListCart(localIdProduct));
      }
    }
  }, []);

  const contextTheme = useContext(ThemeContext);
  let themeMode = contextTheme.theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeMode}>
      <CssBaseline />
      <Box component="div" className="Main-page">
        {isSmallerScreen ? <HeaderMobile /> : <Header />}
        <Routes>
          <Route index element={<HomePage />} />
          <Route
            path={`danh-muc-san-pham/:name-:categoryId.html`}
            element={<CategoryProduct />}
          />
          <Route path={`tim-kiem.html`} element={<PageSearch />} />
          <Route
            path="san-pham/:nameProduct-:productId.html"
            element={<ProductDetail />}
          />
          <Route path="/gio-hang" element={<Cart />} />
          <Route path="/buildpc" element={<BuildPc />} />
          <Route path="/tin-tuc" element={<Article />} />
          <Route
            path="/tin-tuc/danh-muc/:nameCategoryArticle-:categoryId.html"
            element={<CategoryArticle />}
          />
          <Route
            path="/tin-tuc/:nameArtice-:articleId.html"
            element={<ArticleDetail />}
          />
          <Route path="/gia-uu-dai.html" element={<Gia_uu_dai />} />
          <Route path="/ho-tro-tra-gop.html" element={<Ho_tro_tra_gop />} />
          <Route path="/bao-hanh-tan-nha.html" element={<Bao_hanh_tan_nha />} />
          <Route
            path="/mien-phi-van-chuyen.html"
            element={<Mien_phi_van_chuyen />}
          />

          <Route path="/dang-nhap" element={<Login />} />
          <Route path="/dang-ky" element={<Register />} />
          <Route path="*" element={<Notfound />} />
        </Routes>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
