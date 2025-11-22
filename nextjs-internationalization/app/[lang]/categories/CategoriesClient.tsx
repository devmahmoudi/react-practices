"use client"

import Link from "next/link"
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/store/api/categoryApi"
import { CirclePlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { showConfirmDialog } from "@/components/confirm-dialog"

import { translate } from "../../../utils/localization/client"
import { Dictorinary } from "@/types"

type Props = {
  dictionary: Dictorinary | null
  lang: string
}

export default function CategoriesClient({ dictionary }: Props) {
  /**
   * Parse dictionary prop to object
   */
  dictionary = dictionary ? JSON.parse(dictionary.value) : null

  /**
   * Get categories list
   */
  const { data, isLoading } = useGetCategoriesQuery()

  /**
   * Delete category
   */
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation()

  /**
   * Delete category button on click handler
   */
  const deleteCategoryHandler = async (categoryId: number) => {
    const confirmed = await showConfirmDialog({
      title: `Delete Category ${categoryId}`,
      message:
        "Are you sure you want to delete this category? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
    })
    if (confirmed) {
      deleteCategory(categoryId)
    }
  }

  /**
   * Loading state
   */
  if (isLoading) return <p className="text-center">Loading Categories...</p>

  return (
    <section className="container grid w-full items-center gap-6 pb-8 md:py-2">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <div className="flex justify-between align-middle w-full mb-3">
          <h3 className="text-2xl font-extrabold leading-tight tracking-tighter md:text-3xl">
            {translate("Categories", dictionary)}
          </h3>
          <Button className="pl-2">
            <Link href={"/categories/create"} className="flex align-middle">
              <CirclePlus className="pr-2 box-content" />
              <span className="pt-[2px]">
                {translate("Add new category", dictionary)}
              </span>
            </Link>
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{translate("Name", dictionary)}</TableHead>
              <TableHead className="text-right">
                {translate("Actions", dictionary)}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.length &&
              data.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={`/categories/edit/${category.id}`}
                      className="text-blue-400"
                    >
                      Edit
                    </Link>
                    <span
                      className="ml-3 text-red-400 cursor-pointer"
                      onClick={() => deleteCategoryHandler(category.id)}
                    >
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
