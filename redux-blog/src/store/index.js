import { configureStore } from "@reduxjs/toolkit";
import blogReducers from "../features/blogSlice";
import userReducers from "../features/userSlice";
import apiSlice from "../api/apiSlice"
import userApi from "../api/userApi"

const store = configureStore({
  reducer: {
    blogs: blogReducers,
    users: userReducers,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});

// store.dispatch(fetchUsers())
store.dispatch(userApi.endpoints.getUsers.initiate())

export default store;
