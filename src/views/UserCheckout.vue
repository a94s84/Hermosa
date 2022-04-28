<template>
    <div class="contentWrap">
      <div class="wrap cartWrap d-center">
              <ul class="cart_menu">
                  <li>購物清單</li>
                  <li>填寫資料</li>
                  <li class="active">確認訂單</li>
                  <li>完成購物</li>
              </ul>
              <div class="orderfinishWrap">
                <h2>確認訂單</h2>
                <div class="orderdetail_box">
                  <div><span>訂單編號</span><p>{{order.id}}</p></div>
                  <div><span>下單日期</span>{{ $filters.date(order.create_at) }}</div>
                  <div><span>姓名</span><p>{{order.user.name}}</p></div>
                  <div><span>電子郵件</span><p>{{order.user.email}}</p></div>
                  <div><span>電話</span><p>{{order.user.tel}}</p></div>
                  <div><span>地址</span><p>{{order.user.address}}</p></div>
                  <div><span>備註</span><p>{{order.message}}</p></div>
                  <div><span>訂單金額</span><p  class="d-sp">NT$ {{ $filters.currency(order.total)}}
                  <a href="#" class="lh-1"><span class="material-icons"> arrow_drop_down_circle </span></a>
                  </p></div>
                </div>
                 <div><span>購買商品</span>
                     <div class="shopItem" v-for="item in order.products" :key="item.id">
                      <div class="shopItem_img">
                        <img :src="`${item.product.imageUrl}`">
                      </div>
                      <div class="shopItem_name">
                          <p>{{item.product.title}}</p>
                      </div>
                      <div class="shopItem_size">
                          <p>尺寸</p>
                          <span>F</span>
                      </div>
                      <div class="shopItem_qty">
                          <p>數量</p>
                          <span>{{item.qty}}</span>
                      </div>
                      <div class="shopItem_price" v-if="item.product.origin_price !== item.product.price">
                          <p>單價</p>
                          <span class="pdbox_price-origin">NT$ {{ $filters.currency(item.product.origin_price) }}</span>
                          <span class="pdbox_price-sale">NT$ {{ $filters.currency(item.product.price) }}</span>
                      </div>
                      <div class="shopItem_price" v-else>
                          <p>單價</p>
                          <span>NT$ {{ $filters.currency(item.product.price)}}</span>
                      </div>
                      <div class="shopItem_total">
                          <p>小計</p>
                          <span>NT$ {{ $filters.currency(item.final_total) }}</span>
                      </div>
                    </div>
                  </div>
              </div>
      </div>
      <!-- footerfixed結帳金額 -->
      <div class="footer_fixed">
          <div class="wrap d-sp">
              <router-link to="/cart" class="btn_pre_white">
                  <input type="button" value="上一步">
              </router-link>
              <div>
                  <!-- <h3>總計: <span>NT$ {{ $filters.currency(carts.final_total)}}</span> </h3> -->
              </div>
              <div class="btn_next_white">
                  <input type="submit" value="下一步" @click.prevent="onSubmit">
              </div>
          </div>
      </div>
    </div>
</template>

<script>
// import $ from 'jquery'
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
        // console.log(this.carts)
        console.log(res)
      })
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
    this.getOrder()
  },
  mounted () {
  }
}
</script>
