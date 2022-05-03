<template>
    <div class="contentWrap">
      <div class="wrap cartWrap d-center">
              <ul class="cart_menu">
                  <li>購物清單</li>
                  <li>填寫資料</li>
                  <li class="active">確認訂單</li>
                  <li>完成購物</li>
              </ul>
              <div class="checkoutWrap">
                <h2>確認訂單</h2>
                <div class="orderdetail_box">
                  <div><span>訂單編號</span><p>{{order.id}}</p></div>
                  <div><span>訂單日期</span>{{ $filters.date(order.create_at) }}</div>
                  <div><span>姓名</span><p>{{order.user.name}}</p></div>
                  <div><span>信箱</span><p>{{order.user.email}}</p></div>
                  <div><span>電話</span><p>{{order.user.tel}}</p></div>
                  <div><span>地址</span><p>{{order.user.address}}</p></div>
                  <div><span>備註</span><p>{{order.message}}</p></div>
                  <div>
                    <span>訂單金額</span><p class="d-sp">NT$ {{ $filters.currency(order.total)}}
                    <a href="#" class="btn_more" ref="btnMore" @click.prevent="MoreList"></a></p>
                  </div>
                </div>
                <div class="orderlist_box" ref="orderList"><span>購買商品</span>
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
                </div>
              </div>
      </div>
      <!-- footerfixed結帳金額 -->
      <div class="footer_fixed">
          <div class="wrap d-sp">
              <div></div>
              <div></div>
              <a href="#" class="btn_next_white" @click.prevent="payOrder">結帳
              </a>
          </div>
      </div>
    </div>
</template>

<script>
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
    MoreList () {
      this.$refs.btnMore.classList.toggle('active')
      this.$refs.orderList.classList.toggle('active')
    },
    payOrder () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`
      this.$http.post(url).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.$router.push({ name: 'orderfinish', params: { orderId: this.orderId } })
        } else {
          this.emitter.emit('push-message', {
            type: 'danger',
            message: res.data.message
          })
        }
      }).catch(() => {
        this.emitter.emit('push-message', {
          type: 'danger',
          message: '發生錯誤，請重新整理頁面'
        })
      })
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
    this.getOrder()
  }
}
</script>
