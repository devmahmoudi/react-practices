import axios from "axios";

const SERVER_URL = "http://localhost:1011";

// @desc fetch all users
// @route http://localhost:9000/users
export const getAllUsers = async () => {
  const url = `${SERVER_URL}/users`;
  return axios.get(url);
};
