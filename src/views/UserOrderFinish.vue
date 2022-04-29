<template>
    <div class="contentWrap">
      <div class="wrap cartWrap d-center">
        <ul class="cart_menu">
          <li>購物清單</li>
          <li>填寫資料</li>
          <li>確認訂單</li>
          <li class="active">完成購物</li>
        </ul>
        <div class="orderfinishWrap">
            <h2>完成購物</h2>
            <h3>感謝您的購買！我們正在處理您的訂單，如有任何問題，請聯絡客服信箱，謝謝。</h3><div class="orderList" ref="orderdetail">
                <div class="orderdetail_box">
                    <div><span>訂單編號</span><p>{{order.id}}</p></div>
                    <div><span>訂單日期</span>{{ $filters.date(order.create_at) }}</div>
                    <div><span>姓名</span><p>{{order.user.name}}</p></div>
                    <div><span>信箱</span><p>{{order.user.email}}</p></div>
                    <div><span>電話</span><p>{{order.user.tel}}</p></div>
                    <div><span>地址</span><p>{{order.user.address}}</p></div>
                    <div><span>備註</span><p>{{order.message}}</p></div>
                </div>
                <div class="orderlist_box"><span>購買商品</span>
                    <div class="shopItem" v-for="item in order.products" :key="item.id">
                        <div class="shopItem_img">
                        <img :src="`${item.product.imageUrl}`">
                        </div>
                        <div class="shopItem_name">
                            <p>{{item.product.title}}</p>
                        </div>
                        <div class="shopItem_qty">
                            <p>數量</p>
                            <p>{{item.qty}}</p>
                        </div>
                        <div class="shopItem_total">
                            <p>小計</p>
                            <p>{{ $filters.currency(item.final_total) }}</p>
                        </div>
                    </div>
                    <div>
                        <p class="text-end fw-bold px-lg-5 py-3">總計： NT$ {{ $filters.currency(order.total)}}</p>
                    </div>
                </div>
            </div>
            <div class="pdcnt_btn_BuyPay">
                <router-link :to="{ name: 'productlist', query: { category: 'ALL' }}"  class="btn_second btn_add">繼續購物 </router-link>
                <a href="#" class="btn_black btn_topay" @click.prevent="seeOrder">查看訂單<img src="/img/pdcnt_pay_arrow.9e498a28.svg" width="0"></a>
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
      orderId: '',
      order: {
        user: {},
        products: []
      },
      isLoading: false
    }
  },
  components: {
    Footer
  },
  inject: ['emitter'],
  methods: {
    getOrder () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`
      this.$http.get(url).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.order = res.data.order
          console.log(this.order)
        }
      })
    },
    seeOrder () {
      this.$refs.orderdetail.classList.add('active')
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
    this.getOrder()
  }
//   methods: {
//     getOrder () {
//       this.isLoading = true
//       const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`
//       this.$http.get(url).then((res) => {
//         this.isLoading = false
//       })
//     }
//   },
//   created () {
//     this.orderId = this.$route.params.orderId
//     this.getOrder()
//   }
}
</script>
