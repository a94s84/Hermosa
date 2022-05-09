<template>
    <Loading :active="isLoading"></Loading>
    <div class="contentWrap">
        <div class="wrap">
            <div class="pdcnt_wrap">
                <aside class="pdlist_aside">
                    <ul class="pdlist_menu js-menu" >
                        <li>
                        <router-link :to="{name:'productlist', query: { category: 'ALL' }}">ALL</router-link>
                        </li>
                        <li v-for="item in productsCategory" :key="item">
                            <router-link :to="{name:'productlist', query: { category: item }}">{{item}}</router-link>
                        </li>
                    </ul>
                </aside>
                <div class="pdcnt">
                    <div class="pdcnt_imgpart">
                        <div class="pdcnt_img">
                            <swiper :thumbs="{ swiper: thumbsSwiper }" :navigation="true"   :autoplay="{delay: 2500, pauseOnMouseEnter: true}" :loop="true" class="pdcnt_img_group_main">
                            <swiper-slide v-for="img in product.images" :key="img">
                                <img :src="img">
                            </swiper-slide>
                            </swiper>
                            <swiper @swiper="setThumbsSwiper" watch-slides-visibility watch-slides-progress :slides-per-view="4" :space-between="20" :navigation="true" :loop="true" :autoplay="{delay: 4000}" class="pdcnt_img_group_thumb">
                                <swiper-slide v-for="img in product.images" :key="img">
                                    <img :src="img">
                                </swiper-slide>
                            </swiper>
                        </div>
                    </div>
                    <div class="pdcnt_info">
                        <!-- 商品名稱.價格.編號. -->
                        <div class="pdcnt_inner">
                            <div class="pdcnt_inner_left">
                                <h1 class="pdname">{{product.title}}</h1>
                                <p class="stockstatus" v-if="product.num > 0">尚有庫存</p>
                            </div>
                            <div class="pdcnt_inner_right d-col">
                                <p class="pdcnt_price_sale" v-if="product.origin_price == product.price"><span>NT$</span>{{product.price}}</p>
                                <p class="pdcnt_price_onsale" v-else><span>NT$</span>{{product.price}}</p>
                                <p class="pdcnt_price_origin">NT${{product.origin_price}}</p>
                            </div>
                        </div>
                        <!-- 商品尺寸.數量 -->
                        <div class="pdcnt_CSN">
                            <table class="pdcnt_table">
                                <thead>
                                    <tr>
                                        <th>SIZE</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="pdcnt_info_size">F</td>
                                        <td class="pdcnt_info_number">
                                          <div>
                                            <select ref="pdQty" @change="qtyChnage()">
                                                <option v-for="num in 10" :key="num" :value="num">{{num}}</option>
                                            </select>
                                          </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- 商品材質.產地 -->
                        <div class="pdcnt_MP">
                            <p>產地 <span class="font-M">TAIWAN</span></p>
                            <p>細節 <span class="font-N">{{product.description}}</span></p>
                        </div>
                        <!-- 注意事項 -->
                        <div class="pdcnt_note">
                            <p>
                                部份商品不列入折扣 活動期間特價商品不接受退換貨
                            </p>
                            <p>
                                結帳時請務必詳讀結帳頁面下方注意事項
                            </p>
                        </div>
                        <!-- 收藏.加入購物清單.結帳 -->
                        <div class="pdcnt_btn">
                            <div class="pdcnt_btn_wish">
                                <a href="javascript:void(0)" class="btn_wish">
                                    <img src="../assets/img/favicon.svg"> +
                                </a>
                            </div>
                            <div class="pdcnt_btn_BuyPay">
                                <a type="button" class="btn_second btn_add" @click.prevent="addCart(product.id, product.qty)" >+&ensp;加入購物車
                                </a>
                                <a type="button" class="btn_black btn_topay" @click.prevent="gopay(product.id, product.qty)">立即結帳&ensp;<img src="../assets/img/pdcnt_pay_arrow.svg" width="18px"></a>
                            </div>
                        </div>
                        <ul class="pdcnt_menu">
                            <li>
                                <a href="javascript:void(0)" class="submenuTitle active"><span>商品尺寸表 | SIZE CHART</span></a>
                                <div class="submenu">
                                    <table width="100%" bgcolor="#FFFFFF" border="0" cellspacing="1" cellpadding="1">
                                        <tbody>
                                        <tr align="center" bgcolor="#FFFFFF">
                                            <td width="132" height="30">尺寸(±2公分)
                                            </td><td width="39" height="30">全長</td><td width="41" height="30">胸寬
                                            </td><td width="51">肩寬
                                            </td><td width="50">袖口
                                            </td><td width="46">袖長
                                            </td><td width="46">腰圍
                                            </td><td width="51">下擺
                                            </td>
                                        </tr>
                                        <tr align="center" bgcolor="#FFFFFF">
                                            <td height="30">F
                                            </td><td>60
                                            </td><td>66
                                            </td><td>X
                                            </td><td>9
                                            </td><td>73
                                            </td><td>X
                                            </td><td>42
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <br>
                                    <div style="line-height: 20px;">
                                        <img src="https://photo.afad.com.tw/PDImg/SIZETOP2.jpg" height="250">
                                    </div>
                                </div>
                            </li>
                            <li>
                                <a href="javascript:void(0)" class="submenuTitle active"><span>模特兒參考 | MODEL INFO</span></a>
                                <div class="submenu d-none">
                                    <table width="100%" border="0" align="center" cellpadding="1" cellspacing="1" bgcolor="white">    <tbody>      <tr align="center" bgcolor="#FFFFFF">        <td width="367" height="30" align="center" valign="middle">MODEL
                                    </td><td width="400" height="30" align="center" valign="middle">身高
                                    </td><td width="399" height="30" align="center" valign="middle">體重
                                    </td><td width="389" align="center" valign="middle">尺寸</td></tr><tr align="center" bgcolor="#FFFFFF">          <td height="30" align="center" valign="middle">Anzi</td>
                                    <td align="center" valign="middle">164 cm</td><td align="center" valign="middle">47 kg</td><td align="center" valign="middle">S</td></tr></tbody>  </table>
                                </div>
                            </li>
                            <li>
                                <a href="javascript:void(0)" class="submenuTitle active"><span>注意事項</span></a>
                                <div class="submenu d-none">
                                    {{product.content}}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <section class="wrap lessMargin pdcnt_carousel">
                <h2 class="pdcnt_carousel_title EN_title">You Might Also Like</h2>
                <swiper :slides-per-view="2" :space-between="26" :navigation="true" :pagination="true" :loop="true"  :breakpoints="{768: {slidesPerView: 4, spaceBetween: 26}}" class="pdlikeSlide">
                    <swiper-slide v-for="item in relativeProduct" :key="item.id" class="alsoLike_box">
                        <a href="#" @click.prevent="changeId(item.id)">
                            <img :src="`${item.imageUrl}`">
                        </a>
                    </swiper-slide>
                </swiper>
            </section>
        </div>
    </div>
    <Footer/>
