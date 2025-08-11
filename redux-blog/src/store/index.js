import { configureStore } from "@reduxjs/toolkit";
import blogReducers from "../features/blogSlice";
import userReducers, { fetchUsers } from "../features/userSlice";
import apiSlice from "../api/apiSlice"

const store = configureStore({
  reducer: {
    blogs: blogReducers,
    users: userReducers,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});

store.dispatch(fetchUsers())

export default store;
