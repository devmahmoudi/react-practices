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
    let middlewares = getDefault().concat(apiSlice.middleware);

    // register cart slice middlewares to the store
    cartMiddlewares.forEach(middleware => {
      middlewares.concat(middleware)
    });

    return middlewares
  },
});

store.dispatch(productApi.endpoints.getProducts.initiate());

export default store;