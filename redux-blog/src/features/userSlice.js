import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { getAllUsers, storeUser, deleteUser } from "../services/userService";
import apiSlice from "../api/apiSlice";

// User slice object
const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {}
});

// exports
export default userSlice.reducer;

// selectors
const usersSelectorResult = apiSlice.endpoints.getUsers.select()

export const allUsersSelector = createSelector(
  usersSelectorResult,
  users => users.data ?? []
)

export const userSelector = createSelector(
  allUsersSelector,
  (_, userId) => userId,
  (users, userId) => users.find(user => user.id == userId)
)


// export const userSelector = (state, userId) =>
//   state.users.find((user) => user.id == userId);

// export const allUsersSelector = (state) => state.users;

export const {} = userSlice.actions;
