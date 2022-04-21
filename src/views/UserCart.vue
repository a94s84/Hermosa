<template>
    <Loading :active="isLoading"></Loading>
    <div class="wrap cartWrap">
            <!-- 購物車步驟及標題 -->
            <div class="cart_top">
                <ul class="cart_menu">
                    <li class="active">購物清單</li>
                    <li>填寫運送資料</li>
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
            <div class="cart_bottom">
                <div class="cart_note">
                    <h3 class="cart_title">注意事項</h3>
                    <p>※ 商品加入購物車但未完成結帳前並無保留商品庫存功能，商品庫存分配將以結帳順序為依據。</p>
                    <p>※ 選擇門市取貨付款，包裹送達後隔日下午會簡訊通知領取。</p>
                    <p>※ 當包裹出貨完成未被領取或拒收退回(出貨後7日計算)，該訂購帳號若達三次將無法使用此配送方式。</p>
                    <p>※ 國內配送時間約2-3個工作天，若您遲遲未收到商品，請盡速與客服連絡。</p>
                    <p>※ 提醒您，若您無故或惡意違反制定訂購與退貨相關規則，本公司有權暫停您的帳號並拒絕您使用本服務，同時列為交易黑名單，請您留意。</p>
                </div>
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
    <div class="pageCover"></div>
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
