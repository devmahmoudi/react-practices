// interaction with server by using RTK Query

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const apiSlice = createApi({
    reducerPath: "api", // default state.api
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1011' }),
    tagTypes: ['BLOG'],
    endpoints: builder => ({
        getBlogs: builder.query({
            query: () => '/blogs',
            providesTags: ['BLOG']
        }),
        getBlog: builder.query({
            query: (blogId) => `/blogs/${blogId}`
        }),
        addNewBlog: builder.mutation({
            query: (data) => ({
                url: 'blogs',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['BLOG']
        }),
        updateBlog: builder.mutation({
            query: (data) => ({
                url: `/blogs/${data.id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['BLOG']
        })
    })
}
)

export const { useGetBlogsQuery, useGetBlogQuery, useAddNewBlogMutation, useUpdateBlogMutation } = apiSlice;

export default apiSlice;