</template>

<script>
import Footer from '../components/Footer.vue'
import emitter from '@/methods/emitter'
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
import SwiperCore, { Navigation, Pagination, Autoplay, Thumbs } from 'swiper'
import 'swiper/swiper-bundle.css'

SwiperCore.use([Navigation, Pagination, Autoplay, Thumbs])
export default {
  data () {
    return {
      id: '',
      products: [],
      product: {},
      productsCategory: [],
      relativeProduct: [],
      Loading: false,
      thumbsSwiper: null
    }
  },
  components: {
    Footer, Swiper, SwiperSlide
  },
  inject: ['emitter'],
  methods: {
    setThumbsSwiper (swiper) {
      this.thumbsSwiper = swiper
    },
    getProduct () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`
      this.$http.get(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.product = res.data.product
          this.getAll()
        }
      })
    },
    getAll () {
      this.$http.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`).then((res) => {
        if (res.data.success) {
          this.products = res.data.products
          const category = this.product.category
          const id = this.product.id
          // 相關商品
          this.relativeProduct = this.products.filter(
            (item) => item.category === category && item.id !== id
          )
          // 商品分類
          this.products.forEach((product) => {
            if (!this.productsCategory.includes(product.category)) {
              this.productsCategory.push(product.category)
            }
          })
        }
      })
    },
    addCart (id, qty = 1) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post(url, { data: cart }).then((res) => {
        this.isLaoding = false
        if (res.data.success) {
          emitter.emit('updateCart')
          this.$httpMessageState(res, res.data.message)
        }
      })
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
  }
}
</script>
