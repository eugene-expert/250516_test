<template>
  <button
    :class="[
      'inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
      // Size variants
      size === 'sm' ? 'px-3 py-1.5 text-sm' :
      size === 'md' ? 'px-4 py-2 text-sm' :
      'px-5 py-2.5 text-base',
      // Style variants
      inactiveDanger ? 'bg-[#B3261E29] text-red-700' : // Inactive danger style
      variant === 'primary' ? 'bg-[#007AFF] text-white hover:bg-blue-[#0075F5] focus:ring-blue-500' :
      variant === 'secondary' ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500' :
      variant === 'danger' ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500' :
      variant === 'ghost' ? 'text-gray-600 hover:bg-gray-100 focus:ring-gray-500' :
      'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
      // Shape variants
      rounded === 'full' ? 'rounded-full' :
      rounded === 'lg' ? 'rounded-lg' :
      'rounded-md',
      // Full width
      fullWidth ? 'w-full' : '',
      // Disabled state
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    ]"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  rounded?: 'full' | 'lg' | 'md'
  fullWidth?: boolean
  disabled?: boolean
  inactiveDanger?: boolean
}>()
</script>
