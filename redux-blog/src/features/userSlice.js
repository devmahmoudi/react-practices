import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    {
      id: 1,
      fullname: "Mahdi Mahmoudi",
    },
    {
      id: 2,
      fullname: "Amir Ali Mahmoudi",
    },
  ],
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
});

export default userSlice.reducer;

export const userSelector = (state, userId) =>
  state.users.users.find((user) => user.id == userId);

export const allUsersSelector = (state) => state.users.users;

export const {} = userSlice.actions;
