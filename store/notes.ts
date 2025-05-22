import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'

export interface Note {
  id: string
  title: string
  type: 'default' | 'image' | 'checkbox'
  content?: string
  imageUrl?: string
  options?: string[]
}

export type NoteInput = Omit<Note, 'id'>

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [] as Note[],
  }),

  actions: {
    addNote(data?: Partial<Note>): string {
      const id = nanoid()
      const newNote: Note = {
        id,
        title: data?.title || '',
        type: data?.type || 'default',
        content: data?.content || '',
        imageUrl: data?.imageUrl || '',
        options: data?.options || [],
      }

      this.notes.push(newNote)
      return id
    },

    updateNote(id: string, updated: Partial<Note>) {
      const index = this.notes.findIndex(n => n.id === id)
      if (index !== -1) {
        this.notes[index] = {
          ...this.notes[index],
          ...updated,
        }
      }
    },

    deleteNote(id: string) {
      this.notes = this.notes.filter(n => n.id !== id)
    },
  },
})
