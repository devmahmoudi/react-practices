import { configureStore } from "@reduxjs/toolkit"
import blogReducers from "../features/blogSlice"

const store = configureStore({
    reducer: {
        blogs: blogReducers
    }
})

export default store;