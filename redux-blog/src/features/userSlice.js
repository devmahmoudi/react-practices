import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsers, storeUser, deleteUser } from "../services/userService";

// Async actions
export const fetchUsers = createAsyncThunk("fetch/users", async () => {
  const res = await getAllUsers();
  return res.data;
});

export const createUser = createAsyncThunk("create/user", async (fullname) => {
  const res = await storeUser(fullname);

  if (res) return res.data;
});

export const destroyUser = createAsyncThunk("delete/user", async (userId) => {
  const res = await deleteUser(userId);

  return res ? userId : null;
});

// User slice object
const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        console.error("Failed to create user:", action.error.message);
      })
      .addCase(destroyUser.fulfilled, (state, action) => {
        return state.filter((user) => user.id !== action.payload);
      })
      .addCase(destroyUser.rejected, (state, action) => {
        console.error("Failed to delete user:", action.error.message);
      })
  },
});

// exports
export default userSlice.reducer;

export const userSelector = (state, userId) =>
  state.users.find((user) => user.id == userId);

export const allUsersSelector = (state) => state.users;

export const {} = userSlice.actions;
