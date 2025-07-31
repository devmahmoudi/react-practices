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

// @desc delete blog from server
// @route DELETE http://localhost:9000/blogs/{blogId}
export const deleteBlog = async (blogId) => {
  const url = `${SERVER_URL}/blogs/${blogId}`;
  return axios.delete(url, blogId);
};

// @desc update blog in server
// @route PUT http://localhost:9000/blogs/{blogId}
export const updateBlog = async (blogId, data) => {
  const url = `${SERVER_URL}/blogs/${blogId}`;
  return axios.put(url, data);
}