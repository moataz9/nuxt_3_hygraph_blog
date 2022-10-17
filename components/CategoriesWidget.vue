<script setup lang="ts">
const { data: categories } = await useAsyncGql('getCategories')
</script>

<template>
  <div class="bg-white showdow-lg rounded-lg p-8 mb-8 pb-8">
    <h3 class="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
    <template v-for="category in categories['categories']" :key="category.id">
      <NuxtLink :to="{ name: 'category-slug', params: { slug: category.slug } }">
        <span class="cursor-pointer block pb-3 mb-3">{{ category.name }}</span>
      </NuxtLink>
    </template>
  </div>
</template>
