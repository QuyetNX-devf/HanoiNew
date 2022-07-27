import { createSlice } from "@reduxjs/toolkit";
// import _ from "lodash";

// import Data from "../data.json";

// const dataArticle = _.find(Data, "list_article").list_article;

const initialState = {
  updateUser: "",
  authLoading: true,
  isAuthenticated: false,
  user: null,
};

const authCtm = createSlice({
  name: "authCtm",
  initialState: initialState,
  reducers: {
    setAUTH: (state, action) => {
      const { isAuthenticated, user } = action.payload;
      return { ...state, authLoading: false, isAuthenticated, user };
    },
  },
});

const { reducer, actions } = authCtm;
export const { setAUTH } = actions;
export default reducer;
