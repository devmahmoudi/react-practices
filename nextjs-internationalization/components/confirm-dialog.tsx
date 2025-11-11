"use client"

import { useEffect, useState } from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Interface for dialog configuration
interface ConfirmDialogConfig {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
}

// Interface for dialog state
interface ConfirmDialogState {
  isOpen: boolean
  config: ConfirmDialogConfig
  resolve: (value: boolean) => void
}

// Global dialog manager
class DialogManager {
  private static instance: DialogManager
  private setState: React.Dispatch<
    React.SetStateAction<ConfirmDialogState>
  > | null = null
  private defaultState: ConfirmDialogState = {
    isOpen: false,
    config: {
      title: "",
      message: "",
      confirmText: "Confirm",
      cancelText: "Cancel",
    },
    resolve: () => {},
  }

  private constructor() {}

  static getInstance(): DialogManager {
    if (!DialogManager.instance) {
      DialogManager.instance = new DialogManager()
    }
    return DialogManager.instance
  }

  setStateUpdater(
    updater: React.Dispatch<React.SetStateAction<ConfirmDialogState>>
  ) {
    this.setState = updater
  }

  async show(config: ConfirmDialogConfig): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.setState) {
        this.setState({
          isOpen: true,
          config: { ...this.defaultState.config, ...config },
          resolve,
        })
      } else {
        resolve(false)
      }
    })
  }

  close(value: boolean) {
    if (this.setState) {
      this.setState((prev) => ({
        ...prev,
        isOpen: false,
        resolve: () => {},
      }))
    }
  }
}

const dialogManager = DialogManager.getInstance()

export function ConfirmDialog() {
  const [state, setState] = useState<ConfirmDialogState>({
    isOpen: false,
    config: {
      title: "",
      message: "",
      confirmText: "Confirm",
      cancelText: "Cancel",
    },
    resolve: () => {},
  })

  // Register state updater with dialog manager
  useEffect(() => {
    dialogManager.setStateUpdater(setState)
    return () => {
      dialogManager.setStateUpdater(null as any)
    }
  }, [])

  const handleConfirm = () => {
    state.resolve(true)
    dialogManager.close(true)
  }

  const handleCancel = () => {
    state.resolve(false)
    dialogManager.close(false)
  }

  return (
    <AlertDialog
      open={state.isOpen}
      onOpenChange={(open) => {
        if (!open) handleCancel()
        setState((prev) => ({ ...prev, isOpen: open }))
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{state.config.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {state.config.message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>
            {state.config.cancelText}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            {state.config.confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

// Export the show function for global use
export const showConfirmDialog = async (
  config: ConfirmDialogConfig
): Promise<boolean> => {
  return dialogManager.show(config)
}

// Usage example:
/*
import { showConfirmDialog } from "./ConfirmDialog"

async function deleteBlogPost(blogId: string) {
  const confirmed = await showConfirmDialog({
    title: "Delete Blog Post",
    message: "Are you sure you want to delete this blog post? This action cannot be undone.",
    confirmText: "Delete",
    cancelText: "Cancel",
  })

  if (confirmed) {
    // Use the deleteBlog mutation from your API
    await deleteBlog(blogId)
  }
}
*/
