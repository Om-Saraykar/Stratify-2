import { MoreVertical, Pencil, Trash2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NewNoteDialog } from "./new-note-dialog"
import Image from "next/image"
import { useState } from "react"

interface NoteCardProps {
  title: string
  description?: string
  image?: string
  checklist?: { id: string; text: string; checked: boolean }[]
  onEdit?: (note: any) => void
  onDelete?: () => void
}

export function NoteCard({
  title,
  description,
  image,
  checklist = [],
  onEdit,
  onDelete,
}: NoteCardProps) {
  const [editOpen, setEditOpen] = useState(false)

  return (
    <>
      <div className="bg-white rounded-xl border shadow-sm p-4 flex flex-col gap-2 relative group hover:shadow-md transition">
        {/* Top right menu icon with dropdown */}
        {(onEdit || onDelete) && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button type="button" aria-label="Open note menu">
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-28">
                {onEdit && (
                  <DropdownMenuItem onClick={() => setEditOpen(true)}>
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <DropdownMenuItem onClick={onDelete} className="text-red-500">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Image */}
        {image && (
          <div className="rounded-md overflow-hidden h-40 w-full">
            <Image
              src={image}
              alt="Note image"
              width={400}
              height={160}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg font-semibold leading-tight">{title}</h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {description}
          </p>
        )}

        {/* Checklist */}
        {checklist.length > 0 && (
          <div className="flex flex-col gap-1 mt-1">
            {checklist.map((item) => (
              <label key={item.id} className="flex items-start gap-2 text-sm">
                <Checkbox checked={item.checked} />
                <span
                  className={
                    item.checked ? "line-through text-muted-foreground" : ""
                  }
                >
                  {item.text}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      {onEdit && (
        <NewNoteDialog
          onSave={(note) => {
            setEditOpen(false)
            onEdit(note)
          }}
          initialNote={{ title, description, checklist, image }}
          trigger={<span className="hidden" />}
          open={editOpen}
          onOpenChange={setEditOpen}
        />
      )}
    </>
  )
}
