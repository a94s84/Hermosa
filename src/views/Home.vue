<template>
  <div class="contentWrap">
   <div class="defaultWrap">
      <!-- 首頁大圖輪播 -->
      <swiper :slides-per-view="1" :space-between="50" :autoplay="{delay: 4000}" :loop="true"  :pagination="true" class="homeSlide">
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
          <swiper :slides-per-view="1" :space-between="35" :navigation="true" :pagination="true" :loop="true"  :breakpoints="{768: {slidesPerView: 3,spaceBetween: 35}}" class="newinSlide">
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
      <!-- banner  -->
      <div>
          <a href="#">
              <img src="https://pics.mercci22.tw/img/mainpage/2022SS/index/032822/c-02.gif">
              <!-- <picture>
                  <source srcset="https://pics.mercci22.tw/img/mainpage/2022SS/index/032822/c-02.gif" media="(min-width: 1007px)" width="100%">
                  <img src="https://pics.mercci22.tw/img/mainpage/2022SS/index/032822/c-02.gif" alt="" width="100%">
              </picture> -->
          </a>
        </div>
      <!-- instagram -->
      <section class="wrap lessMargin">
          <h2 class="secTitle igTitle"><img src="Source/images/zh-cht/icons/footer_ig.svg">INSTAGRAM #Hermosa</h2>
          <div class="js-carousel4 carousel">
              <div class="igBox">
                  <a href="product.html">
                      <img data-lazy="http://via.placeholder.com/390x390" alt="">
                  </a>
              </div>
              <div class="igBox">
                  <a href="product.html">
                      <img data-lazy="http://via.placeholder.com/390x390" alt="">
                  </a>
              </div>
              <div class="igBox">
                  <a href="product.html">
                      <img data-lazy="http://via.placeholder.com/390x390" alt="">
                  </a>
              </div>
              <div class="igBox">
                  <a href="product.html">
                      <img data-lazy="http://via.placeholder.com/390x390" alt="">
                  </a>
              </div>
              <div class="igBox">
                  <a href="product.html">
                      <img data-lazy="http://via.placeholder.com/390x390" alt="">
                  </a>
              </div>
              <div class="igBox">
                  <a href="product.html">
                      <img data-lazy="http://via.placeholder.com/390x390" alt="">
                  </a>
              </div>
          </div>
      </section>
    </div>
  </div>
  <Footer/>
</template>

<script>
// @ is an alias to /src
import Footer from '../components/Footer.vue'
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
import SwiperCore, { Navigation, Pagination, Autoplay }
from 'swiper'
import 'swiper/swiper-bundle.css'

SwiperCore.use([Navigation, Pagination, Autoplay])

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
  }
}
</script>
