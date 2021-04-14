<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col
        :xs="6"
        :sm="6"
        :md="4" 
        :lg="4"
        v-for="item in category"
        :key="item._id"
        :item="item"  
        class="el-col-category"
      >
        <div class="category"> 
          <NuxtLink :to="`post/category/`+item.slug">
            <div class="category-img">
              <img :src="item.imageUrl" alt="">
            </div>
            <p>{{item.title}}</p>
          </NuxtLink>
        </div>
      </el-col>
    </el-row>

    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="18" :md="12" :lg="14">
        <app-post
          v-for="post in posts"
          :key="post._id"
          :post="post"
        />
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
import AppPost from '@/components/main/Post'
export default {
  head: {
    title: `Главная | ${process.env.appName}`
  },
  async asyncData({store}) {
    const posts = await store.dispatch('post/fetch')
    const category = await store.dispatch('category/fetch')
    return {posts, category}
  },
  components: {
    AppPost
  }
}
</script>

<style lang="scss" scoped>
  .el-col {
    display: flex;
  }
  .el-col-category{
    justify-content: center;
  }
  .category {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-bottom: 20px;
    .category-img {
      width: 150px;
      height: 150px;
      img{
        object-fit: contain;
        width: 100%;
        text-align: center;
      }
    }
    p { 
      font-size: 18px;
      opacity: 0.8;
    }
  }
  .post {
    max-width: 33.333333333%;
    flex: 0 0 33.333333333%;
    margin: 0 15px;
  }
</style>

<style lang="scss">
  .post[data-v-4f140dab] {
    .post-body {
      height: 200px;
      overflow: hidden;
      img {
        object-fit: contain;
        width: 100%;
      }
    }
  }
</style>