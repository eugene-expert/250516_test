<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useNotesStore } from '@/store/notes'
import NoteForm from '@/components/Note/NoteForm.vue'
import { useRouter } from 'vue-router'

const { params } = useRoute()
const notesStore = useNotesStore()
const note = computed(() => notesStore.notes.find(n => n.id === params.id))
const router = useRouter()

function onSave() {
  router.push('/')
}
function onDelete() {
  if (note.value) {
    notesStore.deleteNote(note.value.id)
  }
  router.push('/')
}
function onCancel() {
  router.push('/')
}
</script>

<template>
  <div class="p-6" v-if="note">
    <NoteForm
      :model-value="note"
      mode="edit"
      @update:modelValue="notesStore.updateNote(note.id, $event)"
      @confirm="onSave"
      @delete="onDelete"
      @cancel="onCancel"
    />
  </div>
</template>
