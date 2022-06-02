<template>
  <Loading :active="isLoading" />
  <div class="contentWrap">
    <div class="wrap">
      <div class="pdlistWrap">
        <aside class="pdlistAside ">
          <ul class="pdlistMenu js-menu">
            <li>
              <a href="#" @click.prevent="changeCategory('ALL')">ALL</a>
            </li>
            <li v-for="item in productsCategory" :key="item">
              <a href="#" @click.prevent="changeCategory(item)">{{ item }} </a>
            </li>
          </ul>
        </aside>
        <div class="pdlistCnt">
          <div class="pdlistNav">
            <ol
              class="breadcrumb"
              vocab="https://schema.org/"
              typeof="BreadcrumbList"
            >
              <li property="itsemListElement" typeof="ListItem">
                <a href="#" title="HOME" property="item" typeof="WebPage">
                  <span property="name">HOME</span>
                </a>
                <meta property="position" content="1" />
              </li>
              <li property="itemListElement" typeof="ListItem">
                <a href="#" title="ITEM" property="item">
                  <h1 property="name">{{ selectCategory }}</h1>
                </a>
                <meta property="position" content="2" />
              </li>
            </ol>
          </div>
          <!-- 商品列表 -->
          <div class="pds">
            <p
              class="fs-3 my-5 py-5 w-100 text-center"
              v-if="filterData.length === 0"
            >
              沒有相符的搜尋結果 Σ( ° △ °)
            </p>
            <div class="pds-col" v-else>
              <div
                class="pds-item js_items"
                v-for="(item, key) in filterData[currentPage - 1]"
                :key="key"
              >
                <div class="pdbox">
                  <router-link class="pdbox-img" :to="`/product/${item.id}`">
                    <img :src="`${item.imageUrl}`" />
                  </router-link>
                  <a href="#" @click.prevent="getProduct(item.id)">
                    <p class="pdbox-name">{{ item.title }}</p>
                  </a>
                  <div v-if="item.origin_price !== item.price">
                    <p class="pdbox-price-origin">NT${{ item.origin_price }}</p>
                    <p class="pdbox-price-sale">
                      NT${{ item.price }} <span>SALE</span>
                    </p>
                  </div>
                  <p class="pdbox-price" v-else>NT${{ item.origin_price }}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="pagination-box has-text-centered">
              <a
                href="#"
                class="pagination-prev"
                :class="{ disabled: currentPage == 1 }"
                @click.prevent="changePage(currentPage - 1)"
              ></a>
              <a
                href="#"
                class="pagination-page"
                v-for="page in filterData.length"
                :key="page"
                :class="{ active: currentPage == page }"
                @click.prevent="currentPage = page"
                >{{ page }}</a
              >
              <a
                href="#"
                class="pagination-next"
                @click.prevent="changePage(currentPage + 1)"
                :class="{
                  disabled:
                    currentPage == filterData.length || filterData.length === 0
                }"
              ></a>
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
import { mapState, mapActions } from 'pinia'
import productStore from '@/stores/productStore'
import statusStore from '@/stores/statusStore'

export default {
  data () {
    return {
      selectCategory: '',
      searchKeyword: '',
      currentPage: 1
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
    ...mapState(productStore, ['products', 'productsCategory']),
    ...mapState(statusStore, ['isLoading']),
    filterData () {
      let tempData = []
      const filterProducts = []
      // 依照分類按鈕篩選所有商品
      if (this.selectCategory && this.selectCategory !== 'ALL') {
        tempData = this.products.filter((item) =>
          item.category?.match(this.selectCategory)
        )
      } else if (this.searchKeyword && this.searchKeyword !== '') {
        tempData = this.products.filter((item) =>
          item.title?.match(this.searchKeyword)
        )
      } else {
        tempData = this.products
      }
      for (var i = 0; i < tempData.length; i += 10) {
        filterProducts.push(tempData.slice(i, i + 10))
      }
      return filterProducts
    }
  },
  methods: {
    ...mapActions(productStore, ['getPdlist', 'createCategory', 'changePage']),
    changeCategory (category) {
      this.$router.push({ name: 'productlist', query: { category } })
      this.selectCategory = category
    },
    changePage (page = 1) {
      this.currentPage = page
    }
  },
  mounted () {
    this.createCategory()
    this.selectCategory = this.$route.query.category || ''
    this.searchKeyword = this.$route.query.search || ''
  }
}
</script>
