import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getAllUsers, storeUser, deleteUser } from "../services/userService";

// Adapter
const userAdapter = createEntityAdapter()

const initialState = userAdapter.getInitialState()

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
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.fulfilled, userAdapter.setAll)
      .addCase(createUser.fulfilled, userAdapter.addOne)
      .addCase(createUser.rejected, (_, action) => {
        console.error("Failed to create user:", action.error.message);
      })
      .addCase(destroyUser.fulfilled, userAdapter.removeOne)
      .addCase(destroyUser.rejected, (_, action) => {
        console.error("Failed to delete user:", action.error.message);
      })
  },
});

// exports
export default userSlice.reducer;

// export const userSelector = (state, userId) =>
//   state.users.find((user) => user.id == userId);

// export const allUsersSelector = (state) => state.users;

export const {
  selectById: userSelector,
  selectAll: allUsersSelector,
} = userAdapter.getSelectors((state) => state.users)

export const {} = userSlice.actions;
