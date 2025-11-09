"use client"

import Link from "next/link"
import { useGetBlogsQuery } from "@/store/api/blogApi"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function BlogsPage() {
  const { data, error, isLoading } = useGetBlogsQuery()

  if (isLoading) return <p className="text-center">Loading Blogs ...</p>

  return (
    <section className="container grid w-full items-center gap-6 pb-8 md:py-2">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Blogs
        </h1>
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
                <TableRow>
                  <TableCell className="font-medium">{blog.id}</TableCell>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>{blog.category_id}</TableCell>
                  <TableCell className="text-right">
                    <Link href="/">Edit</Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}
