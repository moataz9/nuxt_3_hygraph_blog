<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <h1>
      how are you moataz,
      {{ route.params.slug }}
    </h1>
  </div>
</template>

<style lang="scss" scoped></style>
