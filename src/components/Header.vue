<template>
  <header ref="mainHeader">
    <!-- <img src="../assets/img/logo.png" alt=""> -->
    <div class="header_bannerBar">
        <p>輸入優惠碼Hermosa85，結帳再享85折</p>
        <a href="#" class="close_banner" @click.prevent="closeTopBanner">
            <img src="../assets/img/close_white.svg" alt="">
        </a>
    </div>
    <div class="header_inner wrap">
        <div class="header_pc_menu">
            <a href="#" class="header_menu" @click.prevent="openMenu"></a>
        </div>
        <div class="header_logoWrap">
            <router-link to="/" class="header_logo">
            <img src="../assets/img/logo.png" alt="Hermosa" title="Hermosa">
            </router-link>
        </div>
        <div class="header_side_icon">
            <router-link to="/login" class="header_login">
                <img src="../assets/img/login.svg" alt="登入" title="登入">
            </router-link>
            <a href="wishlist.html" class="header_favorite">
                <img src="../assets/img//favicon.svg" alt="收藏" title="收藏">
            </a>
            <router-link to="/cart" class="header_cart">
                <img src="../assets/img/cart.svg" alt="購物車" title="購物車"><span  v-if="carts.length" >{{ carts.length }}</span>
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
                <!-- <li>
                    <a href="#" @click.prevent="goCategory('DRESSES')">DRESSES</a>
                </li> -->
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
import $ from 'jquery'
export default {
  data () {
    return {
      carts: []
    }
  },
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
      }).catch(() => {
        this.emitter.emit('push-message', {
          type: 'danger',
          message: '發生錯誤，請重新整理頁面'
        })
      })
    }
  },
  mounted () {
    $('.close_banner').click(function () {
      $('body').removeClass('hasBannerBar')
    })
    this.getCart()
    window.addEventListener('scroll', this.windowScroll)
  }
}
</script>
