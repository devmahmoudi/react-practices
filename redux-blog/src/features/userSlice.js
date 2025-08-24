import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { getAllUsers, storeUser, deleteUser } from "../services/userService";
import apiSlice from "../api/apiSlice";

// adapter
const userAdapter = createEntityAdapter()

const initialState = userAdapter.getInitialState()

// User slice object
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {}
});

export default userSlice.reducer;

const selectUsersData = createSelector(extenedApi.endpoints.getUsers.select(), (users) => users.data)

export const {selectAll: allUsersSelector, selectById: userSelector} = userAdapter.getSelectors((state) => selectUsersData(state) ?? initialState)

export const {useGetUsersQuery} = extenedApi
