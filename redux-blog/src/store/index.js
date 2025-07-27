import { configureStore } from "@reduxjs/toolkit";
import blogReducers from "../features/blogSlice";
import userReducers, { fetchUsers } from "../features/userSlice";

const store = configureStore({
  reducer: {
    blogs: blogReducers,
    users: userReducers,
  },
});

store.dispatch(fetchUsers())

export default store;
