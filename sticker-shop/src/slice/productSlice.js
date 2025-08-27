import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import productApi from "../api/productApi"

const productAdapter = createEntityAdapter()

const initialState = productAdapter.getInitialState({
    status: "idle"
})

const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addMatcher(productApi.endpoints.getProducts.matchFulfilled, productAdapter.setAll)
    }
});

export default productSlice;