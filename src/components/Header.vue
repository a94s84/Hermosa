<template>
  <header ref="mainHeader" :class="{'header_white':isTrans}">
    <div class="header-bannerBar">
        <p>輸入優惠碼Hermosa85，結帳再享85折</p>
        <a href="#" class="close-banner" @click.prevent="$emit('close-banner')">
            <img src="../assets/img/close_white.svg" alt="">
        </a>
    </div>
    <div class="header-inner wrap">
        <div class="header-pc-menu">
            <a href="#" class="header-menu" @click.prevent="openMenu"></a>
        </div>
        <div class="header-logoWrap">
            <router-link to="/" class="header-logo">
            <img src="../assets/img/logo.png" title="Hermosa">
            </router-link>
        </div>
        <div class="headerSide-icon">
            <router-link to="/login" class="header-login">
                <img src="../assets/img/login.svg" title="登入">
            </router-link>
            <router-link to="/wishlist" class="header-favorite">
                <img src="../assets/img//favicon.svg" title="收藏">
                <span  v-if=" favoriteNum.length" >{{ favoriteNum.length }}</span>
            </router-link>
            <router-link to="/cart" class="header-cart">
                <img src="../assets/img/cart.svg" title="購物車"><span v-if="carts.length" >{{ cartsNum }}</span>
            </router-link>
        </div>
    </div>
  </header>
  <div class="offcan" ref="offcan">
        <div class="offcanvas-head">
            <img src="../assets/img/logo_s.png" alt="" class="logo-samll">
            <a href="#" class="btn-closeMenu" @click.prevent="closeMenu">
                <img src="../assets/img/close_black.svg" alt="">
            </a>
        </div>
        <div class="offcanvas-body">
            <ul class="js-menu">
                <li>
                    <a href="#" @click.prevent="goCategory('ALL')">ALL</a>
                </li>
                <li>
                    <a href="#" @click.prevent="goCategory('TOPS')">TOPS</a>
                </li>
                <li>
                    <a href="#" @click.prevent="goCategory('OUTER')">OUTER</a>
                </li>
                <li>
                    <a href="#" @click.prevent="goCategory('PANTS')">PANTS</a>
                </li>
                <li>
                    <a href="#" @click.prevent="goCategory('SKIRTS')">SKIRTS</a>
                </li>
            </ul>
            <div class="offcanvas-searchWrap">
                <input type="search" v-model.trim="this.searchKeyword" @keyup.enter="goSearch">
                <a href="#" class="offcanvas-search" @click.prevent="goSearch">
                    <img src="../assets/img/search.svg">
                </a>
            </div>
            <div class="offcanvas-social">
                <a href="#">
                    <img src="../assets/img/off_fb.svg" alt="">
                </a>
                <a href="#">
                    <img src="../assets/img/off_ig.svg" alt="">
                </a>
                <a href="#">
                    <img src="../assets/img/off_line.svg" alt="">
                </a>
            </div>
        </div>
    </div>
    <div class="pageCover" ref="pageCover" @click="closeMenu"></div>
</template>

<script>
import emitter from '@/methods/emitter'
import localStorage from '@/mixins/localStorage'
export default {
  data () {
    return {
      carts: [],
      isTrans: false,
      searchKeyword: '',
      favoriteNum: this.getLocalStorage() || []
    }
  },
  computed: {
    cartsNum () {
      let cartNum = 0
      this.carts.forEach(function (e) {
        cartNum += e.qty
      })
      return cartNum
    }
  },
  mixins: [localStorage],
  emits: ['close-banner'],
  methods: {
    goCategory (category) {
      this.$router.push({ name: 'productlist', query: { category } })
      this.closeMenu()
    },
    goSearch () {
      this.$router.push({ name: 'productlist', query: { search: this.searchKeyword } })
      this.searchKeyword = ''
      this.closeMenu()
    },
    openMenu () {
      this.$refs.offcan.classList.add('open')
      this.$refs.pageCover.classList.add('active')
    },
    closeMenu () {
      this.$refs.offcan.classList.remove('open')
      this.$refs.pageCover.classList.remove('active')
    },
    windowScroll () {
      if (window.scrollY > 10) {
        this.isTrans = true
      } else {
        this.isTrans = false
      }
    },
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.carts = res.data.data.carts
        }
      })
    }
  },
  created () {
    emitter.on('updateCart', () => {
      this.getCart()
    })
    emitter.on('update-favorite', () => {
      this.favoriteNum = this.getLocalStorage()
    })
  },
  mounted () {
    this.getCart()
    window.addEventListener('scroll', this.windowScroll)
  }
}
</script>
