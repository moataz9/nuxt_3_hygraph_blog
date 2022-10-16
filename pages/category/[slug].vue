<script setup lang="ts">
const route = useRoute()
let slug = route.params.slug as string
useHead({
  title: slug
})
</script>

<template>
  <div>
    <h1>
      {{ route.params.slug }}
    </h1>
  </div>
</template>

<style lang="scss" scoped></style>
