import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Blog } from '@/types'

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3010' }),
  endpoints: (build) => ({
    getBlogs: build.query<Blog, void>({
      query: () => `/`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetBlogsQuery } = api