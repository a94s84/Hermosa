<template>
  <Loading :active="isLoading"></Loading>
  <div class="contentWrap">
    <div class="wrap">
      <div class="memberWrap_inline">
        <div class="wishlist">
          <h2>我的收藏</h2>
          <p class="is-hidden-touch">商品資訊</p>
          <div class="wishbox">
            <a href="#" class="wishbox_img">
                <img src="http://via.placeholder.com/200x200" alt="">
            </a>
            <div class="wishbox_cnt">
                <div class="wishbox_info">
                    <p>內舖毛尼龍飛行帽</p>
                    <p>商品編號<span>01014941</span></p>
                    <p>顏色
                        <span class="wishbox_color">
                            <img src="https://photo.minimatters.com.tw/BigColorIcon/023.jpg" alt="">
                        </span>
                    </p>
                    <p>尺寸<span>F</span></p>
                </div>
                <div class="wishbox_price">
                    NT$880
                </div>
                <a href="javascript:void(0)" class="btn_black">加入購物車&emsp; +</a>
            </div>
            <a href="javascript:void(0)" class="btn_close"></a>
          </div>
          <div class="wishbox">
            <a href="#" class="wishbox_img">
                <img src="http://via.placeholder.com/200x200" alt="">
            </a>
            <div class="wishbox_cnt">
                <div class="wishbox_info">
                    <p>內舖毛尼龍飛行帽</p>
                    <p>商品編號<span>01014941</span></p>
                    <p>顏色
                        <span class="wishbox_color">
                            <img src="https://photo.minimatters.com.tw/BigColorIcon/053.jpg" alt="">
                        </span>
                    </p>
                    <p>尺寸<span>F</span></p>
                </div>
                <div class="wishbox_price">
                    NT$880
                </div>
                <a href="javascript:void(0)" class="btn_black">加入購物車&emsp; +</a>
            </div>
            <a href="javascript:void(0)" class="btn_close"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
import Footer from '../components/Footer.vue'

export default {
  data () {
    return {
      products: [],
      productsCategory: [],
      selectCategory: '',
      currentPage: 1,
      isLoading: false
    }
  },
  components: {
    Footer
  },
  methods: {
  },
  mounted () {
  }
}
</script>
