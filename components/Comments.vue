<script setup lang="ts">
import type { comment } from '@/types'
import moment from 'moment'
import type { PropType } from 'vue'

defineProps({
  comments: { type: Array as PropType<comment[]> },
})
</script>

<template>
  <div class="bg-white shadow-lg rounded-lg p-8 pb-12 mb-0">
    <h3 class="text-xl mb-8 font-semibold border-b pb-4">{{ comments?.length }} comments</h3>
    <div v-for="comment in comments" class="border-b border-gray-100 mb-4 pb-4">
      <p class="mb-4">
        <span class="font-semibold">{{ comment.name }}</span>
        <span class="ml-2">on {{ moment(comment.createdAt).format('MMM DD, YYYY') }}</span>
      </p>
      <p class="text-gray-600 w-full">
        {{ comment.comment }}
      </p>
    </div>
  </div>
</template>
