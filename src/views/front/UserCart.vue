<template>
  <Loading :active="isLoading" />
  <div class="contentWrap">
    <div class="wrap cartWrap">
      <div class="cart_top">
        <ul class="cart-menu">
          <li class="active">購物清單</li>
          <li>填寫資料</li>
          <li>確認訂單</li>
          <li>完成購物</li>
        </ul>
        <div>
          <h2>購物清單</h2>
          <a
            href="#"
            class="btn btn-outline-secondary"
            @click.prevent="openDelModal()"
            >清空購物車</a
          >
        </div>
      </div>
      <div class="cart-buyinglist">
        <form v-if="carts.total !== 0">
          <div
            class="cart-pdbox pdbox"
            v-for="item in carts.carts"
            :key="item.id"
          >
            <router-link :to="`/product/${item.product.id}`">
              <img :src="`${item.product.imageUrl}`" />
            </router-link>
            <router-link :to="`/product/${item.product.id}`">
              <p class="pdbox-name">{{ item.product.title }}</p>
            </router-link>
            <table class="pdcnt-table">
              <thead>
                <tr>
                  <th>SIZE</th>
                  <th>QUANTITY</th>
                  <td>Price</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="pdcnt-info-size">F</td>
                  <td class="pdcnt-info-number">
                    <div class="position-relative">
                      <button
                        class="text-dark qty-minus"
                        type="button"
                        @click.prevent="updateCart(item, item.qty - 1)"
                      >
                        -
                      </button>
                      <input
                        class="text-center w-25 border-0 bg-transparent"
                        type="number"
                        min="1"
                        v-model.number="item.qty"
                        @change="updateCart(item, item.qty)"
                      />
                      <button
                        type="button"
                        class="text-dark qty-plus"
                        @click.prevent="updateCart(item, item.qty + 1)"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td v-if="item.product.price !== item.product.origin_price">
                    <span class="pdbox-price-sale">{{
                      $filters.currency(item.product.price)
                    }}</span
                    ><span class="pdbox-price-origin">{{
                      $filters.currency(item.product.origin_price)
                    }}</span>
                  </td>
                  <td v-else>{{ $filters.currency(item.product.price) }}</td>
                </tr>
              </tbody>
            </table>
            <div class="d-sp">
              <p class="pdcnt-price">
                Total: NT${{ $filters.currency(item.final_total) }}
              </p>
              <a
                href="#"
                class="pdcnt-trash"
                @click.prevent="openDelModal(item)"
              >
                <img src="../../assets/img/delete.svg" alt="" />
              </a>
            </div>
          </div>
        </form>
        <div class="cart-nothing" v-else>您的購物車目前是空的！</div>
        <DelModal
          ref="delModal"
          @del-Product="delITem"
          :delItem="tempProduct"
        />
      </div>
    </div>
    <div class="footer-fixed">
      <div class="wrap d-sp">
        <router-link
          :to="{ name: 'productlist', query: { category: 'ALL' } }"
          class="btn-pre-white"
          >繼續購物</router-link
        >
        <div>
          <h3>
            總計: <span>NT${{ $filters.currency(carts.final_total) }}</span>
          </h3>
        </div>
        <div>
          <router-link to="/check" class="btn-next-white" v-if="carts.total > 0"
            >下一步</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DelModal from '@/components/DelModal.vue'
import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cartStore'
import statusStore from '@/stores/statusStore'
import emitter from '@/methods/emitter'

export default {
  data () {
    return {
      tempProduct: {}
    }
  },
  components: {
    DelModal
  },
  computed: {
    ...mapState(cartStore, ['carts']),
    ...mapState(statusStore, ['isLoading'])
  },
  inject: ['emitter'],
  methods: {
    ...mapActions(cartStore, ['getCartList', 'updateCart']),
    ...mapActions(statusStore, ['pushMessage']),
    openDelModal (item) {
      this.tempProduct = { ...item }
      this.$refs.delModal.showModal()
    },
    delITem () {
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`
      if (this.tempProduct.id) {
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${this.tempProduct.id}`
      }
      this.$http.delete(url).then((res) => {
        const delComponet = this.$refs.delModal
        delComponet.hideModal()
        emitter.emit('updateCart')
        this.pushMessage(res.data.success, '刪除', res.data.message)
        this.getCartList()
      })
    }
  },
  created () {
    this.getCartList()
  }
}
</script>
