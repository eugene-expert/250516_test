export type NoteType = 'default' | 'image' | 'checkbox'

export interface BaseNote {
  id: string
  title: string
  description: string
  type: NoteType
}

export interface ImageNote extends BaseNote {
  type: 'image'
  imageUrl?: string
}

export interface CheckboxNote extends BaseNote {
  type: 'checkbox'
  items: { label: string; checked: boolean }[]
}

export type Note = BaseNote | ImageNote | CheckboxNote
