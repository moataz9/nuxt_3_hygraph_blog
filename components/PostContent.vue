<script setup lang="ts">
import type { post } from '@/types'
import type { PropType } from 'vue'
import moment from 'moment'

defineProps({
  post: { type: Object as PropType<post> },
})
</script>

<template>
  <div class="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
    <div class="relative overflow-hidden shadow-md mb-6">
      <img
        :src="post?.featuredImage.url"
        :alt="post?.title"
        class="object-top h-full w-full rounded-t-lg"
      />
    </div>
    <div class="px-4 lg:px-0">
      <div class="flex items-center mb-8 w-full">
        <div class="flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
          <img
            :src="post?.author.photo.url"
            :alt="post?.author.name"
            height="30"
            width="30"
            class="align-middle rounded-full"
          />
          <p class="inline align-middle text-grey-700 ml-2 text-lg">{{ post?.author.name }}</p>
        </div>
        <div class="font-medium text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 inline mr-2 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{{ moment(post?.createdAt as moment.MomentInput).format('MMM DD, YYYY') }}</span>
        </div>
      </div>
      <h1 class="mb-8 text-3xl font-semibold">{{ post?.title }}</h1>
      <div v-for="(childGroup, index) in post?.content?.json.children" :key="index">
        <span
          v-for="child in childGroup.children"
          :class="{
            'text-lg my-1': true,
            'font-bold': child.bold,
            'underline': child.underline,
            'italic': child.italic,
            'inline-block px-2 bg-slate-300 rounded-lg': child.code,
          }"
        >
          {{ child.text }}
        </span>
        <br />
        <br />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
