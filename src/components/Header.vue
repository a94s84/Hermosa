<template>
  <header ref="mainHeader">
    <!-- <img src="../assets/img/logo.png" alt=""> -->
    <div class="header_bannerBar">
        <p>輸入優惠碼Hermosa85，結帳再享85折</p>
        <a href="#" class="close_banner" @click.prevent="$emit('close-banner')">
            <img src="../assets/img/close_white.svg" alt="">
        </a>
    </div>
    <div class="header_inner wrap">
        <div class="header_pc_menu">
            <a href="#" class="header_menu" @click.prevent="openMenu"></a>
        </div>
        <div class="header_logoWrap">
            <router-link to="/" class="header_logo">
            <img src="../assets/img/logo.png" title="Hermosa">
            </router-link>
        </div>
        <div class="header_side_icon">
            <router-link to="/login" class="header_login">
                <img src="../assets/img/login.svg" title="登入">
            </router-link>
            <router-link to="/wishlist" class="header_favorite">
                <img src="../assets/img//favicon.svg" title="收藏">
                <span  v-if=" favoriteNum.length" >{{ favoriteNum.length }}</span>
            </router-link>
            <router-link to="/cart" class="header_cart">
                <img src="../assets/img/cart.svg" title="購物車"><span v-if="carts.length" >{{ cartsNum }}</span>
            </router-link>
        </div>
    </div>
  </header>
  <div class="offcan" ref="offcan">
        <div class="offcanvas_head">
            <img src="../assets/img/logo_s.png" alt="" class="logo_in_menu">
            <a href="#" class="close_menu_btn" @click.prevent="closeMenu">
                <img src="../assets/img/close_black.svg" alt="">
            </a>
        </div>
        <div class="offcanvas_body">
            <ul class="js-menu">
                <li>
                    <a href="#"  @click.prevent="goCategory('ALL')">ALL</a>
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
            <div class="offcanvas_searchWrap">
                <input type="text">
                <a href="javascript: void(0);" class="offcanvas_search">
                    <img src="../assets/img/search.svg" alt="搜尋" title="搜尋">
                </a>
            </div>
            <div class="offcanvas_social">
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
    openMenu () {
      this.$refs.offcan.classList.add('open')
      this.$refs.pageCover.classList.add('active')
    },
    closeMenu () {
      this.$refs.offcan.classList.remove('open')
      this.$refs.pageCover.classList.remove('active')
    },
    windowScroll () {
      this.$refs.mainHeader.classList.remove('header_white')
      if (window.scrollY > 10) {
        this.$refs.mainHeader.classList.add('header_white')
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
