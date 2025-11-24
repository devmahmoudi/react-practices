"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { RootState } from "@/store"
import { useAddBlogMutation } from "@/store/api/blogApi"
import { selectAllCategories } from "@/store/slice/categorySlice"
import { Dictorinary } from "@/types"
import { translate } from "@/utils/localization/helper"
import { useSelector } from "react-redux"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function CreateBlogClient({
  dictionary,
}: {
  dictionary: Dictorinary
}) {
  /**
   * Nextjs router hook
   */
  const router = useRouter()

  /**
   * New blog object
   */
  const [blog, setBlog] = useState({
    title: "",
    category_id: null,
    body: "",
  })

  /**
   * Handle inputs on change event
   * @param e Event
   */
  const onChangeHandler = (name: string, value: any) => {
    setBlog({ ...blog, [name]: value })
  }

  /**
   * Select all categories to make ability to select category for the new blog
   */
  const categories = useSelector((state: RootState) =>
    selectAllCategories(state)
  )

  /**
   * Add blog RTK Query hook
   */
  const [addBlog, { isLoading, isSuccess }] = useAddBlogMutation()

  /**
   * Navigate user to index page after draft succeed
   */
  useEffect(() => {
    if (isSuccess) router.push("/blogs")
  }, [isSuccess])

  /**
   * Handle draft blog button on click event
   */
  const handleDraft = (e) => {
    e.stopPropagation()
    e.preventDefault()
    addBlog(blog)
  }

  return (
    <div className="container">
      <div className="w-full">
        <form onSubmit={handleDraft}>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>
                {translate("Draft New Blog", dictionary)}
              </FieldLegend>
              <FieldSeparator />
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                    {translate("Title", dictionary)}
                  </FieldLabel>
                  <Input
                    id="checkout-7j9-card-name-43j"
                    placeholder={translate("Write blog title", dictionary)}
                    onChange={(e) => onChangeHandler("title", e.target.value)}
                    name="title"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="checkout-exp-month-ts6">
                    {translate("Category", dictionary)}
                  </FieldLabel>
                  <Select
                    defaultValue=""
                    onValueChange={(value) =>
                      onChangeHandler("category_id", value)
                    }
                    name="category_id"
                  >
                    <SelectTrigger id="checkout-exp-month-ts6">
                      <SelectValue
                        placeholder={translate(
                          "Select blog category",
                          dictionary
                        )}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={null}>None</SelectItem>
                      {categories.map((category) => (
                        <SelectItem value={category.id} key={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="checkout-7j9-optional-comments">
                    {translate("Body", dictionary)}
                  </FieldLabel>
                  <Textarea
                    id="checkout-7j9-optional-comments"
                    placeholder={translate("Write blog content", dictionary)}
                    className="resize-none"
                    onChange={(e) => onChangeHandler("body", e.target.value)}
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
            <Field orientation="horizontal">
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? translate("Sending ...", dictionary)
                  : translate("Draft", dictionary)}
              </Button>
              <Button variant="outline" type="button" onClick={() => router.push("/blogs")}>
                {translate("Cancel", dictionary)}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  )
}
