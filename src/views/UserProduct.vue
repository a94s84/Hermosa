<template>
    <Loading :active="isLoading"></Loading>
    <div class="wrap">
        <div class="pdcnt_wrap">
            <aside class="pdlist_aside">
                <!-- <ul class="pdlist_menu js-menu" >
                    <li>
                    <a type="button" @click="filter = 'ALL'">ALL</a>
                    </li>
                    <li v-for="item in categoryData" :key="item.id">
                        <a type="button" @click="filter = item">{{item}}
                        </a>
                    </li>
                </ul> -->
            </aside>
            <div class="pdcnt">
                <div class="pdcnt_imgpart">
                    <div class="pdcnt_img">
                        <div class="pdcnt_img_group_main">
                            <img v-for="img in product.imagesUrl" :key="img" :src="img">
                        </div>
                        <div class="pdcnt_img_group_thumb">
                            <img v-for="img in product.imagesUrl" :key="img" :src="img">
                        </div>
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
                                        <select ref="pdQty" @change="qtyChnage()">
                                            <option v-for="num in 10" :key="num" :value="num">{{num}}</option>
                                        </select>
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
                            <a type="button" class="btn_second btn_add" @click.prevent="addCart(product.id, product.qty)" :disabled="this.loadingItem === product.id">+&ensp;加入購物車
                            </a>
                            <a href="#" class="btn_black btn_topay" @click.prevent="gopay(product.id, product.qty)">立即結帳&ensp;<img src="../assets/img/pdcnt_pay_arrow.svg" width="18px"></a>
                        </div>
                    </div>
                    <ul class="pdcnt_menu">
                        <li>
                            <a href="javascript:void(0)" class="submenuTitle active"><span>商品尺寸表 | SIZE CHART</span></a>
                            <div class="submenu">
                                <center>
                                    <table width="100%" bgcolor="#FFFFFF" border="0" cellspacing="1" cellpadding="1">
                                        <tbody>
                                        <tr align="center" bgcolor="#FFFFFF">
                                            <td width="132" height="30"><font color="#5b5b5b" size="2">尺寸(±2公分)</font>
                                            </td><td width="39" height="30"><font color="#5b5b5b" size="2">全長</font>
                                            </td><td width="41" height="30"><font color="#5b5b5b" size="2">胸寬</font>
                                            </td><td width="51"><font color="#5b5b5b" size="2">肩寬</font>
                                            </td><td width="50"><font color="#5b5b5b" size="2">袖口寬</font>
                                            </td><td width="46"><font color="#5b5b5b" size="2">袖長</font>
                                            </td><td width="46"><font color="#5b5b5b" size="2">腰圍</font>
                                            </td><td width="51"><font color="#5b5b5b" size="2">下擺寬</font>
                                            </td>
                                        </tr>
                                        <tr align="center" bgcolor="#FFFFFF">
                                            <td height="30"><font color="#666666" size="2">F</font>
                                            </td><td><font color="#737373" size="2">60</font>
                                            </td><td><font color="#5b5b5b" size="2">66</font>
                                            </td><td><font color="#5b5b5b" size="2">X</font>
                                            </td><td><font color="#5b5b5b" size="2">9</font>
                                            </td><td><font color="#5b5b5b" size="2">73</font>
                                            </td><td><font color="#5b5b5b" size="2">X</font>
                                            </td><td><font color="#5b5b5b" size="2">42</font>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <br>
                                    <div style="line-height: 20px;">
                                        <img src="https://photo.afad.com.tw/PDImg/SIZETOP2.jpg" height="250">
                                    </div>
                                </center>
                            </div>
                        </li>
                        <li>
                            <a href="javascript:void(0)" class="submenuTitle active"><span>模特兒參考 | MODEL INFO</span></a>
                            <div class="submenu d-none">
                                <table width="100%" border="0" align="center" cellpadding="1" cellspacing="1" bgcolor="white">    <tbody>      <tr align="center" bgcolor="#FFFFFF">        <td width="367" height="30" align="center" valign="middle"><font color="#5b5b5b" size="1">MODEL</font>
                                </td><td width="400" height="30" align="center" valign="middle"><font color="#5b5b5b" size="1">身高</font>
                                </td><td width="399" height="30" align="center" valign="middle"><font color="#5b5b5b" size="1">體重</font>
                                </td><td width="389" align="center" valign="middle"><font color="#5b5b5b" size="1">尺寸</font></td></tr><tr align="center" bgcolor="#FFFFFF">          <td height="30" align="center" valign="middle"><font color="#666666" size="1">Anzi</font></td>
                                <td align="center" valign="middle"><font color="#737373" size="1">164 cm</font></td><td align="center" valign="middle"><font color="#5b5b5b" size="1">47 kg</font>
                                    </td><td align="center" valign="middle"><font color="#5b5b5b" size="1">S</font>
                                    </td></tr></tbody>  </table>
                            </div>
                        </li>
                        <li>
                            <a href="javascript:void(0)" class="submenuTitle active"><span>注意事項</span></a>
                            <div class="submenu d-none">
                                {{product.content}}
                            </div>
                        </li>
                        <li>
                            <a href="javascript:void(0)" class="submenuTitle">建議搭配</a>
                            <div class="pdcnt_suggest js-carousel5 carousel">
                                <a href="#">
                                    <img src="http://via.placeholder.com/340x485?text=1-1" alt="" width="100%">
                                </a>
                                <a href="#">
                                    <img src="http://via.placeholder.com/340x485?text=1-2" alt="" width="100%">
                                </a>
                                <a href="#">
                                    <img src="http://via.placeholder.com/340x485?text=1-3" alt="" width="100%">
                                </a>
                                <a href="#">
                                    <img src="http://via.placeholder.com/340x485" alt="" width="100%">
                                </a>
                                <a href="#">
                                    <img src="http://via.placeholder.com/340x485" alt="" width="100%">
                                </a>
                                <a href="#">
                                    <img src="http://via.placeholder.com/340x485" alt="" width="100%">
                                </a>
                                <a href="#">
                                    <img src="http://via.placeholder.com/340x485" alt="" width="100%">
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <section class="wrap lessMargin pdcnt_carousel" id="carousel4">
            <h2 class="pdcnt_carousel_title EN_title">You Might Also Like</h2>
            <div class="js-carousel4 carousel">
                <div class="alsoLike_box">
                    <a href="#">
                        <img src="http://via.placeholder.com/340x485" alt="">
                    </a>
                </div>
                <div class="alsoLike_box">
                    <a href="#">
                        <img src="http://via.placeholder.com/340x485" alt="">
                    </a>
                </div>
                <div class="alsoLike_box">
                    <a href="#">
                        <img src="http://via.placeholder.com/340x485" alt="">
                    </a>
                </div>
                <div class="alsoLike_box">
                    <a href="#">
                        <img src="http://via.placeholder.com/340x485" alt="">
                    </a>
                </div>
                <div class="alsoLike_box">
                    <a href="#">
                        <img src="http://via.placeholder.com/340x485" alt="">
                    </a>
                </div>
                <div class="alsoLike_box">
                    <a href="#">
                        <img src="http://via.placeholder.com/340x485" alt="">
                    </a>
                </div>
            </div>
        </section>
    </div>
    <div class="pageCover"></div>
