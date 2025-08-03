import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { getAllBlogs, createBlog, deleteBlog, updateBlog } from "../services/blogService";

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

export const destoryBlog = createAsyncThunk("destory/blog", async (blogId) => {
  await deleteBlog(blogId)
  return blogId
})

export const modifyBlog = createAsyncThunk("update/blog", async blog => {
  const response = await updateBlog(blog.id, blog)
  return response.data
})


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
      .addCase(storeBlog.rejected, (state, action) => {
        console.error("store/blog/rejected", action.error.message);
      })
      .addCase(destoryBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter(blog => blog.id != action.payload)
      })
      .addCase(destoryBlog.rejected, (state, action) => {
        console.error(`Delete blog failed: ${action.error.message}`);
      })
      .addCase(modifyBlog.fulfilled, (state, action) => {
        const blogIndex = state.blogs.findIndex(blog => blog.id === action.payload.id)
        state.blogs[blogIndex] = action.payload
      })
      .addCase(modifyBlog.rejected, (state, action) => {
        console.error(action.error.message)
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

export const allBlogsSelector = (state, userId = null) => {
  return !userId ? state.blogs.blogs : state.blogs.blogs.filter(blog => blog.userId == userId)
};

export const blogSelector = (state, blogId) =>
  state.blogs.blogs.find((blog) => blog.id == blogId);

export const { blogAdded, blogUpdated, blogDeleted, reactionIncrement } =
  blogSlice.actions;
