<script setup lang='ts'>
const route = useRoute()
useHead({
  title: route.params.slug as string
})
</script>

<template>
  <div>
    {{ route.params.slug }}
  </div>
</template>

<style lang="scss" scoped>

</style>