import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserDetails(state, action) {
      state.userDetails = action.payload;
    },
    removeUserDetails(state) {
      state.userDetails = null;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { addUserDetails, removeUserDetails } = userSlice.actions;
