import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { userReducer } from "./userSlice";
import { postCommentsReducer } from "./postCommentsSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    postComments: postCommentsReducer,
  },
});

export default store;
