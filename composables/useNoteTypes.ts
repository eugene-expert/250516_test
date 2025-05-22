export function useNoteTypes() {
  const editorMap: Record<string, any> = {
    default: () => import('@/components/Note/types/NoteDefault.vue'),
    image: () => import('@/components/Note/types/NoteImage.vue'),
    checkbox: () => import('@/components/Note/types/NoteCheckbox.vue'),
  }

  const rendererMap: Record<string, any> = {
    default: () => import('@/components/Note/types/NoteDefault.vue'),
    image: () => import('@/components/Note/types/NoteImage.vue'),
    checkbox: () => import('@/components/Note/types/NoteCheckbox.vue'),
  }

  const getEditorComponentByType = (type: string) => editorMap[type] || editorMap.default
  const getRendererComponentByType = (type: string) => rendererMap[type] || rendererMap.default

  return { getEditorComponentByType, getRendererComponentByType }
}
