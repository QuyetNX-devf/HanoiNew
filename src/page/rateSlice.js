import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

import Data from "../data.json";

const listRate = _.find(Data, "list_rate").list_rate;

const initialState = listRate;

const rate = createSlice({
  name: "rate",
  initialState: initialState,
  reducers: {
    addReview: (state, action) => {
      state.push(action.payload);
    },
    replyReview: (state, action) => {
      const newReply = action.payload;
      const replyIndex = state.findIndex(
        (reply) => reply.id === newReply.idReview
      );
      console.log(newReply);
      if (replyIndex >= 0) {
        state[replyIndex].replies.push(newReply.reply);
      }
    },
  },
});

const { reducer, actions } = rate;
export const { addReview, replyReview } = actions;
export default reducer;
