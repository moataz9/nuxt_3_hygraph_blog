<script setup lang="ts">
import { author, post } from '~~/types'

const route = useRoute()
let slug = route.params.slug as string
useHead({
  title: slug,
})

const { data: post, pending: postPending } = useLazyAsyncData('post-data', () =>
  GqlGetPostContent({ slug })
)
const { data: comments } = useLazyAsyncData('comments-data', () => GqlGetComments({ slug }))
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
          <PostContent :post="(post.post as post)" />
          <Author :author="(post.post?.author as author)" />
          <CommentsForm />
          <Comments :comments="comments['comments']" />
        </template>
        <Loader v-else />
      </div>
      <div class="col-span-1 lg:col-span-4">
        <div class="relative lg:sticky top-8">
          <template v-if="!postPending">
            <PostWidget
              :slug="post['post']?.slug"
              :categoriesNames="post['post']?.categories.map(({ slug }) => slug)"
            />
            <CategoriesWidget />
          </template>
          <Loader v-else />
        </div>
      </div>
    </div>
  </div>
</template>
