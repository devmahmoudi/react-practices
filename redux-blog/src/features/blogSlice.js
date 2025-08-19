import {
  createSlice,
} from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";



// export const incrementReaction = createAsyncThunk(
//   "/increment-reaction/blog",
//   async ({ blogId, reactionName }, { getState, _ }) => {
//     const state = getState();

//     const blog = state.blogs.entities[blogId];

//     if (!blog)
//       throw new Error(
//         `Blog with id ${blogId} not found for reactioon increment`
//       );

//     const updatedBlog = {
//       ...blog,
//       reactions: {
//         ...blog.reactions,
//         [reactionName]: (blog.reactions[reactionName] || 0) + 1,
//       },
//     };

//     const response = await updateBlog(blog.id, updatedBlog);
//     return {
//       id: response.data.id,
//       changes: response.data
//     };
//   }
// );

const blogApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getBlogs: builder.query({
      query: () => "/blogs",
      providesTags: (result = [], err, arg) => [
        "BLOG",
        ...result.map(({ id }) => ({
          type: "BLOG", id
        })),
      ],
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
        method: 'DELETE'
      }),
      invalidatesTags: ['BLOG']
    })
  })
})

// SLICE
const blogSlice = createSlice({
  name: "blog",
  initialState: {}
});

export default blogSlice;

export const { useGetBlogQuery, useGetBlogsQuery, useAddNewBlogMutation, useUpdateBlogMutation, useDestroyBlogMutation } = blogApi;
