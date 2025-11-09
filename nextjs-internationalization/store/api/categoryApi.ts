import type { Category } from "@/types"

import { baseApi } from "."

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<Category[], void>({
      query: () => `/categories`,
    }),
  }),
})

export const { useGetCategoriesQuery } = categoryApi
