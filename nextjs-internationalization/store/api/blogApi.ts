import type { Blog } from "@/types"
import { baseApi } from "."

const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // READ: Get all blogs
    getBlogs: build.query<Blog[], void>({
      query: () => `/blogs`,
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: "BLOG" as const, id })), "BLOG"]
          : ["BLOG"],
    }),

    // READ: Get single blog by ID
    getBlog: build.query<Blog, string>({
      query: (id) => `/blogs/${id}`,
      providesTags: (result, error, id) => [{ type: "BLOG" as const, id }],
    }),

    // CREATE: Add new blog
    addBlog: build.mutation<Blog, Omit<Blog, 'id'>>({
      query: (body) => ({
        url: '/blogs',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['BLOG'],
    }),

    // UPDATE: Update existing blog
    updateBlog: build.mutation<Blog, Partial<Blog> & Pick<Blog, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `/blogs/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "BLOG" as const, id },
        "BLOG",
      ],
    }),

    // DELETE: Delete a blog
    deleteBlog: build.mutation<void, string>({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: "BLOG" as const, id },
        "BLOG",
      ],
    }),
  }),
})

export const {
  useGetBlogsQuery,
  useGetBlogQuery,
  useAddBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi