import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "../services/usersService";

export const fetchUsers = createAsyncThunk("fetch/users", async () => {
  const res = await getAllUsers();
  return res.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default userSlice.reducer;

export const userSelector = (state, userId) =>
  state.users.users.find((user) => user.id == userId);

export const allUsersSelector = (state) => state.users.users;

export const {} = userSlice.actions;