</template>

<script>
import $ from 'jquery'

export default {
  data () {
    return {
      product: {},
      id: '',
      loadingItem: '',
      Loading: false
    }
  },
  inject: ['emitter'],
  methods: {
    getProduct () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`
      this.$http.get(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.product = res.data.product
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
        this.$httpMessageState(res, '加入購物車')
      })
    },
    gopay (id, qty = 1) {
      this.addCart(id, qty)
      this.$router.push('/user/cart')
    },
    qtyChnage () {
      const pdQty = parseInt(this.$refs.pdQty.value)
      this.product.qty = pdQty
    },
    imgcarouse () {
      $('.js-carousel4').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        autoplay: false,
        dot: true,
        autoplaySpeed: 1500,
        responsive: [{
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            arrows: true
          }
        }]
      })
      $('.js-carousel5').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        responsive: [{
          breakpoint: 1200,
          settings: {
            slidesToShow: 4
          }
        }, {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            arrows: true
          }
        }]
      })
      $('.pdcnt_img_group_main').slick({
        autoplay: true,
        autoplaySpeed: 2500,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        asNavFor: $('.pdcnt_img_group_thumb')
      })
      $('.pdcnt_img_group_thumb').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: $('.pdcnt_img_group_main'),
        arrows: false,
        vertical: false,
        focusOnSelect: true
      })
    }
  },
  created () {
    this.id = this.$route.params.productId
    this.getProduct()
  },
  updated () {
    this.imgcarouse()
  }
}
</script>
