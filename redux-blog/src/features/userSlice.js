import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import userApi from "../api/userApi";

// adapter
const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState();

// User slice object
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.getUsers.matchFulfilled,
      userAdapter.setAll
    );
  },
});

export default userSlice.reducer;

export const { selectAll: allUsersSelector, selectById: selectUser } = userAdapter.getSelectors((state) => state.users);