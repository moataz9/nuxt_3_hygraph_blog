<script setup lang="ts">
const { data: categoriesData, pending } = await useAsyncGql('getCategories')
</script>

<template>
  <div class="only:sm:px-10 mb-8">
    <div class="border-b w-full inline-block border-white py-8">
      <div class="md:float-left block">
        <NuxtLink to="/">
          <span class="cursor-pointer font-bold text-4xl text-white"> Nuxt 3 Hygraph Blog </span>
        </NuxtLink>
      </div>
      <div class="hidden md:float-left md:contents" v-if="!pending">
        <NuxtLink
          v-for="category in categoriesData['categories']"
          :key="category.id"
          :to="{ name: 'category-slug', params: { slug: category.slug } }"
        >
          <span class="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
            {{ category.name }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
