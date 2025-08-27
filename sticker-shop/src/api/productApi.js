import apiSlice from "./apiSlice";

export default apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/stickers",
    }),
  }),
});
