import apiSlice from "./apiSlice";

// apis
export const extenedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers : builder.query({
      query: () => "/users",
      transformResponse: data => {
        return userAdapter.setAll(initialState, data)
      }
    })  
  })
})