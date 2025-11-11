import type { Blog } from "@/types"

import { baseApi } from "."

const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBlogs: build.query<Blog[], void>({
      query: () => `/blogs`,
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: "BLOG" as const, id })), "BLOG"]
          : ["BLOG"],
    }),
    addBlog: build.mutation<Blog, Omit<Blog, 'id'>>({
      query: (body) => ({
        url: '/blogs',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['BLOG']
    }),
  }),
})

export const { useGetBlogsQuery, useAddBlogMutation } = blogApi