<template>
  <div class="relative">
    <input
      v-bind="$attrs"
      :id="id"
      v-model="inputValue"
      :placeholder="focusedOrHasValue ? '' : placeholder"
      @focus="isFocused = true"
      @blur="isFocused = false"
      :class="[
        'block w-full px-3 pt-6 pb-2 border rounded-xl transition-all bg-gray-100',
        error ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500' :
        'border-gray-300 text-gray-900 focus:border-blue-500',
      ]"
    />
    <label
      :for="id"
      class="absolute left-3 top-2 text-gray-500 pointer-events-none transition-all duration-200 bg-gray-100 font-bold"
      :class="{
        'text-xs -top-2.5 left-2 bg-gray-100 px-1': focusedOrHasValue,
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
  label?: string
  placeholder?: string
  type?: string
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
