<template>
  <Loading :active="isLoading" />
  <div class="contentWrap">
    <div class="wrap">
      <div class="wishWrap">
        <div class="wishlist">
          <h2>我的收藏</h2>
          <div v-if="favoriteItems.length">
            <p class="wishlistTitle is-hidden-touch">商品資訊</p>
            <div class="wishbox" v-for="item in favoriteItems" :key="item.id">
              <a href="#" class="wishbox-img">
                <img :src="item.imageUrl" :alt="item.title" />
              </a>
              <div class="wishbox-cnt">
                <div class="wishbox-info">
                  <p>{{ item.title }}</p>
                  <p>尺寸<span>F</span></p>
                </div>
                <div class="wishbox-price">
                  <p class="price-sale" v-if="item.origin_price == item.price">
                    <span>NT$</span>{{ item.price }}
                  </p>
                  <div v-else>
                    <p class="price-onsale"><span>NT$</span>{{ item.price }}</p>
                    <p class="price-origin">NT${{ item.origin_price }}</p>
                  </div>
                </div>
                <a href="#" class="btn-black " @click.prevent="addCart(item.id)"
                  >加入購物車&emsp; +</a
                >
              </div>
              <a
                href="#"
                class="btn-close"
                @click.prevent="delFavoriteItems(item.id)"
              ></a>
            </div>
          </div>
          <div v-else>
            <p class="cart-nothing">您的收藏清單目前是空的！</p>
            <div class="btnWrap">
              <router-link class="btn-black " to="/">回首頁 </router-link>
              <router-link
                :to="{ name: 'productlist', query: { category: 'ALL' } }"
                class="btn-second"
                >繼續購物
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Footer from '@/components/Footer.vue'
import emitter from '@/methods/emitter'
import localStorage from '@/mixins/localStorage'
import { mapActions } from 'pinia'
import statusStore from '@/stores/statusStore'
import productStore from '@/stores/productStore'

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
    ...mapActions(statusStore, ['pushMessage']),
    ...mapActions(productStore, ['addCart']),
    getFavoriteItems () {
      this.favoriteId = this.getLocalStorage()
      this.isLoading = true
      this.favoriteItems = []
      if (this.favoriteId.length) {
        this.favoriteId.forEach((item) => {
          const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${item}`
          this.$http.get(url).then((res) => {
            if (res.data.success) {
              this.favoriteItems.push(res.data.product)
              this.isLoading = false
            } else {
              this.isLoading = false
              this.pushMessage(false, '讀取', '發生錯誤，請重新整理頁面')
            }
          })
        })
      } else {
        this.isLoading = false
      }
    },
    delFavoriteItems (itemId) {
      this.favoriteId.splice(this.favoriteId.indexOf(itemId), 1)
      this.saveLocalStorage(this.favoriteId)
      emitter.emit('update-favorite')
      this.pushMessage(true, '更新', '已從收藏清單移除')
      this.getFavoriteItems()
    }
  },
  created () {
    this.getFavoriteItems()
  }
}
</script>
