import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit"

import { categoryApi } from "../api/categoryApi"
import type { RootState } from "../index"
import type { Category } from "@/types"

/**
 * Init category adapter
 */
const categoryAdapter = createEntityAdapter<Category>()

/**
 * Define inital state mutable
 */
const initialState = categoryAdapter.getInitialState()

/**
 * Category slice
 */
export const CategorySlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    //
  },
  extraReducers: (builder) => {
    /**
     * Set all categories on getCategories api fulfidlled
     */
    builder.addMatcher(
      categoryApi.endpoints.getCategories.matchFulfilled,
      (state, { payload }) => categoryAdapter.setAll(state, payload)
    )
  },
})

// Action creators are generated for each case reducer function
// export const {  } = CategorySlice.actions

export default CategorySlice.reducer

/**
 * Category selectors
 */
export const categorySelectors = categoryAdapter.getSelectors(
  (state: RootState) => state.category
)

// Export individual selectors for convenience
export const {
  selectById: selectCategoryById,
  selectAll: selectAllCategories,
  selectIds: selectCategoryIds,
  selectEntities: selectCategoryEntities,
  selectTotal: selectCategoryTotal,
} = categorySelectors
