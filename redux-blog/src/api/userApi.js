import apiSlice from "./apiSlice";

// apis
export default apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      providesTags: (result, error, id) =>
        result
          ? [
              { type: "USER" },
              ...result.map(({ id }) => ({ type: "USER", id })),
            ]
          : ["USER"],
    }),
    getUser: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: "USER", id }],
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["USER"],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/users/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, data) => [{ type: "USER", id: data.id }],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: $`/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [{ type: "USER", id }],
    }),
  }),
});
