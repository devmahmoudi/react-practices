import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import {
  getAllBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
} from "../services/blogService";

// BLOG ADAPTOR
const blogAdaptor = createEntityAdapter({
  sortComparer: (a, z) => z.date.localeCompare(a.date),
});

const initialState = blogAdaptor.getInitialState({
  status: "idle",
  error: null,
});

// ASYNC REDUCERS
export const fetchBlogs = createAsyncThunk("fetch/blogs", async () => {
  console.log("fetch blogs");

  const response = await getAllBlogs();
  return response.data;
});

export const storeBlog = createAsyncThunk("store/blog", async (blog) => {
  const response = await createBlog(blog);
  return response.data;
});

export const destoryBlog = createAsyncThunk("destory/blog", async (blogId) => {
  await deleteBlog(blogId);
  return blogId;
});

export const modifyBlog = createAsyncThunk("update/blog", async (blog) => {
  const response = await updateBlog(blog.id, blog);
  return response.data;
});

export const incrementReaction = createAsyncThunk(
  "/increment-reaction/blog",
  async ({ blogId, reactionName }, { getState, _ }) => {
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

    const response = await updateBlog(blog.id, updatedBlog);
    return response.data;
  }
);

// SLICE
const blogSlice = createSlice({
  name: "blog",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state, _) => {
        state.status = "pending";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "success";
        blogAdaptor.upsertMany(state, action.payload);
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(storeBlog.fulfilled, (state, action) => {
        blogAdaptor.addOne(action.payload);
        // state.blogs.push(action.payload);
      })
      .addCase(storeBlog.rejected, (state, action) => {
        console.error("store/blog/rejected", action.error.message);
      })
      .addCase(destoryBlog.fulfilled, (state, action) => {
        // state.blogs = state.blogs.filter(blog => blog.id != action.payload)
        blogAdaptor.removeOne(state, action.payload);
      })
      .addCase(destoryBlog.rejected, (state, action) => {
        console.error(`Delete blog failed: ${action.error.message}`);
      })
      .addCase(modifyBlog.fulfilled, (state, action) => {
        // const blogIndex = state.blogs.findIndex(blog => blog.id === action.payload.id)
        // state.blogs[blogIndex] = action.payload

        blogAdaptor.updateOne(state, {
          id: action.payload.id,
          changes: action.payload,
        });
      })
      .addCase(modifyBlog.rejected, (state, action) => {
        console.error(action.error.message);
      })
      .addCase(incrementReaction.fulfilled, (state, action) => {
        const updagedBlog = action.payload

        blogAdaptor.updateOne(state, {
          id: updagedBlog.id,
          changes: updagedBlog
        })
        
      })
      .addCase(incrementReaction.rejected, (state, action) => {
        console.error(action.error.message);
      });
  },
  reducers: {
    blogDeleted: (state, action) => {
      const { id } = action.payload;

      state.blogs = state.blogs.filter((blog) => blog.id != id);
    },
    reactionIncrement: (state, action) => {
      const { blogId, reaction } = action.payload;

      const blog = state.entities[blogId];

      blog.reactions[reaction]++;

      modifyBlog(blog);
    },
  },
});

export default blogSlice.reducer;

export const blogSliceStatusSelector = (state) => state.blogs.status;

export const blogSliceErrorSelector = (state) => state.blogs.error;

// export const allBlogsSelector = (state, userId = null) => {
//   return !userId ? state.blogs.blogs : state.blogs.blogs.filter(blog => blog.userId == userId)
// };

// export const blogSelector = (state, blogId) =>
//   state.blogs.blogs.find((blog) => blog.id == blogId);

export const {
  selectAll: allBlogsSelector,
  selectIds,
  selectById: blogSelector,
} = blogAdaptor.getSelectors((state) => state.blogs);

export const { blogDeleted, reactionIncrement } = blogSlice.actions;
