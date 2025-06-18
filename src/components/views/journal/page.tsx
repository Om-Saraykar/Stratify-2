"use client"

import { useState } from "react"
import { NewNoteDialog } from "@/components/journal/new-note-dialog"
import { NoteCard } from "@/components/journal/note-card"

export default function DashboardPage() {
  const [notes, setNotes] = useState<any[]>([])

  // Add a new note
  const handleNoteAdd = (note: any) => {
    setNotes((prev) => [note, ...prev])
  }

  // Update a note by index
  const handleNoteEdit = (index: number, updatedNote: any) => {
    setNotes((prev) => prev.map((n, i) => (i === index ? updatedNote : n)))
  }

  // Delete a note by index
  const handleNoteDelete = (index: number) => {
    setNotes((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Notes</h1>
        <NewNoteDialog onSave={handleNoteAdd} />
      </div>

      {/* Note Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {notes.map((note, index) => (
          <NoteCard
            key={index}
            {...note}
            onEdit={(updatedNote) => handleNoteEdit(index, updatedNote)}
            onDelete={() => handleNoteDelete(index)}
          />
        ))}
      </div>
    </div>
  )
}
