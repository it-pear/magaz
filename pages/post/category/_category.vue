<template>
  <article>
    <ul>
      {{posts}}
    </ul>
  </article>
</template>

<script>


export default {
  async asyncData({store, params}) {
    const posts = await store.dispatch('post/fetchCat', params.category)
    return {posts}
  }

}
</script>

<style lang="scss" scoped>
</style>

