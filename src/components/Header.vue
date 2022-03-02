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
            <a href="javascript: void(0);" class="header_menu"></a>
        </div>
        <div class="header_logoWrap">
            <a href="default.html" class="header_logo">
               <img src="../assets/img/logo.png" alt="Hermosa" title="Hermosa">
            </a>
        </div>
        <div class="header_side_icon">
            <a href="login.html" class="header_login">
                <img src="../assets/img/login.svg" alt="登入" title="登入">
            </a>
            <a href="wishlist.html" class="header_favorite">
                <img src="../assets/img//favicon.svg" alt="收藏" title="收藏">
            </a>
            <a href="shoppingcart.html" class="header_cart">
                <img src="../assets/img/cart.svg" alt="購物車" title="購物車"><span>(0)</span>
            </a>
        </div>
    </div>
</header>
</template>

<script>
export default {
  name: 'Header'
}
</script>
