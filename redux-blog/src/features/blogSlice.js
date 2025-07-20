import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
    {
        id: nanoid(),
        title: "اولین پست من",
        body: "محتوای اولین پست من",
        date: new Date().toISOString()
    },
    {
        id: nanoid(),
        title: "دومین پست من",
        body: "محتوای دومین پست من",
        date: new Date().toISOString()
    }
]

const blogSlice = createSlice({
    name: "blog",
    initialState: initialState,
    reducers: {
        blogAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(title, body){
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        body
                    }
                }
            }
        }
    }
})

export default blogSlice.reducer

export const { blogAdded } = blogSlice.actions;