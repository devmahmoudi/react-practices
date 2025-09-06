import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";
import productApi from "../api/productApi";
import productSlice from "./features/productSlice";
import cartSlice, { cartMiddlewares } from "./features/cartSlice";

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