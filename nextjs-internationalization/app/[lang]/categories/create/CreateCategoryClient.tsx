"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAddCategoryMutation } from "@/store/api/categoryApi"
import { Dictorinary } from "@/types"
import { translate } from "@/utils/localization/helper"

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

type Props = {
  dictionary: Dictorinary | null
  lang: string
}

export default function CreateCategoryClient({ dictionary }: Props) {
  /**
   * Parse dictionary prop to object
   */
  dictionary = dictionary ? JSON.parse(dictionary.value) : null

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
              <FieldLegend>
                {translate("Add new category", dictionary)}
              </FieldLegend>
              <FieldSeparator />
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="category-name">
                    {translate("Name", dictionary)}
                  </FieldLabel>
                  <Input
                    id="category-name"
                    placeholder={translate("Enter category name", dictionary)}
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
                {isLoading
                  ? translate("Adding...", dictionary)
                  : translate("Save", dictionary)}
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => router.push("/categories")}
              >
                {translate("Cancel", dictionary)}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  )
}
