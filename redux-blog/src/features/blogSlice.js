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
        },
        blogUpdated: (state, action) => {
            const {id, title, body} = action.payload

            const blog = state.find(blog => blog.id == id)

            if(blog){
                blog.title = title
                blog.body = body
            }
        }
    }
})

export default blogSlice.reducer

export const { blogAdded, blogUpdated } = blogSlice.actions;