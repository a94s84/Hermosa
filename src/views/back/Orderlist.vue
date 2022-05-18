<template>
  <Loading :active="isLoading"></Loading>
  <div class="text-end mt-3">
    <button class="btn btn-danger btn-sm" v-if="this.orders.length !== 0" type="button" @click="openModal('deleteAll')"> <i class="bi bi-exclamation-octagon"></i> 刪除所有訂單</button>
  </div>
  <div v-if="this.orders.length == 0" class="text-center mt-5 p-5 fs-1">目前沒有訂單</div>
  <table v-else class="table mt-4">
    <thead>
      <tr>
        <th>購買時間</th>
        <th>訂單編號</th>
        <th>購買人姓名</th>
        <th>購買人電話</th>
        <!-- <th>購買款項</th> -->
        <th>應付金額</th>
        <th>訂單狀態</th>
        <th class="text-center" style="width:60px">詳情</th>
        <th class="text-center">編輯 / 刪除</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="item in orders" :key="item.id">
        <tr>
          <td>{{ $filters.date(item.create_at) }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.user.name }}</td>
          <td>{{ item.user.tel }}</td>
          <!-- <td>
            <ul>
              <li class="pb-1" v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} ：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td> -->
          <td class="text-right">{{ $filters.currency(item.total) }}</td>
          <td>
            <span class="text-success" v-if="item.is_paid">已付款</span>
            <span class="text-muted" v-else>未付款</span>
          </td>
          <td class="text-center">
            <button @click="openModal('watch', item)"><i class="bi bi-eye-fill"></i></button>
          </td>
          <td class="text-center">
            <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" @click="openModal('edit', item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="openModal('delete', item)">刪除</button>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  <Pagination  v-if="this.orders.length !== 0" :pages="pagination" @emitPages="getOrders"></Pagination>
  <OrderModal ref="orderModal" :order="tempOrder" @update-order="updateOrder"></OrderModal>
  <OrderEditModal ref="orderEditModal" :order="tempOrder" @update-order="updateOrder"></OrderEditModal>
  <DelModal ref="delModal" :delItem="tempOrder" :type="'order'" @del-Product="delOrder"></DelModal>
</template>

<script>
import DelModal from '@/components/DelModal.vue'
import OrderEditModal from '@/components/OrderEditModal.vue'
import OrderModal from '@/components/OrderModal.vue'
import Pagination from '@/components/Pagination.vue'
export default {
  data () {
    return {
      orders: {},
      tempOrder: {},
      pagination: {},
      isLoading: false,
      // isEdit: false,
      currentPage: 1
    }
  },
  components: {
    Pagination, OrderEditModal, OrderModal, DelModal
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
    openModal (type, item) {
      if (type === 'watch') {
        this.tempOrder = { ...item }
        this.$refs.orderModal.showModal()
      } else if (type === 'edit') {
        this.tempOrder = { ...item }
        this.$refs.orderEditModal.showModal()
      } else if (type === 'delete') {
        this.tempOrder = { ...item }
        this.$refs.delModal.showModal()
        console.log(this.tempOrder)
      } else if (type === 'deleteAll') {
        this.tempOrder = { id: null, user: {} }
        this.$refs.delModal.showModal()
      }
    },
    updateOrder (item) {
      this.isLoading = true
      if (item) {
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`
        const data = {
          data: { ...item }
        }
        this.$http.put(api, data).then((res) => {
          this.isLoading = false
          this.getOrders(this.currentPage)
          this.$refs.orderEditModal.hideModal()
          this.$httpMessageState(res, '更新訂單')
        })
      } else {
        this.$refs.orderModal.hideModal()
        this.isLoading = false
      }
    },
    delOrder () {
      let url = ''
      if (this.tempOrder.id) {
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`
      } else {
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders/all`
      }
      this.isLoading = true
      this.$http.delete(url).then((res) => {
        console.log(res)
        this.isLoading = false
        this.getOrders(this.currentPage)
        this.$refs.delModal.hideModal()
        this.$httpMessageState(res, '訂單刪除')
      })
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
