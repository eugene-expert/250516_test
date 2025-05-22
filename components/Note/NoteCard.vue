<template>
  <div class="bg-white border rounded-2xl p-5 shadow hover:shadow-lg cursor-pointer flex flex-col h-full  overflow-hidden text-ellipsis" @click="$emit('click')">
    <h3 class="text-lg font-semibold mb-3 ">{{ note.title }}</h3>
    <!-- Image Card -->
    <div v-if="note.type === 'image'" >
      <div class="mb-3 flex-grow overflow-hidden rounded-xl bg-gray-200 min-h-[18vh] max-h-[18vh]">
        <img v-if="note.imageUrl" :src="note.imageUrl" alt="note image" class="object-cover w-full h-full" />
      </div>
      <div class="mb-3 min-h-0">
        <div class="text-sm text-gray-700 line-clamp-5 ">
          {{ note.content }}
        </div>
      </div>
    </div>
    <!-- Default Card -->
    <div v-else class="mb-3 min-h-0">
      <div class="text-sm text-gray-700 line-clamp-14 ">
        {{ note.content }}
      </div>
    </div>
    <!-- Checkbox Card -->
    <div v-if="note.type === 'checkbox'" class="mb-3 flex flex-col gap-2 flex-grow overflow-hidden">
      <div v-for="(option, i) in note.options?.filter(opt => opt && opt.trim())" :key="i" class="flex items-center gap-2 truncate">
        <input type="checkbox" class="accent-blue-500" />
        <span class="text-sm text-gray-800 truncate">{{ option }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ note: Object });
const emit = defineEmits(['click', 'delete']);
</script>


<style scoped>
.line-clamp-5 {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-14 {
  display: -webkit-box;
  -webkit-line-clamp: 14;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>