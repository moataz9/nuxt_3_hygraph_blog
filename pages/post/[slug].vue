<script setup lang="ts">
import { getComments, getPostContent } from '~~/services'

const route = useRoute()
let slug = route.params.slug as string
useHead({
  title: slug,
})

const { data: post, pending: postPending } = useLazyAsyncData('post-data', () => getPostContent(slug))
const { data: comments } = useLazyAsyncData('comments-data', () => getComments(slug))
// ensure to update data if user navigated to sibling routes
//ex. navigate from post/1 to post/2
refreshNuxtData('post-data')
refreshNuxtData('comments-data')
</script>

<template>
  <div class="container mx-auto only:sm:px-10 mb-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div class="col-span-1 lg:col-span-8">
        <template v-if="!postPending">
          <PostContent v-if="post.result" :post="post.result['post']" />
          <Author v-if="post.result" :author="post.result['post']?.author" />
          <CommentsForm />
          <Comments v-if="comments.result" :comments="comments.result['comments']" />
        </template>
        <Loader v-else />
      </div>
      <div class="col-span-1 lg:col-span-4">
        <div class="relative lg:sticky top-8">
          <template v-if="!postPending">
            <PostWidget
              v-if="post.result"
              :slug="post.result['post']?.slug"
              :categoriesNames="post.result['post']?.categories.map(({ slug }) => slug)"
            />
            <CategoriesWidget />
          </template>
          <Loader v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
