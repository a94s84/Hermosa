<template>
  <Loading :active="isLoading"></Loading>
  <div class="contentWrap">
    <div class="wrap">
      <div class="memberWrap_inline">
        <div class="wishlist">
          <h2>我的收藏</h2>
          <div v-if="favoriteItems.length">
            <p class="wishlistTitle is-hidden-touch">商品資訊</p>
            <div class="wishbox" v-for="item in favoriteItems" :key="item.id">
              <a href="#" class="wishbox_img">
                  <img :src="item.imageUrl">
              </a>
              <div class="wishbox_cnt">
                  <div class="wishbox_info">
                      <p>{{item.title}}</p>
                      <p>尺寸<span>F</span></p>
                  </div>
                  <div class="wishbox_price">
                      <p class="price_sale" v-if="item.origin_price == item.price"><span>NT$</span>{{item.price}}</p>
                      <div v-else>
                        <p class="price_onsale"><span>NT$</span>{{item.price}}</p>
                        <p class="price_origin">NT${{item.origin_price}}</p>
                      </div>
                  </div>
                  <a type="button" class="btn_black" @click.prevent="addCart(item.id)">加入購物車&emsp; +</a>
              </div>
              <a  type="button" class="btn_close" @click.prevent="delFavoriteItems(item.id)"></a>
            </div>
          </div>
          <div v-else>
            <p class="cart_nothing">您的收藏清單目前是空的！</p>
              <div class="btnWrap">
              <router-link class="btn_black" to="/">回首頁 </router-link>
              <router-link :to="{ name: 'productlist', query: { category: 'ALL' }}"  class="btn_second">繼續購物 </router-link>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
import Footer from '@/components/Footer.vue'
import emitter from '@/methods/emitter'
import localStorage from '@/mixins/localStorage'
export default {
  data () {
    return {
      favoriteId: [],
      favoriteItems: [],
      isLoading: false
    }
  },
  mixins: [localStorage],
  inject: ['emitter'],
  components: {
    Footer
  },
  methods: {
    getFavoriteItems () {
      this.favoriteId = this.getLocalStorage()
      this.isLoading = true
      this.favoriteItems = []
      if (this.favoriteId.length) {
        this.favoriteId.forEach((item) => {
          const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${item}`
          this.$http.get(url).then((res) => {
            this.isLoading = false
            if (res.data.success) {
              this.favoriteItems.push(res.data.product)
            }
          })
        })
      } else {
        this.isLoading = false
      }
    },
    addCart (id, qty = 1) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post(url, { data: cart }).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          emitter.emit('updateCart')
          this.$httpMessageState(res, res.data.message)
        }
      })
    },
    delFavoriteItems (itemId) {
      this.favoriteId.splice(this.favoriteId.indexOf(itemId), 1)
      this.saveLocalStorage(this.favoriteId)
      this.emitter.emit('update-favorite')
      this.emitter.emit('push-message', {
        style: 'warning',
        title: '商品已從收藏清單移除'
      })
      this.getFavoriteItems()
    }
  },
  created () {
    this.getFavoriteItems()
  }
}
</script>
