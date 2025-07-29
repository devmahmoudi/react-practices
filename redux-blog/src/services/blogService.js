import axios from "axios";

const SERVER_URL = "http://localhost:1011";

// @desc fetch all blogs
// @route http://localhost:9000/blogs
export const getAllBlogs = async () => {
  const url = `${SERVER_URL}/blogs`;
  return axios.get(url);
};
