"use client"

import Link from "next/link"
import type { RootState } from "@/store"
import { useDeleteBlogMutation, useGetBlogsQuery } from "@/store/api/blogApi"
import { selectCategoryEntities } from "@/store/slice/categorySlice"
import type { Category } from "@/types"
import { CirclePlus } from "lucide-react"
import { useSelector } from "react-redux"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { showConfirmDialog } from "@/components/confirm-dialog"

export default function BlogsPage() {
  /**
   * Get blogs list
   */
  const { data, error, isLoading } = useGetBlogsQuery()

  /**
   * Delete blog
   */
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation()

  /**
   * Select categories
   */
  const categoryEntities = useSelector((state: RootState) =>
    selectCategoryEntities(state)
  ) as Record<number, Category>

  /**
   * Delete blog button on click handler
   */
  const deleteBlogHandler = async (blogId: number) => {
    const confirmed = await showConfirmDialog({
      title: `Delete Blog Post ${blogId}`,
      message:
        "Are you sure you want to delete this blog post? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
    })

    if(confirmed)
      deleteBlog(blogId)
  }

  /**
   * Loading state
   */
  if (isLoading) return <p className="text-center">Loading Blogs ...</p>

  return (
    <section className="container grid w-full items-center gap-6 pb-8 md:py-2">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <div className="flex justify-between align-middle w-full mb-3">
          <h3 className="text-2xl font-extrabold leading-tight tracking-tighter md:text-3xl">
            Blogs
          </h3>
          <Button className="pl-2">
            <Link href={"/blogs/create"} className="flex align-middle">
              <CirclePlus className="pr-2 box-content" />
              <span className="pt-[2px]">Draft New Blog</span>
            </Link>
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.length &&
              data.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell className="font-medium">{blog.id}</TableCell>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>
                    {categoryEntities[blog.category_id]?.name || "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/blogs/edit/${blog.id}`} className="text-blue-400">
                      Edit
                    </Link>
                    <span className="ml-3 text-red-400 cursor-pointer" onClick={() => deleteBlogHandler(blog.id)}>
                      Delete
                    </span>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}
