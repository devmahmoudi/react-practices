import apiSlice from './apiSlice'

export default apiSlice.injectEndpoints((builder) => ({
    getProducts: builder.query({
        query: () => "/stickers"
    })
}))