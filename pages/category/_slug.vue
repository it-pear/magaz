<template>
  <div>
    hello category {{category}}
  </div>
</template>

<script>

export default {
  validate({params}) {
    return Boolean(params.slug)
  },
  async asyncData({store, params}) {
    const category = await store.dispatch('category/fetchBySlug', params.slug)
    return {
      category: {...category}
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>

