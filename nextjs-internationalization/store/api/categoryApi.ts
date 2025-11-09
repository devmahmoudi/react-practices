import type { Blog } from "@/types"

import { baseApi } from "."

const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<Blog[], void>({
      query: () => `/categories`,
    }),
  }),
})

export const { useGetCategoriesQuery } = categoryApi
