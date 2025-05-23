<script setup lang="ts">
import { useRoute } from 'vue-router'
// import { computed } from 'vue'
import { computed, ref } from 'vue'
import { useNotesStore } from '@/store/notes'
import NoteForm from '@/components/Note/NoteForm.vue'
import BaseDialog from '@/components/Base/BaseDialog.vue'
import { useRouter } from 'vue-router'

const { params } = useRoute()
const notesStore = useNotesStore()
const note = computed(() => notesStore.notes.find(n => n.id === params.id))
const router = useRouter()
const showDeleteConfirm = ref(false)

function onSave() {
  router.push('/')
}

function onDelete() {
  showDeleteConfirm.value = true
}

function confirmDelete() {
  if (note.value) {
    notesStore.deleteNote(note.value.id)
    router.push('/')
  }
  // router.push('/')
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
    
    <!-- Delete Confirmation Modal -->
    <BaseDialog 
      v-if="showDeleteConfirm" 
      @confirm="confirmDelete" 
      @cancel="showDeleteConfirm = false"
    >
      Are you sure you want to delete this note?
    </BaseDialog>
  </div>
</template>
