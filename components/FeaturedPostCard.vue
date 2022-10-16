<script setup lang="ts">
import type { post } from '@/types'
import moment from 'moment'
import type { PropType } from 'vue'

defineProps({
  post: { type: Object as PropType<post>, required: true },
})
</script>

<template>
  <div class="relative h-72 border w-full mx-3">
    <NuxtLink :to="{ name: 'post-slug', params: { slug: post.slug } }">
      <div
        class="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-72 bg-no-repeat bg-cover"
        :style="{ 'backgroundImage': `url('${post.featuredImage.url}')` }"
      ></div>
      <div class="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full">
        <p class="text-white mb-4 text-shadow font-semibold text-xs">
          {{ moment(post.createdAt).format('MMM DD, YYYY') }}
        </p>
        <p class="text-white mb-4 text-shadow font-semibold text-xl text-center">{{ post.title }}</p>
        <div class="flex items-center absolute bottom-5 w-full justify-center">
          <img
            :alt="post.author.name"
            height="30"
            width="30"
            class="align-middle drop-shadow-lg rounded-full"
            :src="post.author.photo.url"
          />
          <p class="inline align-middle text-white text-shadow ml-2 font-medium">
            {{ post.author.name }}
          </p>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped></style>
