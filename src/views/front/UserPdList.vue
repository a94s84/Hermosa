<template>
  <Loading :active="isLoading"></Loading>
  <div class="contentWrap">
    <div class="wrap">
        <div class="pdlist_wrap">
            <aside class="pdlist_aside">
                <ul class="pdlist_menu js-menu" >
                    <li>
                    <a type="button" @click="changeCategory('ALL')">ALL</a>
                    </li>
                    <li v-for="item in productsCategory" :key="item">
                        <a type="button" @click="changeCategory (item)" >{{item}}
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
                                <h1 property="name">{{ selectCategory }}</h1>
                            </a>
                            <meta property="position" content="2">
                        </li>
                    </ol>
                </div>
                <!-- 商品列表 -->
                <div class="pds">
                    <p class="fs-3 my-5 py-5 w-100 text-center"  v-if="filterData.length === 0">沒有相符的搜尋結果 Σ( ° △ °) </p>
                    <div class="pds_col" v-else>
                        <div class="pds_item js_items" v-for="(item,key) in filterData[currentPage - 1]" :key="key">
                            <div class="pdbox">
                                <router-link class="pdbox_img" :to="`/product/${item.id}`">
                                    <img :src="`${item.imageUrl}`">
                                </router-link>
                                <a type="button" @click="getProduct(item.id)">
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
                    <a type="button" class="pagination_next" @click.prevent="changePage(currentPage + 1)" :class="{ 'disabled': currentPage == filterData.length || filterData.length === 0}"></a>
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

export default {
  data () {
    return {
      products: [],
      productsCategory: [],
      selectCategory: '',
      searchKeyword: '',
      currentPage: 1,
      isLoading: false
    }
  },
  components: {
    Footer
  },
  watch: {
    $route () {
      this.selectCategory = this.$route.query.category || ''
      this.searchKeyword = this.$route.query.search || ''
    }
  },
  computed: {
    filterData () {
      let tempData = []
      const filterProducts = []
      // 依照分類按鈕篩選所有商品
      if (this.selectCategory && this.selectCategory !== 'ALL') {
        tempData = this.products.filter((item) => item.category?.match(this.selectCategory))
      } else if (this.searchKeyword && this.searchKeyword !== '') {
        tempData = this.products.filter((item) => item.title?.match(this.searchKeyword))
      } else {
        tempData = this.products
      }

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
          // 篩選分類項目
          this.products.forEach((product) => {
            if (!this.productsCategory.includes(product.category)) {
              this.productsCategory.push(product.category)
            }
          })
        }
      })
    },
    changeCategory (category) {
      this.$router.push({ name: 'productlist', query: { category } })
      this.selectCategory = category
    },
    changePage (page = 1) {
      this.currentPage = page
    }
  },
  mounted () {
    this.getPdList()
    this.selectCategory = this.$route.query.category || ''
    this.searchKeyword = this.$route.query.search || ''
  }
}
</script>
