import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";
import blogApi from "../api/blogApi";

// Async Thunk Reducers
export const incrementReaction = createAsyncThunk(
  "/increment-reaction/blog",
  async ({ blogId, reactionName }, { getState, dispatch }) => {
    const state = getState();

    const blog = state.blogs.entities[blogId];

    if (!blog)
      throw new Error(
        `Blog with id ${blogId} not found for reactioon increment`
      );

    const updatedBlog = {
      ...blog,
      reactions: {
        ...blog.reactions,
        [reactionName]: (blog.reactions[reactionName] || 0) + 1,
      },
    };

    const response = await dispatch(blogApi.endpoints.updateBlog.initiate(updatedBlog));

    return {
      id: response.data.id,
      changes: response.data
    };
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
      .addCase(incrementReaction.fulfilled, blogAdapter.updateOne)
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
