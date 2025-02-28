import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postComments: null,
};

const postCommentsSlice = createSlice({
  name: "postComments",
  initialState,
  reducers: {
    addPostComments(state, action) {
      state.postComments = action.payload;
    },
    updatePostComments(state, action) {
      state.postComments = [...state.postComments, action.payload];
    },
    removePostComments(state) {
      state.postComments = null;
    },
  },
});

export const postCommentsReducer = postCommentsSlice.reducer;

export const { addPostComments, removePostComments, updatePostComments } =
  postCommentsSlice.actions;
