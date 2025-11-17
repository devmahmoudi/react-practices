"use client"
import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useGetCategoryQuery, useUpdateCategoryMutation } from "@/store/api/categoryApi"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function EditCategoryPage() {
  /**
   * Next.js router and params hooks
   */
  const router = useRouter()
  const { id } = useParams()

  /**
   * Get category data
   */
  const { data: category, isLoading: isFetching } = useGetCategoryQuery(id)

  /**
   * Category state for form
   */
  const [formData, setFormData] = useState({
    name: "",
  })

  /**
   * Populate form with category data when fetched
   */
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
      })
    }
  }, [category])

  /**
   * Handle input on change event
   */
  const onChangeHandler = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  /**
   * Update category RTK Query hook
   */
  const [updateCategory, { isLoading: isUpdating, isSuccess }] = useUpdateCategoryMutation()

  /**
   * Navigate user to categories page after update succeeds
   */
  useEffect(() => {
    if (isSuccess) router.push("/categories")
  }, [isSuccess, router])

  /**
   * Handle update category button on click event
   */
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    updateCategory({ id, ...formData })
  }

  /**
   * Loading state
   */
  if (isFetching) return <p className="text-center">Loading Category...</p>

  /**
   * Handle case where category is not found
   */
  if (!category) return <p className="text-center">Category not found</p>

  return (
    <div className="container">
      <div className="w-full">
        <form onSubmit={handleUpdate}>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Edit Category</FieldLegend>
              <FieldSeparator />
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="category-name">
                    Name
                  </FieldLabel>
                  <Input
                    id="category-name"
                    placeholder="Enter category name"
                    value={formData.name}
                    onChange={(e) => onChangeHandler("name", e.target.value)}
                    name="name"
                    required
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <Field orientation="horizontal">
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? "Updating..." : "Update Category"}
              </Button>
              <Button variant="outline" type="button" onClick={() => router.push("/categories")}>
                Cancel
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  )
}