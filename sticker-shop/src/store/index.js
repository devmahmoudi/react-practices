import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../slice/productSlice";
import apiSlice from "../api/apiSlice";
import productApi from "../api/productApi";
import cartSlice, { cartMiddlewares } from "../slice/cartSlice";

export const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    cart: cartSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefault) => {
    return getDefault().concat(apiSlice.middleware).concat(cartMiddlewares);
  },
});

store.dispatch(productApi.endpoints.getProducts.initiate());

export default store;