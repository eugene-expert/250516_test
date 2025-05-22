<template>
  <div class="relative" ref="dropdownRef">
    <button
      :class="buttonClass || 'flex items-center justify-between px-4 py-2 rounded-full bg-white text-sm shadow border border-gray-300 min-w-[150px]'"
      @click="toggleDropdown"
      type="button"
    >
      <template v-if="$slots.button">
        <slot name="button" />
      </template>
      <template v-else>
        <span class="truncate text-left">
          {{ selectedLabels.length ? selectedLabels.join(', ') : placeholder }}
        </span>
        <svg
          class="w-4 h-4 ml-2 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M19 9l-7 7-7-7" />
        </svg>
      </template>
    </button>

    <div
      v-if="isOpen"
      class="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-md border border-gray-200 max-h-60 overflow-y-auto"
    >
      <ul class="py-2">
        <li
          v-for="option in options"
          :key="option.value"
          class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
          @click.stop="toggleOption(option.value)"
        >
          <input
            type="checkbox"
            :checked="option.value === '' ? (modelValue.length === 0 || modelValue.includes('')) : modelValue?.includes(option.value)"
            class="accent-primary"
            readonly
          />
          <span>{{ option.label }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'

const props = defineProps<{
  modelValue: string[]
  options: { label: string; value: string }[]
  placeholder?: string
  buttonClass?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function toggleOption(value: string) {
  if (value === '') {
    // 'All' option toggled
    const allOptionSelected = props.modelValue.includes('')
    if (allOptionSelected) {
      // Deselect all
      emit('update:modelValue', [])
    } else {
      // Select all except 'All', then add 'All'
      emit('update:modelValue', [
        ...props.options.filter(opt => opt.value !== '').map(opt => opt.value),
        ''
      ])
    }
    return
  }
  const newValue = [...props.modelValue]
  const index = newValue.indexOf(value)
  if (index > -1) {
    newValue.splice(index, 1)
  } else {
    newValue.push(value)
  }
  emit('update:modelValue', newValue)
}

const selectedLabels = computed(() => {
  // If all options except 'All' are selected, show 'All'
  const allOption = props.options.find(opt => opt.value === '')
  const otherOptions = props.options.filter(opt => opt.value !== '')
  const allSelected = otherOptions.every(opt => props.modelValue.includes(opt.value))
  if (allSelected && allOption) {
    return [allOption.label]
  }
  return props.options
    .filter((opt) => props.modelValue.includes(opt.value) && opt.value !== '')
    .map((opt) => opt.label)
})

function onClickOutside(e: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
})

watch(
  () => props.modelValue,
  (newVal) => {
    const allOption = props.options.find(opt => opt.value === '')
    const otherOptions = props.options.filter(opt => opt.value !== '')
    const allSelected = otherOptions.every(opt => newVal.includes(opt.value))
    const hasAll = newVal.includes('')
    if (allOption) {
      if (allSelected && !hasAll) {
        // Add 'All' to modelValue
        emit('update:modelValue', [...newVal, ''])
      } else if (!allSelected && hasAll) {
        // Remove 'All' from modelValue
        emit('update:modelValue', newVal.filter(v => v !== ''))
      }
    }
  },
  { immediate: true, deep: true }
)
</script>
