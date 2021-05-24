<template>
  <article class="post">
    <el-row type="flex" justify="center">
      <div v-if="cartProducts.length">555555555</div>
      {{cartProducts}}
      <el-col
        :xs="12"
        :sm="12"
        :md="10" 
        :lg="10"
      >
        <header class="post-header">
          <div class="post-title">
            <h1>{{post.title}}</h1>
            <nuxt-link to="/">
              <i class="el-icon-back"></i>
            </nuxt-link>
          </div>
          <div class="post-info">
            <small>
              <i class="el-icon-time"></i>
              {{ new Date(post.date).toLocaleString() }}
            </small>
            <small>
              <i class="el-icon-view"></i>
              {{post.views}}
            </small>
          </div>
          <div class="post-image">
            <img
              :src="post.imageUrl"
              alt="post image"
            >
          </div>
        </header>
        <main class="post-content">
          <vue-markdown>{{post.text}}</vue-markdown>
        </main>
      </el-col>
      <el-col
        :xs="12"
        :sm="12"
        :md="3" 
        :lg="3"
      >
        <div class="aside">
          <h4>{{post.title}}</h4>
          <br><br><br>
          <small>Категория:</small>
          <b>{{post.categoryname}}</b>
          <br><br>
          <small>Цена:</small>
          <b>{{post.price}} <small>рублей</small></b>
          <br><br>
          
          <el-input
            placeholder="Please input"
            v-model="input"
            :disabled="true">
          </el-input>
          <br>
          <el-button circle> - </el-button>
          <el-button circle> + </el-button>
          <br><br>
          <button @click="addProduct(post)">Добавить в корзину</button>
        </div>
      </el-col>
    </el-row>

    <el-row type="flex" justify="center">
      <el-col
        :xs="12"
        :sm="12"
        :md="13" 
        :lg="13"
      >
        <br><br>
        <hr><br><br>
        <footer>
          <app-comment-form
            v-if="canAddComment"
            @created="createCommentHandler"
            :postId="post._id"
          />

          <div class="comments" v-if="post.comments.length">
            <app-comment
              v-for="comment in post.comments"
              :key="comment._id"
              :comment="comment"
            />
          </div>
          <div class="text-center" v-else>Комментариев нет</div>
        </footer>
      </el-col>
    </el-row>
    
  </article>
</template>

<script>
import AppComment from '@/components/main/Comment'
import AppCommentForm from '@/components/main/CommentForm'
import {mapGetters} from 'vuex'

export default {
  validate({params}) {
    return Boolean(params.id)
  },
  head() {
    return {
      title: `${this.post.title} | ${process.env.appName}`
    }
  },
  computed: {
    ...mapGetters({
      cartProducts: 'cart/productsList'
    })
  },
  async asyncData({store, params}) {
    const post = await store.dispatch('post/fetchById', params.id)
    await store.dispatch('post/addView', post)
    return {
      post: {...post, views: ++post.views}
    }
  },
  data() {
    return {
      canAddComment: true,
      input: '1'
    }
  },
  methods: {
    // ...mapActions([
    //   'cart/addProduct'
    // ]),
    createCommentHandler(comment) {
      this.post.comments.unshift(comment)
      this.canAddComment = false
    },
    addProduct(data){
      this.$store.commit('cart/addProduct', {
          product: data
        })
    },
  },
  components: {AppComment, AppCommentForm}
}
</script>

<style lang="scss" scoped>
  .post {
    max-width: 100%;
    margin: 0 auto;
  }

  .post-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .post-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .5rem;
  }

  .post-image img {
    width: 100%;
    height: auto;
  }

  .post-header {
    margin-bottom: 1.5rem;
  }

  .post-content {
    margin-bottom: 2rem;
  }

  .aside{
    padding-left: 30px;
  }
</style>

