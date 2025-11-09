import type { Blog } from "@/types"
import { baseApi } from "."

const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBlogs: build.query<Blog[], void>({
      query: () => `/blogs`,
    }),
  }),
})

export const { useGetBlogsQuery } = blogApi