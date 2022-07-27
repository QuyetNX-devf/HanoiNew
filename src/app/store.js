import { configureStore } from "@reduxjs/toolkit";
import categoryProductReducer from "page/categoryProductSlice";
import bannerReducer from "page/bannerSlice";
import productReducer from "page/productSlice";
import articleReducer from "page/articleSlice";
import rateReducer from "page/rateSlice";
import cartReducer from "page/cartSlice";
import BuildPcReducer from "page/builSlice";
import categoryArticleReducer from "page/categoryArticleSlice";
import authReducer from "page/authSlice";

const rootDeducer = {
  categoryProducts: categoryProductReducer,
  banner: bannerReducer,
  product: productReducer,
  article: articleReducer,
  rate: rateReducer,
  cart: cartReducer,
  buildPc: BuildPcReducer,
  categoryArticle: categoryArticleReducer,
  authLogin: authReducer,
};

const store = configureStore({
  reducer: rootDeducer,
});

export default store;
