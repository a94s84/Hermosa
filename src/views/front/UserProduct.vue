<template>
  <Loading :active="isLoading" />
  <div class="contentWrap">
    <div class="wrap">
      <div class="pdcntWrap">
        <aside class="pdlistAside ">
          <ul class="pdlistMenu js-menu">
            <li>
              <router-link
                :to="{ name: 'productlist', query: { category: 'ALL' } }"
                >ALL</router-link
              >
            </li>
            <li v-for="item in productsCategory" :key="item">
              <router-link
                :to="{ name: 'productlist', query: { category: item } }"
                >{{ item }}</router-link
              >
            </li>
          </ul>
        </aside>
        <div class="pdcnt">
          <div class="pdcnt-imgpart">
            <div class="pdcnt-img">
              <swiper
                :thumbs="{ swiper: thumbsSwiper }"
                :navigation="true"
                :autoplay="{ delay: 2500, pauseOnMouseEnter: true }"
                :loop="true"
                class="pdcbt-imggroup"
              >
                <swiper-slide v-for="img in product.images" :key="img">
                  <img :src="img" />
                </swiper-slide>
              </swiper>
              <swiper
                @swiper="setThumbsSwiper"
                watch-slides-visibility
                watch-slides-progress
                :slides-per-view="4"
                :space-between="20"
                :navigation="true"
                :loop="true"
                :autoplay="{ delay: 4000 }"
                class="pdcnt-imgthumb"
              >
                <swiper-slide v-for="img in product.images" :key="img">
                  <img :src="img" />
                </swiper-slide>
              </swiper>
            </div>
          </div>
          <div class="pdcnt-info">
            <!-- 商品名稱.價格.編號. -->
            <div class="pdcnt-inner">
              <div class="pdcnt-inner-title">
                <h1 class="pdname">{{ product.title }}</h1>
                <p class="stockstatus" v-if="product.num > 0">尚有庫存</p>
              </div>
              <div class="pdcnt-inner-price d-col">
                <p
                  class="pdcnt-price-sale"
                  v-if="product.origin_price == product.price"
                >
                  <span>NT$</span>{{ product.price }}
                </p>
                <p class="pdcnt-price-onsale" v-else>
                  <span>NT$</span>{{ product.price }}
                </p>
                <p class="pdcnt-price-origin">NT${{ product.origin_price }}</p>
              </div>
            </div>
            <!-- 商品尺寸.數量 -->
            <div class="pdcnt-csn">
              <table class="pdcnt-table">
                <thead>
                  <tr>
                    <th>SIZE</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="pdcnt-info-size">F</td>
                    <td class="pdcnt-info-number">
                      <div>
                        <select ref="pdQty" @change="qtyChnage()">
                          <option v-for="num in 10" :key="num" :value="num">
                            {{ num }}
                          </option>
                        </select>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- 商品材質.產地 -->
            <div class="pdcnt-mp">
              <p>產地 <span class="font-M">TAIWAN</span></p>
              <p>
                細節 <span class="font-N">{{ product.description }}</span>
              </p>
            </div>
            <!-- 注意事項 -->
            <div class="pdcnt-note">
              <p>部份商品不列入折扣 活動期間特價商品不接受退換貨</p>
              <p>結帳時請務必詳讀結帳頁面下方注意事項</p>
            </div>
            <!-- 收藏.加入購物清單.結帳 -->
            <div class="pdcnt-btn">
              <a
                href="#"
                class="btn-wish"
                @click.prevent="addFavorite(product.id)"
              >
                <i
                  class="bi bi-heart-fill"
                  v-if="favoriteItems.includes(product.id)"
                ></i
                ><i class="bi bi-heart" v-else></i>
              </a>
              <div class="pddcnt-btn-buypay">
                <a
                  href="#"
                  class="btn-second btn-add"
                  @click.prevent="addCart(product.id, product.qty)"
                  >+&ensp;加入購物車
                </a>
                <a
                  href="#"
                  class="btn-black btn-topay"
                  @click.prevent="gopay(product.id, product.qty)"
                  >立即結帳&ensp;<img
                    src="../../assets/img/pdcnt_pay_arrow.svg"
                    width="18px"
                /></a>
              </div>
            </div>
            <!-- 商品尺吋表等按鈕 -->
            <ul class="pdcnt-menu" ref="productCollapse">
              <li>
                <a
                  href="#collapseSize"
                  role="button"
                  data-bs-toggle="collapse"
                  class="submenuTitle"
                  ><span>商品尺寸表 | SIZE CHART</span></a
                >
                <div class="submenu collapse show" id="collapseSize">
                  <table
                    width="100%"
                    border="0"
                    cellspacing="1"
                    cellpadding="1"
                  >
                    <tbody>
                      <tr align="center">
                        <td width="132" height="30">尺寸(±2公分)</td>
                        <td width="39" height="30">全長</td>
                        <td width="41" height="30">胸寬</td>
                        <td width="51">肩寬</td>
                        <td width="50">袖口</td>
                        <td width="46">袖長</td>
                        <td width="46">腰圍</td>
                        <td width="51">下擺</td>
                      </tr>
                      <tr align="center" bgcolor="#FFFFFF">
                        <td height="30">F</td>
                        <td>60</td>
                        <td>66</td>
                        <td>X</td>
                        <td>9</td>
                        <td>73</td>
                        <td>X</td>
                        <td>42</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="text-center">
                    <img :src="sizeImg" alt="sizeImage" />
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="#collapseModel"
                  role="button"
                  data-bs-toggle="collapse"
                  class="submenuTitle collapsed"
                  ><span>模特兒參考 | MODEL INFO</span></a
                >
                <div class="submenu collapse" id="collapseModel">
                  <table
                    width="100%"
                    border="0"
                    align="center"
                    cellpadding="1"
                    cellspacing="1"
                  >
                    <tbody>
                      <tr align="center">
                        <td height="30">MODEL</td>
                        <td>身高</td>
                        <td>體重</td>
                        <td>尺寸</td>
                      </tr>
                      <tr align="center">
                        <td>Anzi</td>
                        <td>164 cm</td>
                        <td>47 kg</td>
                        <td>F</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </li>
              <li>
                <a
                  href="#collapseNote"
                  role="button"
                  data-bs-toggle="collapse"
                  class="submenuTitle collapsed"
                  ><span>注意事項</span></a
                >
                <div class="submenu collapse" id="collapseNote">
                  {{ product.content }}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <section class="wrap lessMargin pdcnt-swiper">
        <h2 class="pdcnt-swiper-title EN-title">You Might Also Like</h2>
        <swiper
          :slides-per-view="2"
          :space-between="26"
          :navigation="true"
          :pagination="true"
          :loop="true"
          :breakpoints="{ 768: { slidesPerView: 4, spaceBetween: 26 } }"
          class="pdlikeSlide"
        >
          <swiper-slide
            v-for="item in relativeProduct"
            :key="item.id"
            class="alsoLike_box"
          >
            <a href="#" @click.prevent="changeId(item.id)">
              <img :src="`${item.imageUrl}`" />
            </a>
          </swiper-slide>
        </swiper>
      </section>
    </div>
  </div>
  <Footer />
