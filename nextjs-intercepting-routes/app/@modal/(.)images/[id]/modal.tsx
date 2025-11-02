"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function Modal({
  image,
}: {
  image: { id: number; title: string; url: string }
}) {
  return (
    <Dialog defaultOpen={true}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{image.title}</DialogTitle>
          <hr />
          <DialogDescription>
            <img src={image.url} alt={image.title} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
