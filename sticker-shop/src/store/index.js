import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../slice/productSlice";
import apiSlice from "../api/apiSlice";
import productApi from "../api/productApi";
import cartSlice, { cartMiddleware } from "../slice/cartSlice";

export const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    cart: cartSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefault) => {
    return getDefault().concat(apiSlice.middleware).concat(cartMiddleware.middleware);
  },
});

store.dispatch(productApi.endpoints.getProducts.initiate());

export default store;