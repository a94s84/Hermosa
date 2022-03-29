<template>
  <body class="hasBannerBar">
      <Header/>
        <div class="wrap">
            <div class="pdlist_wrap">
                <aside class="pdlist_aside">
                    <ul class="pdlist_menu js-menu" >
                        <li>
                        <a type="button" @click="filter = 'ALL'">ALL</a>
                        </li>
                        <li v-for="item in categoryData" :key="item.id">
                            <a type="button" @click="filter = item">{{item}}
                            </a>
                        </li>
                    </ul>
                </aside>
                <div class="pdlist_cnt">
                    <!-- 麵包屑及區快icon -->
                    <div class="pdlist_NavPart">
                        <ol class="breadcrumb" vocab="https://schema.org/" typeof="BreadcrumbList">
                            <li property="itsemListElement" typeof="ListItem">
                                <a href="#" title="HOME" property="item" typeof="WebPage">
                                    <span property="name">HOME</span>
                                </a>
                                <meta property="position" content="1">
                            </li>
                            <li property="itemListElement" typeof="ListItem">
                                <a type="button" title="ITEM" property="item">
                                    <h1 property="name">{{ filter }}</h1>
                                </a>
                                <meta property="position" content="2">
                            </li>
                        </ol>
                        <div class="pdlist_changeCol">
                            <a href="javascript:void(0)" class="pdlist_btn_col2 js_btn_col " data-col="col2"></a>
                            <a href="javascript:void(0)" class="pdlist_btn_col10 js_btn_col active" data-col="col10"></a>
                        </div>
                        <ul class="pdlist_nav">
                            <li><a href="#">Verdon透明手機殼</a></li>
                            <li><a href="#">Verdon鏡面手機殼</a></li>
                            <li><a href="#">Dolomites矽膠手機殼</a></li>
                            <li><a href="#">針織</a></li>
                            <li><a href="#">雪紡</a></li>
                            <li><a href="#">麻質</a></li>
                            <li><a href="#">單寧</a></li>
                        </ul>
                    </div>
                    <!-- 商品列表 -->
                    <div class="pds">
                        <div class="pds_col col10">
                            <!-- <div class="pds_item js_items">
                                <div class="pdbox">
                                    <a href="product.html" class="pdbox_img">
                                        <img src="http://via.placeholder.com/552x736" alt="">
                                        <span class="pdbox_soldout">SOLD OUT</span>
                                    </a>
                                    <a href="#">
                                        <p class="pdbox_name">內舖毛尼龍飛行帽</p>
                                    </a>
                                    <div class="pdbox_pricebox">
                                        <p class="pdbox_price-origin">NT$500</p>
                                        <p class="pdbox_price-sale">NT$300<span>SALE</span></p>
                                    </div>
                                </div>
                            </div> -->
                            <div class="pds_item js_items" v-for="(item,key) in filterData[currentPage - 1]" :key="key">
                                <div class="pdbox">
                                    <a href="product.html" class="pdbox_img">
                                        <img :src="`${item.imageUrl}`">
                                    </a>
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
                            <!-- end .pl_item -->
                        </div>
                    </div>
                    <!-- 分頁頁碼 -->
                    <div>
                      <div class="pagination_box has-text-centered">
                        <a type="button" class="pagination_prev" :class="{ 'disabled': currentPage == 1 }" @click.prevent="changePage(currentPage - 1)"></a>
                        <a type="button" class="pagination_page" v-for="page in filterData.length" :key="page" :class="{ 'active': currentPage == page}" @click.prevent="currentPage = page">{{ page }}</a>
                        <a type="button" class="pagination_next" @click.prevent="changePage(currentPage + 1)" :class="{ 'disabled': currentPage == filterData.length }"></a>
                      </div>
                    </div>
                </div>
            </div>
        </div>
      <Footer/>
  </body>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
// import $ from 'jquery'

export default {
  components: {
    Header, Footer
  },
  data () {
    return {
      products: [],
      product: {},
      currentPage: 1,
      filter: 'ALL',
      status: {
        loadingItem: ''
      }
    }
  },
  computed: {
    categoryData () {
      const category = this.products.map(item => Object.values(item)[0]
      )
      return category.filter(function (el, index, arr) {
        return arr.indexOf(el) === index
      })
    },
    filterData () {
      let tempData = []
      const filterProducts = []
      // 依照分類按鈕篩選所有商品
      tempData = this.products.filter((item) => {
        if (this.filter === 'ALL') {
          return this.products
        } else if (this.filter === item.category) {
          return item
        }
      })
      // 篩選後的商品每10個一頁
      for (var i = 0; i < tempData.length; i += 10) {
        filterProducts.push(tempData.slice(i, i + 10))
      }
      return filterProducts
    }
  },
  methods: {
    getPdList () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(url).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.products = res.data.products
          this.pagination = res.data.pagination
        }
      })
    },
    getProduct (id) {
      this.$router.push(`/user/product/${id}`)
    },
    changePage (page) {
      this.currentPage = page
    }
  },
  created () {
    this.getPdList()
  }
}
</script>
