<template>
    <Loading :active="isLoading"></Loading>
    <div class="wrap cartWrap">
            <!-- 購物車步驟及標題 -->
            <div class="cart_top">
                <ul class="cart_menu">
                    <li class="active">購物清單</li>
                    <li>填寫資料</li>
                    <li>確認訂單</li>
                    <li>完成購物</li>
                </ul>
                 <div>
                   <h2>購物清單</h2>
                   <a class="btn btn-outline-secondary mt-5 w-100" @click.prevent="openDelModal()">清空購物車</a>
                </div>
            </div>
            <!-- 購物車商品列表 -->
            <div class="cart_buyinglist">
                <form v-if="carts.total !== 0">
                    <div class="cart_pdbox pdbox" v-for="item in carts.carts" :key="item.id">
                        <a href="product.html">
                            <img :src="`${item.product.imageUrl}`">
                        </a>
                        <a href="#">
                            <p class="pdbox_name">{{item.product.title}}</p>
                        </a>
                        <table class="pdcnt_table">
                            <thead>
                                <tr>
                                    <th>SIZE</th>
                                    <th>QUANTITY</th>
                                    <td>Price</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="pdcnt_info_size">F
                                    </td>
                                    <td class="pdcnt_info_number">
                                        <div class="position-relative">
                                            <button class="text-dark qty-minus" type="button" @click.prevent="updateCart( item, item.qty - 1 )"> - </button>
                                            <input class="text-center w-25 border-0 bg-transparent" type="number" min="1" v-model.number="item.qty" @change="updateCart(item, item.qty)">
                                            <button type="button" class="text-dark qty-plus" @click.prevent="updateCart(item, item.qty + 1)"> + </button>
                                        </div>
                                    </td>
                                    <td v-if="item.product.price !== item.product.origin_price"><span class="pdbox_price-sale">{{$filters.currency(item.product.price)}}</span><span class="pdbox_price-origin">{{$filters.currency(item.product.origin_price)}}</span></td>
                                    <td v-else>{{$filters.currency(item.product.price)}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="d-sp">
                            <p class="pdcnt_price">Total: NT${{ $filters.currency(item.final_total) }}</p>
                            <a href="javascript:void(0)" class="pdcnt_trash" @click.prevent="openDelModal(item)">
                                <img src="../assets/img/delete.svg" alt="">
                            </a>
                        </div>
                    </div>
                </form>
                <div class="cart_nothing" v-else>您的購物車目前是空的！</div>
                <DelModal ref="delModal" @del-Product="delITem" :delItem="tempProduct"></DelModal>
            </div>
        </div>
        <!-- footerfixed結帳金額 -->
        <div class="footer_fixed">
            <div class="wrap d-sp">
                <div class="btn_pre_white">
                    <input type="button" value="上一步">
                </div>
                <div>
                    <h3>總計: <span>NT${{ $filters.currency(carts.final_total) }}</span> </h3>
                    <p>本次消費獲得點數：200 <span>(獲得點數是以商品出貨完成後生效。)</span></p>
                </div>
                <router-link to="/check" class="btn_next_white">
                    <input type="button" value="下一步">
                </router-link>
            </div>
        </div>
</template>

<script>
import $ from 'jquery'
import DelModal from '@/components/DelModal.vue'

export default {
  data () {
    return {
      carts: [],
      tempProduct: {},
      isLoading: false
    }
  },
  components: {
    DelModal
  },
  inject: ['emitter'],
  methods: {
    getCartList (item) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.carts = res.data.data
        }
        console.log(this.carts)
        console.log(res)
      })
    },
    updateCart (item, qty) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      const cart = {
        product_id: item.product_id,
        qty: qty
      }
      this.$http.put(url, { data: cart }).then((res) => {
        this.isLoading = false
        this.getCartList()
      })
    },
    openDelModal (item) {
      this.tempProduct = { ...item }
      this.$refs.delModal.showModal()
      console.log(this.tempProduct)
    },
    delITem () {
      this.isLoading = true
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`
      console.log(url)
      if (this.tempProduct.length > 0) {
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${this.tempProduct.id}`
      }
      this.$http.delete(url).then((res) => {
        this.isLoading = false
        const delComponet = this.$refs.delModal
        delComponet.hideModal()
        this.$httpMessageState(res, '移除購物車品項')
        this.getCartList()
      })
    }
  },
  created () {
    this.getCartList()
  },
  mounted () {
    $('body').addClass('hasfooterfixed')
  },
  updated () {
  }
}
</script>
