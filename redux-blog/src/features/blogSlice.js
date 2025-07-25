import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns-jalali";

const initialState = {
  blogs: [
    {
      id: nanoid(),
      title: "اولین پست من",
      body: "محتوای اولین پست من",
      userId: 1,
      date: new Date().toISOString(),
      reactions: {
        thumbsUp: 0,
        hooray: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
      },
    },
    {
      id: nanoid(),
      title: "دومین پست من",
      body: "محتوای دومین پست من",
      userId: 2,
      date: sub(new Date(), { hours: 3, minutes: 45 }).toISOString(),
      reactions: {
        thumbsUp: 0,
        hooray: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
      },
    },
  ],
};

const blogSlice = createSlice({
  name: "blog",
  initialState: initialState,
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

export const allBlogsSelector = (state) => state.blogs.blogs;

export const blogSelector = (state, blogId) =>
  state.blogs.blogs.find((blog) => blog.id == blogId);

export const { blogAdded, blogUpdated, blogDeleted, reactionIncrement } =
  blogSlice.actions;
