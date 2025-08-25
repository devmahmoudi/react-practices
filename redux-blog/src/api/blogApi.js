import apiSlice from "./apiSlice";

const blogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => "/blogs",
      providesTags: (result = [], err, arg) => {
        return [
          "BLOG",
          ...result.map(({ id }) => ({
            type: "BLOG",
            id,
          })),
        ];
      },
    }),
    getBlog: builder.query({
      query: (blogId) => `/blogs/${blogId}`,
      providesTags: (result, err, blogId) => [{ type: "BLOG", id: blogId }],
    }),
    addNewBlog: builder.mutation({
      query: (data) => ({
        url: "blogs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["BLOG"],
    }),
    updateBlog: builder.mutation({
      query: (data) => ({
        url: `/blogs/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, err, blog) => [{ type: "BLOG", id: blog.id }],
    }),
    destroyBlog: builder.mutation({
      query: (blogId) => ({
        url: `/blogs/${blogId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BLOG"],
    }),
  }),
});

export const {
  useGetBlogQuery,
  useGetBlogsQuery,
  useAddNewBlogMutation,
  useUpdateBlogMutation,
  useDestroyBlogMutation,
} = blogApi;

export default blogApi;