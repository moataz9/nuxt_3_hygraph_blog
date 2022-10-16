<script setup lang="ts">
import type { post } from '@/types'
import type { PropType } from 'vue'

import moment from 'moment'

defineProps({
  post: {
    type: Object as PropType<post>,
  },
})
</script>

<template>
  <div class="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
    <div class="relative overflow-hidden shadow-md pb-80 mb-6">
      <img
        :src="post?.featuredImage.url"
        :alt="post?.title"
        class="object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
      />
    </div>
    <h2
      class="transition duration-700 text-center mb-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold"
    >
      <NuxtLink :to="{ name: 'post-slug', params: { slug: post?.slug } }"> {{ post?.title }}</NuxtLink>
    </h2>
    <div class="lg:flex text-center items-center justify-center mb-8 w-full">
      <div class="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
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
    <p class="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8">{{ post?.excerpt }}</p>
    <div class="text-center">
      <NuxtLink :to="{ name: 'post-slug', params: { slug: post?.slug } }">
        <span
          class="transition duration-500 transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
          >Contine Reading</span
        >
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
