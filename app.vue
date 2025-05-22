<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 p-4">
    <span class="inline-block border-2 border-black rounded-lg px-[13px] py-[3px] text-2xl font-lexend font-black text-[22px] leading-[28px] tracking-[1px] text-center text-gray-950">Test project</span>

    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useNoteTypes } from '@/composables/useNoteTypes'
useNoteTypes()
</script>
