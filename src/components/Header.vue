<template>
  <header>
    <!-- <img src="../assets/img/logo.png" alt=""> -->
    <div class="header_bannerBar">
        <p>輸入優惠碼Hermosa85，結帳再享85折</p>
        <a href="javascrip:(0)" class="close_banner">
            <img src="../assets/img/close_white.svg" alt="">
        </a>
    </div>
    <div class="header_inner wrap">
        <div class="header_pc_menu">
            <a href="javascript: void(0);" class="header_menu" ref="headerMenu"></a>
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
                <img src="../assets/img/cart.svg" alt="購物車" title="購物車"><span>(0)</span>
            </router-link>
        </div>
    </div>
  </header>
  <div class="offcan" ref="offcanvas">
        <div class="offcanvas_head">
            <img src="../assets/img/logo_s.png" alt="" class="logo_in_menu">
            <a href="javascript: void(0);" class="close_menu_btn">
                <img src="../assets/img/close_black.svg" alt="">
            </a>
        </div>
        <div class="offcanvas_body">
            <ul class="js-menu">
                <li>
                    <router-link to="/productlist">ALL</router-link>
                </li>
                <li>
                    <a href="#" @click.prevent="goCategory('TOPS')">TOPS</a>
                </li>
                <li>
                    <a href="#" @click.prevent="goCategory('OUTER')">OUTER</a>
                </li>
                <li>
                    <a href="#" @click.prevent="goCategory('DRESSES')">DRESSES</a>
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
</template>

<script>
import $ from 'jquery'
// import { offcanvas } from '../methods/offcanvas'
export default {
  name: 'Header',
  methods: {
    goCategory (category) {
      this.$router.push({ name: 'productlist', query: { category } })
    }
  },
  mounted () {
    $('.header_menu').click(function () {
      $('.offcan').animate({
        left: 0
      }, 300)
      $('.pageCover').addClass('active')
    })
    $('.close_menu_btn, .pageCover').click(function () {
      $('.offcan').animate({
        left: -800
      }, 300)
      $('.pageCover').removeClass('active')
    })
    $('.close_banner').click(function () {
      $('body').removeClass('hasBannerBar')
    })
    $(window).scroll(function () {
      $('header').removeClass('header_white')
      var scrollVal = $(this).scrollTop()
      if (scrollVal >= 10) {
        $('header').addClass('header_white')
      }
    })
  }
}
</script>
