import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

import Data from "../data.json";

const listProduct = _.find(Data, "all_product").all_product;

const initialState = listProduct;

const product = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
});

const { reducer, actions } = product;
// export const { addPhoto, removePhoto, updatePhoto } = actions;
export default reducer;