</template>

<script>
import Footer from '@/components/Footer.vue'
import { mapState, mapActions } from 'pinia'
import productStore from '@/stores/productStore'
import statusStore from '@/stores/statusStore'
import localStorage from '@/mixins/localStorage'
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
import SwiperCore, { Navigation, Pagination, Autoplay, Thumbs } from 'swiper'
import 'swiper/swiper-bundle.css'
import Collapse from 'bootstrap/js/dist/collapse'

SwiperCore.use([Navigation, Pagination, Autoplay, Thumbs])
export default {
  data () {
    return {
      id: '',
      product: {},
      favoriteItems: this.getLocalStorage() || [],
      relativeProduct: [],
      thumbsSwiper: null
    }
  },
  components: {
    Footer,
    Swiper,
    SwiperSlide
  },
  mixins: [localStorage],
  inject: ['emitter'],
  computed: {
    ...mapState(productStore, ['products', 'productsCategory']),
    ...mapState(statusStore, ['isLoading']),
    sizeImg () {
      let img = ''
      switch (this.product.category) {
        case 'TOPS':
          img = require('../../assets/img/SizeTop.jpg')
          break
        case 'PANTS':
          img = require('../../assets/img/SizePants.jpg')
          break
        case 'SKIRTS':
          img = require('../../assets/img/SizeSkirts.jpg')
          break
        case 'OUTER':
          img = require('../../assets/img/SizeOuter.jpg')
          break
        default:
          break
      }
      return img
    }
  },
  methods: {
    ...mapActions(productStore, ['getPdList', 'createCategory', 'addCart']),
    ...mapActions(statusStore, ['pushMessage']),
    setThumbsSwiper (swiper) {
      this.thumbsSwiper = swiper
    },
    getProduct () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.product = res.data.product
          this.getRelativeProduct()
        }
      })
    },
    getRelativeProduct () {
      this.createCategory()
      const category = this.product.category
      const id = this.product.id
      this.relativeProduct = this.products.filter(
        (item) => item.category === category && item.id !== id
      )
    },
    gopay (id, qty = 1) {
      this.addCart(id, qty)
      this.$router.push('/cart')
    },
    qtyChnage () {
      const pdQty = parseInt(this.$refs.pdQty.value)
      this.product.qty = pdQty
    },
    changeId (id) {
      this.$router.push(`/product/${id}`)
      this.id = id
      this.getProduct()
    }
  },
  created () {
    this.id = this.$route.params.productId
    this.getProduct()
  },
  mounted () {
    this.getPdList()
    this.createCategory()
    this.collapse = new Collapse(this.$refs.productCollapse)
  }
}
</script>
