<script setup lang="ts">
import type { post } from '~~/types';
import { Carousel, Navigation, Slide } from 'vue3-carousel'

const { data: featuredPosts } = await useAsyncGql('getFeaturedPosts')

const settings = ref({
  itemsToShow: 1,
  snapAlign: 'center',
  breakpoints: {
    // 100px and Up
    100: {
      itemsToShow: 1,
      snapAlign: 'center',
    },
    // 700px and up
    700: {
      itemsToShow: 1.5,
      snapAlign: 'center',
    },
    // 1024 and up
    1024: {
      itemsToShow: 3,
      snapAlign: 'center',
    },
    // 1490 and up
    1490: {
      itemsToShow: 4,
      snapAlign: 'start',
    },
    // 1700 and up
    1700: {
      itemsToShow: 5,
      snapAlign: 'start',
    },
  },
})
</script>

<template>
  <Carousel :settings="settings" class="mb-8">
    <Slide v-for="post in featuredPosts['posts']" :key="post.id">
      <FeaturedPostCard :post="(post as post)" />
    </Slide>
    <template #addons>
      <Navigation v-if="featuredPosts['posts'].length > 3" />
    </template>
  </Carousel>
</template>

<style lang="scss">
@import 'vue3-carousel/dist/carousel.css';
// slider icons
.carousel__next,
.carousel__prev {
  @apply text-center p-3 cursor-pointer bg-pink-600 rounded-full ring-1 ring-green-800;
  .carousel__icon {
    opacity: 0;
  }
}
.carousel__next {
  background-image: url('@/assets/icons/round-arrow-right-icon.svg') !important;
}
.carousel__prev {
  background-image: url('@/assets/icons/round-arrow-left-icon.svg') !important;
}
</style>
