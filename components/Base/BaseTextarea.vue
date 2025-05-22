<template>
  <div class="relative w-full">
    <textarea
      :id="id"
      v-model="inputValue"
      :required="required"
      :disabled="disabled"
      :rows="rows"
      :placeholder="focusedOrHasValue ? '' : placeholder"
      @focus="isFocused = true"
      @blur="isFocused = false"
      :class="[
        'w-full px-3 pt-6 pb-2 border rounded-xl shadow-sm transition-colors duration-200 bg-gray-100',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
        'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
        'placeholder:text-gray-400',
        error ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500' :
        'border-gray-300 text-gray-900 focus:border-blue-500',
      ]"
      v-bind="$attrs"
    ></textarea>
    <label
      v-if="placeholder"
      :for="id"
      class="absolute left-3 top-2 text-gray-500 pointer-events-none transition-all duration-200 bg-gray-100 font-bold text-black"
      :class="{
        'text-xs -top-2.5 left-2 px-1': focusedOrHasValue,
        'text-base top-6': !focusedOrHasValue
      }"
    >
      {{ placeholder }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
const props = defineProps<{
  modelValue: string
  placeholder?: string
  rows?: number
  required?: boolean
  disabled?: boolean
  error?: string
  helper?: string
  id?: string
}>()
const emit = defineEmits(['update:modelValue'])
const inputValue = ref(props.modelValue ?? '')
const isFocused = ref(false)
const focusedOrHasValue = computed(() => isFocused.value || !!inputValue.value)
watch(() => props.modelValue, val => { inputValue.value = val })
watch(inputValue, val => emit('update:modelValue', val))
</script>
