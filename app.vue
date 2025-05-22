<!-- <template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template> -->


<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 p-4">
    <span class="inline-block border-2 border-black rounded-lg px-[13px] py-[3px] text-2xl font-lexend font-black text-[22px] leading-[28px] tracking-[1px] text-center text-gray-950">Test project</span>
    <!-- <header class="w-[173px] h-[38px] rounded-md border-2 border-[#0A0C11] px-3.25 py-0.75 gap-2.5">
      <h1 class="font-lexend font-black text-[22px] leading-[28px] tracking-[1px] text-center text-gray-950">Test project</h1>
    </header> -->

    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useNoteTypes } from '@/composables/useNoteTypes'
useNoteTypes()
</script>
