import { configureStore } from "@reduxjs/toolkit";
import blogReducers from "../features/blogSlice";
import userReducers from "../features/userSlice";

const store = configureStore({
  reducer: {
    blogs: blogReducers,
    users: userReducers,
  },
});

export default store;
