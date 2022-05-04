<template>
  <Loading :active="isLoading"></Loading>
  <div class="p-4">
    <div class="text-end mt-3">
      <button class="btn btn-danger btn-sm" type="button" @click="openModal(true)"> <i class="bi bi-exclamation-octagon"></i> 刪除所有訂單</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>訂單編號</th>
          <th>購買人姓名</th>
          <th>購買人電話</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th class="text-center">編輯</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in orders" :key="item.id">
          <tr v-if="orders.length">
            <td>{{ $filters.date(item.create_at) }}</td>
            <td>{{ item.id }}</td>
            <td>{{ item.user.name }}</td>
            <td>{{ item.user.tel }}</td>
            <td>
              <ul>
                <li class="pb-1" v-for="(product, i) in item.products" :key="i">
                  {{ product.product.title }} ：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-right">{{ $filters.currency(item.total) }}</td>
            <td>
              <span class="text-success" v-if="item.is_paid">已付款</span>
              <span class="text-muted" v-else>未付款</span>
            </td>
            <td class="text-center">
              <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">檢視</button>
              <button class="btn btn-outline-danger btn-sm" @click="openDelModal(item)">刪除</button>
              </div>
            </td>
          </tr>
          <div v-else>
            目前沒有訂單
          </div>
        </template>
      </tbody>
    </table>
    <Pagination :pages="pagination" @emitPages="getOrders"></Pagination>
    <OrderModal ref="orderModal" :order="tempOrder" @update-order="updateOrder"></OrderModal>
    <DelModal ref="delModal" :delItem="tempOrder"  @del-Product="delOrder"></DelModal>
  </div>
</template>

<script>
import DelModal from '@/components/DelModal.vue'
import OrderModal from '@/components/OrderModal.vue'
import Pagination from '@/components/Pagination.vue'
export default {
  data () {
    return {
      orders: {},
      tempOrder: {},
      pagination: {},
      isLoading: false,
      isNew: false,
      currentPage: 1
    }
  },
  components: {
    Pagination, OrderModal, DelModal
  },
  methods: {
    getOrders (currentPage = 1) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${currentPage}`
      this.$http.get(url).then((res) => {
        this.isLoading = false
        this.orders = res.data.orders
        this.pagination = res.data.pagination
        // console.log(res)
      })
    },
    openModal (isNew, item) {
      this.isNew = isNew
      this.tempOrder = { ...item }
      this.$refs.orderModal.showModal()
    },
    openDelModal (item) {
      this.tempOrder = { ...item }
      this.$refs.delModal.showModal()
    },
    updateOrder (item) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`
      const paid = {
        is_paid: item.is_paid
      }
      this.$http.put(api, { data: paid }).then((res) => {
        this.isLoading = false
        this.getOrders(this.currentPage)
        this.$refs.orderModal.hideModal()
        this.$httpMessageState(res, '更新付款狀態')
      })
    },
    delOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`
      this.isLoading = true
      this.$http.delete(url).then((res) => {
        console.log(res)
        this.isLoading = false
        this.getOrders(this.currentPage)
        this.$refs.delModal.hideModal()
        this.$httpMessageState(res, '訂單已刪除')
      })
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
