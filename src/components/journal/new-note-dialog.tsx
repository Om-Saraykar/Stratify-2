"use client"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState, useEffect } from "react"

import { DataBox } from "@/components/journal/data-box"
import { ImageBox } from "@/components/journal/image-box"

interface ChecklistItem {
  id: string
  text: string
  checked: boolean
}

interface NewNoteDialogProps {
  onSave: (note: any) => void
  initialNote?: any
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function NewNoteDialog({
  onSave,
  initialNote,
  trigger,
}: NewNoteDialogProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [checklist, setChecklist] = useState<ChecklistItem[]>([])
  const [image, setImage] = useState<File | null>(null)

  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title || "")
      setDescription(initialNote.description || "")
      setChecklist(initialNote.checklist || [])
      setImage(null)
    } else {
      setTitle("")
      setDescription("")
      setChecklist([])
      setImage(null)
    }
  }, [initialNote, open])

  function handleSave() {
    const note = {
      ...initialNote,
      title,
      description,
      checklist,
      image: image ? URL.createObjectURL(image) : initialNote?.image,
    }

    onSave(note)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button type="button" variant="outline" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Note
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{initialNote ? "Edit Note" : "New Note"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Title, description, checklist */}
          <DataBox
            title={title}
            description={description}
            checklist={checklist}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
            onChecklistChange={setChecklist}
          />

          {/* Image upload */}
          <ImageBox image={image} onImageChange={setImage} />
        </div>

        <DialogFooter className="pt-4">
          <Button type="button" onClick={handleSave}>
            {initialNote ? "Update Note" : "Save Note"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
