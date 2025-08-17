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

// apis
export const extenedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers : builder.query({
      query: () => "/users"
    })
  })
})

// selectors
const usersSelectorResult = extenedApi.endpoints.getUsers.select()

export const allUsersSelector = createSelector(
  usersSelectorResult,
  users => users.data ?? []
)

export const userSelector = createSelector(
  allUsersSelector,
  (_, userId) => userId,
  (users, userId) => users.find(user => user.id == userId)
)


export const {} = userSlice.actions;

export const {useGetUsersQuery} = extenedApi
