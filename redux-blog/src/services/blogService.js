import axios from "axios";

const SERVER_URL = "http://localhost:1011";

// @desc fetch all blogs
// @route GET http://localhost:9000/blogs
export const getAllBlogs = async () => {
  const url = `${SERVER_URL}/blogs`;
  return axios.get(url);
};

// @desc store new blog into server
// @route POST http://localhost:9000/blogs
export const createBlog = async (blog) => {
  const url = `${SERVER_URL}/blogs`;
  return axios.post(url, blog);
};