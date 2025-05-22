<template>

  <!-- Section Title -->
  <div class="mb-6 mt-10 flex justify-between">
    <span class="text-2xl font-semibold">Title</span>

    <!-- Header Row: Filter & Add Button -->
    <div class="flex justify-end items-center mb-8 gap-3">
      <BaseButton @click="showAddModal = true" variant="primary" rounded="full" class="gap-2">
        <span class="text-2xl leading-none flex items-center">+</span>
        <span class="text-base flex items-center">Add New</span>
      </BaseButton>
    </div>
  </div>
  
  <!-- Notes Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <NoteCard
      v-for="note in filteredNotes"
      :key="note.id"
      :note="note"
      @click="goToNote(note.id)"
      @delete="confirmDelete(note.id)"
      class="min-h-[40vh] max-h-[40vh]"
    />
  </div>

  <!-- Add Note Modal -->
  <NoteForm
    v-if="showAddModal"
    ref="noteFormRef"
    :model-value="newNote"
    mode="add"
    @update:modelValue="val => newNote = val"
    @confirm="createNote"
    @cancel="resetAddNote"
    @delete="onDeleteFrom"
  />

  <!-- Delete Confirmation Modal -->
  <BaseDialog v-if="noteToDelete" @confirm="deleteNote" @cancel="noteToDelete = null">
    Are you sure you want to delete this note?
  </BaseDialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useNotesStore } from '@/store/notes'
import NoteCard from '@/components/Note/NoteCard.vue'
import BaseDialog from '@/components/Base/BaseDialog.vue'
import NoteForm from '@/components/Note/NoteForm.vue'
import type { NoteInput } from '@/store/notes'
import BaseButton from '~/components/Base/BaseButton.vue'

const store = useNotesStore()
const router = useRouter()

const noteFormRef = ref()

const filterType = ref('')
const noteToDelete = ref<string | null>(null)
const showAddModal = ref(false)
const selectedTags = ref<string[]>([''])

const newNote = ref<NoteInput>({
  title: '',
  type: 'default',
  content: '',
  imageUrl: ''
})

const filteredNotes = computed(() => {
  if (!selectedTags.value.length || selectedTags.value.includes('')) {
    return store.notes
  }
  return store.notes.filter(n => selectedTags.value.includes(n.type))
})

function goToNote(id: string) {
  router.push(`/note/${id}`)
}

function confirmDelete(id: string) {
  noteToDelete.value = id
}

function deleteNote() {
  if (noteToDelete.value) {
    store.deleteNote(noteToDelete.value)
    noteToDelete.value = null
  }
}

function resetAddNote() {
  newNote.value = {
    title: '',
    type: 'default',
    content: '',
    imageUrl: ''
  }
  showAddModal.value = false
}

function createNote() {
  const errors = noteFormRef.value?.validate() || []
  if (errors.length === 0) {
    store.addNote({ ...newNote.value })
    showAddModal.value = false
    resetAddNote()
  }
}

function onDeleteFrom() {
  // For add mode, just close the modal (no note to delete)
  showAddModal.value = false
}
</script>

