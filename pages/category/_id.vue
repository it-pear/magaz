<template>
  <div>
    hello category {{category}}
  </div>
</template>

<script>

export default {
  validate({params}) {
    return Boolean(params.id)
  },
  async asyncData({store, params}) {
    const category = await store.dispatch('category/fetchById', params.id)
    await store.dispatch('category/addView', category)
    return {
      category: {...category}
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>

