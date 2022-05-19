<template>
  <div class="contentWrap">
   <div class="defaultWrap">
      <!-- 首頁大圖輪播 -->
      <swiper :slides-per-view="1" :space-between="50" :autoplay="{delay: 4000}"  :effect="'fade'" :loop="true"  :pagination="true" class="homeSlide">
        <swiper-slide>
          <router-link :to="{ name: 'productlist', query: { category: 'ALL' }}" >
              <picture>
                  <source srcset="../../assets/img/banner1.png" media="(min-width: 1007px)">
                  <img src="../../assets/img/banner_m1.png" alt="">
              </picture>
          </router-link>
        </swiper-slide>
        <swiper-slide>
          <router-link :to="{ name: 'productlist', query: { category: 'ALL' }}" >
              <picture>
                  <source srcset="../../assets/img/banner2.png" media="(min-width: 1007px)">
                  <img src="../../assets/img/banner_m2.png" alt="">
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
    </div>
  </div>
  <Footer/>
</template>

<script>
// @ is an alias to /src
import Footer from '@/components/Footer.vue'
import productStore from '@/stores/productStore'
import { mapState, mapActions } from 'pinia'
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
import SwiperCore, { Navigation, Pagination, Autoplay, EffectFade }
from 'swiper'
import 'swiper/swiper-bundle.css'

SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade])

export default {
  components: {
    Footer, Swiper, SwiperSlide
  },
  computed: {
    ...mapState(productStore, ['products'])
  },
  methods: {
    ...mapActions(productStore, ['getPdList'])
  },
  created () {
    this.getPdList()
  }
}
</script>
