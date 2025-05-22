<template>

  <!-- Section Title -->
  <div class="mb-6 mt-10 flex justify-between">
    <span class="text-2xl font-semibold">Title</span>

    <!-- Header Row: Filter & Add Button -->
    <div class="flex justify-end items-center mb-8 gap-3">
      <!-- Selected Tags Pills -->
      <div v-if="selectedTags.length && !selectedTags.includes('')" class="flex gap-2 mr-2">
        <span v-for="tag in selectedTags" :key="tag" class="flex items-center bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm">
          {{ tagLabel(tag) }}
          <button @click="removeTag(tag)" class="ml-1 text-lg leading-none focus:outline-none">&times;</button>
        </span>
      </div>
      <!-- Filter Dropdown Button -->
      <BaseDropdown
        v-model="selectedTags"
        :options="[
          { label: 'All', value: '' },
          { label: 'Default', value: 'default' },
          { label: 'image', value: 'image' },
          { label: 'checkbox', value: 'checkbox' }
        ]"
        :buttonClass="'bg-black text-white rounded-full px-6 py-2 font-bold text-base flex items-center gap-2 border-none shadow-none min-w-[110px] justify-center'"
      >
        <template #button>
          <span class="flex items-center gap-2 w-full justify-center">
            Filter
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M8 12h8m-4 6h4" />
            </svg>
          </span>
        </template>
      </BaseDropdown>
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

const tagLabel = (tag: string) => {
  if (tag === 'default') return 'Default'
  if (tag === 'image') return 'Image'
  if (tag === 'checkbox') return 'Checkbox'
  return tag
}

function removeTag(tag: string) {
  selectedTags.value = selectedTags.value.filter(t => t !== tag)
}

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

