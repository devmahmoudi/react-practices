import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../slice/productSlice";
import apiSlice from "../api/apiSlice";
import productApi from "../api/productApi";

export const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefault) => {
    return getDefault().concat(apiSlice.middleware);
  },
});


store.dispatch(productApi.endpoints.getProducts.initiate())

export default store;