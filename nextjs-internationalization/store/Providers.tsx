"use client"

import { useEffect } from "react"
import { store } from "@/store"
import { categoryApi } from "@/store/api/categoryApi"
import { Provider } from "react-redux"

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Prefetch categories when the app loads
    store.dispatch(categoryApi.endpoints.getCategories.initiate())
  }, [])

  return <Provider store={store}>{children}</Provider>
}
