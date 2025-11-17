"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import type { RootState } from "@/store"
import { useGetBlogQuery, useUpdateBlogMutation } from "@/store/api/blogApi"
import { selectAllCategories } from "@/store/slice/categorySlice"
import { useSelector } from "react-redux"

import { Button } from "@/components/ui/button"
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
import { showConfirmDialog } from "@/components/confirm-dialog"

/**
 * EditBlogPage component for editing an existing blog post
 * @returns {JSX.Element} The rendered edit blog page
 */
export default function EditBlogPage() {
  /**
   * Next.js router hook for navigation
   */
  const router = useRouter()

  /**
   * Hook to get URL parameters
   */
  const { id } = useParams()

  /**
   * State for blog form data
   * @type {Object} Blog object with id, title, category_id, and body
   */
  const [blog, setBlog] = useState(null)

  /**
   * RTK Query hook to fetch blog data by ID
   */
  const {
    data: blogData,
    isLoading: isFetching,
    isError: isGetBlogError,
    error: getBlogError,
  } = useGetBlogQuery(id as string)

  /**
   * RTK Query hook to update blog
   */
  const [updateBlog, { isLoading: isUpdating, isSuccess }] =
    useUpdateBlogMutation()

  /**
   * Selector to get all categories from Redux store
   */
  const categories = useSelector((state: RootState) =>
    selectAllCategories(state)
  )

  /**
   * Effect to populate form with fetched blog data
   */
  useEffect(() => {
    if (blogData) {
      setBlog({
        id: blogData.id,
        title: blogData.title,
        category_id: blogData.category_id,
        body: blogData.body,
      })
    }
  }, [blogData])

  /**
   * Effect to navigate to blogs list after successful update
   */
  useEffect(() => {
    if (isSuccess) router.push("/blogs")
  }, [isSuccess, router])

  /**
   * Handle input changes in the form
   * @param {string} name - The name of the field
   * @param {any} value - The new value
   */
  const onChangeHandler = (name: string, value: any) => {
    setBlog({ ...blog, [name]: value })
  }

  /**
   * Handle form submission to update blog
   * @param {React.FormEvent} e - Form event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateBlog(blog)
  }

  /**
   * Handle cancel action with confirmation dialog
   * @returns {Promise<void>}
   */
  const handleCancel = async () => {
    const confirmed = await showConfirmDialog({
      title: "Cancel Edit",
      message:
        "Are you sure you want to cancel editing this blog post? Unsaved changes will be lost.",
      confirmText: "Yes, Cancel",
      cancelText: "Continue Editing",
    })

    if (confirmed) {
      router.push("/blogs")
    }
  }

  if (isGetBlogError)
    return (
      <div className="container">
        <p>Oh-uh, It seems there is a problem !</p>
        <p>{getBlogError}</p>
      </div>
    )

  /**
   * Render loading state while fetching blog data
   */
  if (isFetching || !blog) {
    return <div className="container">Loading...</div>
  }

  return (
    <div className="container">
      <div className="w-full">
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Edit Blog</FieldLegend>
              <FieldSeparator />
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="edit-blog-title">Title</FieldLabel>
                  <Input
                    id="edit-blog-title"
                    placeholder="Write blog title"
                    value={blog.title}
                    onChange={(e) => onChangeHandler("title", e.target.value)}
                    name="title"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="edit-blog-category">Category</FieldLabel>
                  <Select
                    defaultValue={blog.category_id.toString() || ""}
                    onValueChange={(value) =>
                      onChangeHandler(
                        "category_id",
                        value === "" ? null : value
                      )
                    }
                    name="category_id"
                  >
                    <SelectTrigger id="edit-blog-category">
                      <SelectValue placeholder="Select blog category" />
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
                  <FieldLabel htmlFor="edit-blog-body">Body</FieldLabel>
                  <Textarea
                    id="edit-blog-body"
                    placeholder="Write blog content"
                    className="resize-none"
                    value={blog.body}
                    onChange={(e) => onChangeHandler("body", e.target.value)}
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
            <Field orientation="horizontal">
              <Button type="submit" disabled={isUpdating || isFetching}>
                {isUpdating ? "Updating..." : "Update"}
              </Button>
              <Button variant="outline" type="button" onClick={handleCancel}>
                Cancel
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  )
}
