import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";
import blogApi from "../api/blogApi";

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

// Async Thunk Reducers
export const incrementReaction = createAsyncThunk(
  "/blog/incrementReaction",
  async ({ blogId, reactionName }, { getState, _ }) => {
    const state = getState();
    const blog = state.blogs.entities[blogId];
  }
);

const blogAdapter = createEntityAdapter();

const initialState = blogAdapter.getInitialState();

// SLICE
const blogSlice = createSlice({
  name: "blog",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(incrementReaction.fulfilled, (state, action) => {
        console.log(action);
      })
      .addCase(incrementReaction.rejected, (state, action) => {
        console.error(action.error.message);
      })
      .addMatcher(
        blogApi.endpoints.getBlogs.matchFulfilled,
        (state, action) => {
          blogAdapter.setAll(state, action.payload);
        }
      );
  },
});

export default blogSlice.reducer;
