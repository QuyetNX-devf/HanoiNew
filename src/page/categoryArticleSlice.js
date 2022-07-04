import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

import Data from "../data.json";

const categoryArticle = _.find(Data, "all_category").all_category.article;

const initialState = categoryArticle;

const category = createSlice({
  name: "categoryArticle",
  initialState: initialState,
  reducers: {},
});

const { reducer, actions } = category;
// export const { addPhoto, removePhoto, updatePhoto } = actions;
export default reducer;
