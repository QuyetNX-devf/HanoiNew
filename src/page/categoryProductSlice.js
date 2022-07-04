import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

import Data from "../data.json";

const categoryProduct = _.find(Data, "all_category").all_category.product;

const initialState = categoryProduct;

const category = createSlice({
  name: "photos",
  initialState: initialState,
  reducers: {},
});

const { reducer, actions } = category;
// export const { addPhoto, removePhoto, updatePhoto } = actions;
export default reducer;
