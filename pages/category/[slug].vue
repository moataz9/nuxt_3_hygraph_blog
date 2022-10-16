<script setup lang="ts">
import type { post } from '~~/types'
import { getCategoryPosts } from '~~/services'

const route = useRoute()
let slug = route.params.slug as string
useHead({
  title: slug,
})
const { data: posts } = useLazyAsyncData('category-posts', () => getCategoryPosts(slug))
refreshNuxtData('category-posts')
</script>

<template>
  <main class="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12">
    <div class="lg:col-span-8 col-span-1">
      <template v-if="posts.result">
        <template v-if="!posts.result['postsConnection']['edges']['length']">
          <h2 class="text-center text-xl text-white mt-3">No posts for that Category, We Will add some More, stay tuned</h2>
        </template>
        <template v-for="post in posts.result['postsConnection']['edges']" :key="post.id">
          <PostCard :post="(post.node as post)" />
        </template>
      </template>
    </div>
    <div class="lg:col-span-4 col-span-1">
      <div class="lg:sticky relative top-8">
        <PostWidget />
        <CategoriesWidget />
      </div>
    </div>
  </main>
</template>
