<template>
  <div class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-xl shadow-card w-full max-w-md">
      <button
        @click="$emit('cancel')"
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl leading-none"
        aria-label="Close"
      >
        &times;
      </button>
      <div class="mb-4">
        <slot />
      </div>
      <div class="flex justify-end space-x-2">
        <BaseButton variant="secondary" @click="$emit('cancel')">Cancel</BaseButton>
        <BaseButton variant="primary" @click="$emit('confirm')">Confirm</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue'

defineEmits(['confirm', 'cancel'])
</script>