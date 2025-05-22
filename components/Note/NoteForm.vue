<template>
  <div class="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
    <div class="bg-white rounded-2xl p-8 w-full max-w-lg relative">
      <!-- Close Button -->
      <button @click="onCancel" class="absolute top-6 right-6 text-2xl text-gray-400 hover:text-black">&times;</button>
      <!-- Title -->
      <h2 class="text-2xl font-bold mb-6">{{ mode === 'edit' ? 'Edit Cart' : 'Create New Cart' }}</h2>
      <!-- Select Type -->
      <BaseSelect
        v-model="model.type"
        :placeholder="'Select type of card'"
        class="mb-4"
        :error="!model.type ? 'Type is required' : ''"
      >
        <option value="default">Default Cart Style</option>
        <option value="image">Image Cart Style</option>
        <option value="checkbox">Checkbox Cart Style</option>
      </BaseSelect>
      <!-- Header -->
      <BaseInput
        v-model="model.title"
        :placeholder="'Header'"
        class="mb-4"
        :error="!model.title?.trim() ? 'Header is required' : ''"
      />
      <!-- Image Upload (if type is image) -->
      <div v-if="model.type === 'image'" class="mb-4">
        <div
          class="flex flex-col items-center justify-center border-2 rounded-xl py-6 cursor-pointer hover:bg-blue-50 transition"
          :class="[
            !model.imageUrl?.trim() ? 'border-red-400' : 'border-blue-400'
          ]"
          @click="triggerFileInput"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 16v-8m0 0l-4 4m4-4l4 4" />
          </svg>
          <span class="text-blue-500 font-medium">Click to upload</span>
          <span class="text-gray-400 text-xs">or drag and drop<br>SVG, PNG, JPG or GIF</span>
          <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFileUpload" />
        </div>
        <div v-if="model.imageUrl" class="mt-2 flex justify-center">
          <img :src="model.imageUrl" alt="Uploaded" class="max-h-32 rounded-lg" />
        </div>
      </div>
      <!-- Description -->
      <BaseTextarea
        v-model="model.content"
        :placeholder="'Description'"
        class="mb-2"
        :rows="4"
        :error="!model.content?.trim() ? 'Description is required' : ''"
      />
      <!-- Checkbox Options (if type is checkbox) -->
      <div v-if="model.type === 'checkbox'" class="mb-4">
        <label class="block font-inter font-bold text-sm mb-4">Add option</label>
        <div v-for="(option, idx) in model.options" :key="idx" class="flex items-center gap-2 mb-2">
          <BaseInput
            v-model="model.options[idx]"
            :placeholder="'Text Placeholder'"
            class="flex-1"
            :error="!model.options.some((opt: string) => opt.trim()) ? 'At least one option is required' : ''"
          />
          <button v-if="model.options.length > 1" @click="removeOption(idx)" type="button" class="text-gray-400 hover:text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        <BaseButton
          @click="addOption"
          type="button"
          class="mt-2 font-bold flex items-center justify-center gap-2 bg-green-600 text-white hover:bg-green-700"
          variant="secondary"
          size="lg"
          rounded="full"
          fullWidth
        >
          <span class="text-xl">+</span> Add option
        </BaseButton>
      </div>
      <!-- Action Buttons -->
      <div class="flex gap-3 mt-8 pt-6 border-t border-dashed border-gray-200 items-center">
        <BaseButton
          v-if="mode === 'edit'"
          @click="onDelete"
          variant="danger"
          size="lg"
          rounded="full"
          fullWidth
          class="font-bold gap-2 items-center"
          :inactiveDanger="mode === 'edit'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>

          Delete
        </BaseButton>
        <BaseButton
          @click="onConfirm"
          variant="primary"
          size="lg"
          rounded="full"
          fullWidth
          class="font-bold items-center"
          :disabled="validate().length > 0"
        >
          <!-- {{ mode === 'edit' ? 'Save' : 'Create' }} -->
          <template v-if="mode === 'edit'">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Save
          </template>
          <template v-else>
            Create
          </template>
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseInput from '../Base/BaseInput.vue'
import BaseTextarea from '../Base/BaseTextarea.vue'
import BaseSelect from '../Base/BaseSelect.vue'
import BaseButton from '../Base/BaseButton.vue'

const props = defineProps<{
  mode: 'add' | 'edit',
}>()
const emit = defineEmits(['confirm', 'delete', 'cancel'])

// Use defineModel for v-model integration
const model = defineModel<any>()

// Watch for type changes made *within* the form and initialize/clear fields
watch(() => model.value?.type, (newType, oldType) => {
  // Clear fields that are not relevant to the new type
  if (newType !== 'default') {
    model.value.content = ''; // Clear content if not default
  }
  if (newType !== 'image') {
    model.value.imageUrl = ''; // Clear imageUrl if not image
  }
  if (newType !== 'checkbox') {
    model.value.options = []; // Clear options if not checkbox
  }

  // Initialize fields relevant to the new type if they are currently empty/undefined or based on type logic
  // Ensure options is an array for checkbox type
  if (newType === 'checkbox') {
     if (model.value.options === undefined || model.value.options === null || model.value.options.length === 0 || oldType !== 'checkbox') {
         model.value.options = ['']; // Initialize options for new checkbox if switching to it or if empty
     }
  } else if (model.value.options !== undefined && model.value.options !== null && model.value.options.length > 0) {
      // If switching away from checkbox and options had content, potentially clear based on parent model structure needs
      // For simplicity and to avoid unexpected data, clear if not checkbox
       model.value.options = [];
  }
});

const fileInput = ref<HTMLInputElement | null>(null)
function triggerFileInput() {
  fileInput.value?.click()
}
function handleFileUpload(e: Event) {
  const file = (e.target as HTMLInputElement)?.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (ev) => {
      // Update the model directly
      model.value.imageUrl = ev.target?.result as string;
    }
    reader.readAsDataURL(file)
  }
}
function addOption() {
  // Ensure options is an array before pushing
  if (!Array.isArray(model.value.options)) {
      model.value.options = [];
  }
  model.value.options.push('')
}
function removeOption(idx: number) {
   // Ensure options is an array before splicing
   if (Array.isArray(model.value.options)) {
      model.value.options.splice(idx, 1)
   }
}

// Validation logic remains the same
const errors = ref<string[]>([])

function validate() {
  errors.value = []
  // Use model.value for validation checks
  if (!model.value.title?.trim()) errors.value.push('Header is required')
  if (!model.value.type) errors.value.push('Type is required')
  if (model.value.type === 'image' && !model.value.imageUrl?.trim()) {
    errors.value.push('Image is required')
  }
  if (model.value.type !== 'image' && !model.value.content?.trim()) {
    errors.value.push('Description is required')
  }
  if (model.value.type === 'checkbox') {
    // Check if options is an array before calling some
    const hasValidOption = Array.isArray(model.value.options) ? model.value.options.some((opt: string) => opt.trim()) : false;
    if (!hasValidOption) {
      errors.value.push('At least one checkbox option is required')
    }
  }
  return errors.value
}

defineExpose({ validate })

// Emitting actions directly
function onConfirm() {
  emit('confirm')
}
function onDelete() {
  emit('delete')
}
function onCancel() {
  emit('cancel')
}
</script>
