<template>
  <body class="hasBannerBar">
      <Header/>
      <div class="contentWrap">
          <div class="defaultWrap">
              <!-- 首頁大圖輪播 -->
              <div class="homeSlide">
                  <a href="#">
                      <picture>
                          <source srcset="https://pic.mouggan.com/mouggan/IndexWidget/4ba9de3a-a94e-42ea-966f-fa6ecfe17833.jpg" media="(min-width: 1007px)">
                          <img src="https://pic.mouggan.com/mouggan/IndexWidget/9c586d5f-6a65-480b-bc23-1aa5a3c836ab.jpg" alt="">
                      </picture>
                  </a>
                  <a href="#">
                      <picture>
                          <source srcset="https://pic.mouggan.com/mouggan/IndexWidget/44077feb-0fa6-479e-90a5-9bd8fd9fc09f.jpg" media="(min-width: 1007px)">
                          <img src="https://pic.mouggan.com/mouggan/IndexWidget/76f7de6c-c27d-442a-b1b8-5098f0d1403d.jpg" alt="">
                      </picture>
                  </a>
              </div>
              <!-- NEW IN -->
              <section class="wrap lessMargin">
                  <h2 class="secTitle">NEW IN</h2>
                  <div class="js-carousel3 carousel" ref="carousel3">
                    <div class="pdbox" v-for="item in products.slice(0,6)" :key="item.id">
                        <a type="button" @click.prevent="getProduct(item.id)">
                            <img :src="`${item.imageUrl}`">
                        </a>
                        <div class="pdinfo">
                            <div>
                                <a href="#">
                                    <p class="pdbox_name">{{item.title}}</p>
                                </a>
                                <div v-if="item.origin_price !== item.price">
                                    <p class="pdbox_price-origin">NT${{ item.origin_price}}</p>
                                    <p class="pdbox_price-sale">NT${{ item.price}} <span>SALE</span></p>
                                </div>
                                  <p class="pdbox_price" v-else>NT${{ item.origin_price}}</p>
                            </div>
                        </div>
                    </div>
                 </div>
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
      <div class="pageCover"></div>
      <Footer/>
  </body>
</template>

<script>
// @ is an alias to /src
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import $ from 'jquery'

export default {
  components: {
    Header, Footer
  },
  data () {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: ''
      }
    }
  },
  methods: {
    getPdList () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(url).then((res) => {
        this.products = res.data.products
        this.isLoading = false
      })
    },
    getProduct (id) {
      this.$router.push(`/user/product/${id}`)
    },
    carousels () {
      $('.homeSlide').slick({
        dots: true,
        arrows: false,
        autoplay: true
      })
      $('.js-carousel3').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        autoplay: false,
        responsive: [{
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            dots: true,
            arrows: true
          }
        }]
      })
      $('.js-carousel4').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        autoplay: false,
        dot: true,
        autoplaySpeed: 1500,
        responsive: [{
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            dots: true,
            arrows: true
          }
        }]
      })
    }
  },
  created () {
    this.getPdList()
    this.carousels()
  },
  updated () {
    this.carousels()
  }
}
</script>
