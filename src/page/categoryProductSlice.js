import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

// import Data from "../data.json";

// const categoryProduct = _.find(Data, "all_category").all_category.product;

// const initialState = categoryProduct;
const initialState = [];

const category = createSlice({
  name: "category-product",
  initialState: initialState,
  reducers: {
    addCategory: (state, action) => {
      return action.payload;
    },
  },
});

const { reducer, actions } = category;
export const { addCategory } = actions;
export default reducer;
