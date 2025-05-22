<template>
  <div class="relative w-full">
    <select
      :id="id"
      v-model="inputValue"
      @focus="isFocused = true"
      @blur="isFocused = false"
      :required="required"
      :disabled="disabled"
      :class="[
        'w-full border px-3 pt-6 pb-2 rounded-xl outline-none  bg-gray-100',
        'transition-all',
        'focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
        'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
        error ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500' :
        'border-gray-300 text-gray-900 focus:border-blue-500',
      ]"
    >
      <option value="" disabled hidden></option>
      <slot />
    </select>
    <label
      v-if="placeholder"
      :for="id"
      class="absolute left-3 top-2 pointer-events-none transition-all duration-200 bg-gray-100 font-bold text-gray-600"
      :class="{
        'text-xs -top-2.5 left-2 px-1': focusedOrHasValue,
        'text-base top-6': !focusedOrHasValue
      }"
    >
      {{ placeholder }}
    </label>
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    <p v-else-if="helper" class="mt-1 text-sm text-gray-500">{{ helper }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
const props = defineProps<{
  modelValue: string
  placeholder: string
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
