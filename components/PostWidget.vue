<script setup lang="ts">
import type { post } from '@/types'
import type { PropType } from 'vue'
import moment from 'moment'

const { slug, categoriesNames } = defineProps({
  slug: { type: String, required: false },
  categoriesNames: { type: Array as PropType<string[]>, required: false },
})

const relatedPosts = ref<post[]>([])
if (slug) {
  // getSimilarPosts
  const { data: similarPosts } = await useAsyncGql('getSimilarPosts', {
    categories: categoriesNames,
    slug,
  })
  relatedPosts.value = similarPosts.value.posts as post[]
} else {
  // getRecentPosts
  const { data: recentPosts } = await useAsyncGql('getRecentPosts')
  relatedPosts.value = recentPosts.value.posts as post[]
}
</script>

<template>
  <div class="bg-white shadow-lg p-8 mb-8">
    <h3 class="text-xl mb-8 font-semibold border-b pb-0">
      {{ slug ? 'Related Posts' : 'Recent Post' }}
    </h3>
    <div v-for="relatedPost in relatedPosts" :key="relatedPost.id" class="flex item-center w-full mb-4">
      <div class="w-16 flex-none">
        <img
          :src="relatedPost.featuredImage.url"
          :alt="relatedPost.title"
          class="align-middle rounded-full w-14 h-14"
        />
      </div>
      <div class="flex-grow ml-4">
        <p class="text-gray-500 font-sans">{{ moment(relatedPost.createdAt).format('MMM DD, YYYY') }}</p>
        <NuxtLink :to="{ name: 'post-slug', params: { slug: relatedPost.slug } }" class="text-lg">
          {{ relatedPost.title }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
