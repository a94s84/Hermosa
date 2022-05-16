<template>
  <div class="contentWrap">
   <div class="defaultWrap">
      <!-- 首頁大圖輪播 -->
      <swiper :slides-per-view="1" :space-between="50" :autoplay="{delay: 4000}"  :effect="'fade'" :loop="true"  :pagination="true" class="homeSlide">
        <swiper-slide>
          <router-link :to="{ name: 'productlist', query: { category: 'ALL' }}" >
              <picture>
                  <source srcset="../assets/img/banner1.png" media="(min-width: 1007px)">
                  <img src="../assets/img/banner_m1.png" alt="">
              </picture>
          </router-link>
        </swiper-slide>
        <swiper-slide>
          <router-link :to="{ name: 'productlist', query: { category: 'ALL' }}" >
              <picture>
                  <source srcset="../assets/img/banner2.png" media="(min-width: 1007px)">
                  <img src="../assets/img/banner_m2.png" alt="">
              </picture>
          </router-link>
        </swiper-slide>
      </swiper>
      <!-- NEW IN -->
      <section class="wrap newsIn">
          <h2 class="secTitle">NEW IN</h2>
          <swiper :slides-per-view="1" :space-between="35" :navigation="true" :loop="true"  :breakpoints="{768: {slidesPerView: 3,spaceBetween: 35}}" class="newinSlide">
            <swiper-slide class="pdbox" v-for="item in products.slice(-6)" :key="item.id">
                <router-link :to="`/product/${item.id}`">
                    <img :src="`${item.imageUrl}`">
                </router-link>
                <div class="pdinfo">
                    <div>
                        <router-link :to="`/product/${item.id}`">
                            <p class="pdbox_name">{{item.title}}</p>
                        </router-link>
                        <div v-if="item.origin_price !== item.price">
                            <p class="pdbox_price-origin">NT${{ item.origin_price}}</p>
                            <p class="pdbox_price-sale">NT${{ item.price}} <span>SALE</span></p>
                        </div>
                          <p class="pdbox_price" v-else>NT${{ item.origin_price}}</p>
                    </div>
                </div>
            </swiper-slide>
          </swiper>
      </section>
      <div class="text-center">
        <router-link :to="{ name: 'productlist', query: { category: 'ALL' }}" class="seeMore" >
            <i class="bi bi-plus-circle"></i>
        </router-link>
      </div>
      <div class="yotpo yotpo-pictures-widget" data-gallery-id="6278c5b7a23505074bee661f"> </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
// @ is an alias to /src
import Footer from '../components/Footer.vue'
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
import SwiperCore, { Navigation, Pagination, Autoplay, EffectFade }
from 'swiper'
import 'swiper/swiper-bundle.css'

SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade])

export default {
  data () {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: ''
      }
    }
  },
  components: {
    Footer, Swiper, SwiperSlide
  },
  methods: {
    getPdList () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(url).then((res) => {
        this.products = res.data.products
        this.isLoading = false
        // console.log(res.data.products)
      })
    }
  },
  created () {
    this.getPdList()
  },
  mounted () {
    (function e () {
      var e = document.createElement('script')
      e.type = 'text/javascript'
      e.async = true
      e.src = '//staticw2.yotpo.com/pDGrvh6zMbPahfy7HVe4OdMBJmbTtcVwHZpnJbM3/widget.js'
      var t = document.getElementsByTagName('script')[0]
      t.parentNode.insertBefore(e, t)
    })()
  }
}
</script>
