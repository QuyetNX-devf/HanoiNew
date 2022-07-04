import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

import Data from "../data.json";

const dataBanner = _.find(Data, "all_banner").all_banner;

const initialState = dataBanner;

const banner = createSlice({
  name: "photos",
  initialState: initialState,
  reducers: {},
});

const { reducer, actions } = banner;
// export const { addPhoto, removePhoto, updatePhoto } = actions;
export default reducer;
