"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAddCategoryMutation } from "@/store/api/categoryApi"
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

export default function CreateCategoryPage() {
  /**
   * Next.js router hook
   */
  const router = useRouter()

  /**
   * New category object
   */
  const [category, setCategory] = useState({
    name: "",
  })

  /**
   * Handle input on change event
   */
  const onChangeHandler = (name: string, value: string) => {
    setCategory({ ...category, [name]: value })
  }

  /**
   * Add category RTK Query hook
   */
  const [addCategory, { isLoading, isSuccess }] = useAddCategoryMutation()

  /**
   * Navigate user to categories page after creation succeeds
   */
  useEffect(() => {
    if (isSuccess) router.push("/categories")
  }, [isSuccess, router])

  /**
   * Handle add category button on click event
   */
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    addCategory(category)
  }

  return (
    <div className="container">
      <div className="w-full">
        <form onSubmit={handleAdd}>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Add New Category</FieldLegend>
              <FieldSeparator />
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="category-name">
                    Name
                  </FieldLabel>
                  <Input
                    id="category-name"
                    placeholder="Enter category name"
                    onChange={(e) => onChangeHandler("name", e.target.value)}
                    name="name"
                    required
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <Field orientation="horizontal">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Adding..." : "Add Category"}
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