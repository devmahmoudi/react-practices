import { createSlice } from "@reduxjs/toolkit";

// CREATE SLICE
const userSlice = createSlice({
    name: 'user',
    initialState: { users: [], selectedUser: {} },
    reducers: {
        usersLoaded: (state, action) => {state.users = action.payload},
        selectedUserLoaded: (state, action) => {state.selectedUser = action.payload}
    }
})

// ACTIONS
export const {usersLoaded, selectedUserLoaded} = userSlice.actions 

// REDUCER
export const userReducer = userSlice.reducer

// SELECTORS 
export const usersListSelector = state => state.user.users
export const selectedUserSelector = state => state.user.selectedUser