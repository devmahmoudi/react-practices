import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { getAllBlogs } from "../services/blogService";

const initialState = {
  blogs: [],
  status: "idle",
  error: null,
};

// ASYNC REDUCERS
export const fetchBlogs = createAsyncThunk("fetch/blogs", async () => {
  const response = await getAllBlogs();
  return response.data;
});

export const storeBlog = createAsyncThunk("store/blog", async (blog) => {
  const response = await createBlog(blog)
  return response.data;
});


// SLICE
const blogSlice = createSlice({
  name: "blog",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "success";
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(storeBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
      })
  },
  reducers: {
    blogAdded: {
      reducer(state, action) {
        state.blogs.push(action.payload);
      },
      prepare(title, body, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            body,
            userId,
          },
        };
      },
    },
    blogUpdated: (state, action) => {
      const { id, title, body } = action.payload;

      const blog = state.blogs.find((blog) => blog.id == id);

      if (blog) {
        blog.title = title;
        blog.body = body;
      }
    },
    blogDeleted: (state, action) => {
      const { id } = action.payload;

      state.blogs = state.blogs.filter((blog) => blog.id != id);
    },
    reactionIncrement: (state, action) => {
      const { blogId, reaction } = action.payload;

      const blog = state.blogs.find((blog) => blog.id == blogId);

      if (blog) blog.reactions[reaction]++;
    },
  },
});

export default blogSlice.reducer;

export const blogSliceStatusSelector = (state) => state.blogs.status;

export const blogSliceErrorSelector = (state) => state.blogs.error;

export const allBlogsSelector = (state) => state.blogs.blogs;

export const blogSelector = (state, blogId) =>
  state.blogs.blogs.find((blog) => blog.id == blogId);

export const { blogAdded, blogUpdated, blogDeleted, reactionIncrement } =
  blogSlice.actions;
