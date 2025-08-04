import axios from "axios";

const SERVER_URL = "http://localhost:1011";

// @desc fetch all users
// @route GET http://localhost:9000/users
export const getAllUsers = async () => {
  const url = `${SERVER_URL}/users`;
  return axios.get(url);
};

// @desc store new user
// @route POST http://localhost:9000/users
export const storeUser = async (fullname) => {
  const url = `${SERVER_URL}/users`;
  try {
    return axios.post(url, { fullname });
  } catch (error) {
    console.error(error);
    return null;
  }
};
