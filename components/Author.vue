<script setup lang="ts">
import type { author } from '@/types'
import type { PropType } from 'vue'

defineProps({
  author: { type: Object as PropType<author> },
})
</script>

<template>
  <div class="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
    <div class="absolute left-0 right-0 -top-14">
      <img
        :src="author?.photo.url"
        :alt="author?.name"
        class="align-middle rounded-full mx-auto"
        height="100"
        width="100"
      />
    </div>
    <h3 class="text-white my-4 text-xl font-bold">{{ author?.name }}</h3>
    <p class="text-white text-lg">{{ author?.bio }}</p>
  </div>
</template>
