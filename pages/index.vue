<script setup lang="ts">
import type { post } from '~~/types'

useHead({ title: 'Home', })

const { data: posts, pending } = await useAsyncGql('getPosts')
</script>

<template>
  <main class="grid grid-cols-1 lg:grid-cols-12 gap-12">
    <div class="lg:col-span-8 col-span-1">
      <template v-if="!pending" v-for="post in posts['postsConnection']['edges']" :key="post.id">
        <PostCard :post="(post.node as post)" />
      </template>
      <Loader v-else/>
    </div>
    <div class="lg:col-span-4 col-span-1">
      <div class="lg:sticky relative top-8">
        <PostWidget />
        <CategoriesWidget />
      </div>
    </div>
  </main>
</template>
