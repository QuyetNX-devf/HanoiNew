import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

import Data from "../data.json";

const dataArticle = _.find(Data, "list_article").list_article;

const initialState = dataArticle;

const article = createSlice({
  name: "article",
  initialState: initialState,
  reducers: {},
});

const { reducer, actions } = article;
// export const { addPhoto, removePhoto, updatePhoto } = actions;
export default reducer;
