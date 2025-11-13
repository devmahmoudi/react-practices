import type { Category } from "@/types"

import { baseApi } from "."

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // READ: Get all categories
    getCategories: build.query<Category[], void>({
      query: () => `/categories`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "CATEGORY" as const, id })),
              "CATEGORY",
            ]
          : ["CATEGORY"],
    }),

    // READ: Get single category by ID
    getCategory: build.query<Category, string>({
      query: (id) => `/categories/${id}`,
      providesTags: (result, error, id) => [{ type: "CATEGORY" as const, id }],
    }),

    // CREATE: Add new category
    addCategory: build.mutation<Category, Omit<Category, "id">>({
      query: (body) => ({
        url: "/categories",
        method: "POST",
        body,
      }),
      invalidatesTags: ["CATEGORY"],
    }),

    // UPDATE: Update existing category
    updateCategory: build.mutation<
      Category,
      Partial<Category> & Pick<Category, "id">
    >({
      query: ({ id, ...body }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "CATEGORY" as const, id },
        "CATEGORY",
      ],
    }),

    // DELETE: Delete a category
    deleteCategory: build.mutation<void, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "CATEGORY" as const, id },
        "CATEGORY",
      ],
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi
