<script setup lang="ts">
import { getHomePosts } from '~~/services'
import type { post } from '~~/types';

useHead({
  title: 'Home',
})

const { data: posts } = useLazyAsyncData('posts-home', getHomePosts)
refreshNuxtData('posts-home')
</script>

<template>
  <main class="grid grid-cols-1 lg:grid-cols-12 gap-12">
    <div class="lg:col-span-8 col-span-1">
      <template v-if="posts.result" v-for="post in posts.result['postsConnection']['edges']" :key="post.id">
        <PostCard :post="(post.node as post)" />
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
