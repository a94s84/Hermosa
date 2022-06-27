<template>
  <Loading :active="isLoading" />
  <div class="text-end mt-3">
    <button
      class="btn btn-warning btn-sm"
      type="button"
      @click="openModal(true)"
    >
      增加產品
    </button>
  </div>
  <div v-if="this.products.length == 0" class="text-center mt-5 p-5 fs-1">
    目前沒有產品
  </div>
  <table v-else class="table mt-4">
    <thead>
      <tr>
        <th width="12%">產品圖片</th>
        <th width="27%">產品名稱</th>
        <th width="10%" class="d-none d-lg-table-cell">分類</th>
        <th width="12%" class="d-none d-lg-table-cell">原價</th>
        <th width="12%" class="d-none d-lg-table-cell">售價</th>
        <th width="10%" class="d-none d-lg-table-cell">是否上架</th>
        <th width="15%" class="text-center">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>
          <img
            class="w-100 small-size"
            :src="item.imageUrl"
            :alt="item.title"
          />
        </td>
        <td>{{ item.title }}</td>
        <td class="d-none d-lg-table-cell">{{ item.category }}</td>
        <td class="text-right d-none d-lg-table-cell">
          {{ $filters.currency(item.origin_price) }}
        </td>
        <td class="text-right d-none d-lg-table-cell">
          {{ $filters.currency(item.price) }}
        </td>
        <td class="d-none d-lg-table-cell">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              :id="`launchedSwitch${item.id}`"
              v-model="item.is_enabled"
              :true-value="1"
              :false-value="0"
            />
            <label class="form-check-label" :for="`launchedSwitch${item.id}`">
              <span class="text-success" v-if="item.is_enabled">上架</span>
              <span class="text-muted" v-else>未上架</span>
            </label>
          </div>
        </td>
        <td class="text-center">
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="openModal(false, item)"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="openDelModal('normal', item)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <Pagination
    v-if="this.products.length !== 0"
    :pages="pagination"
    @emitPages="getProducts"
  />
  <ProductModal
    ref="productModal"
    :modalProduct="tempProduct"
    @update-product="updateProduct"
  />
  <DelModal
    ref="delModal"
    @del-Product="delProduct"
    :delItem="tempProduct"
    :type="'normal'"
  />
</template>

<script>
import ProductModal from '@/components/ProductModal.vue'
import DelModal from '@/components/DelModal.vue'
import Pagination from '@/components/Pagination.vue'
import { mapActions } from 'pinia'
import statusStore from '@/stores/statusStore'

export default {
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false
    }
  },
  components: {
    ProductModal,
    DelModal,
    Pagination
  },
  methods: {
    ...mapActions(statusStore, ['pushMessage']),
    openModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {}
      } else {
        this.tempProduct = { ...item }
      }
      this.isNew = isNew
      this.$refs.productModal.showModal()
    },
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.isLoading = false
        } else {
          this.pushMessage(false, '更新', '發生錯誤，請重新整理')
          this.isLoading = false
        }
      })
    },
    updateProduct (item) {
      this.tempProduct = item
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let httpMethod = 'post'
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
        httpMethod = 'put'
      }
      const productComponet = this.$refs.productModal
      this.$http[httpMethod](api, { data: this.tempProduct }).then((res) => {
        productComponet.hideModal()
        this.pushMessage(res.data.success, '更新', res.data.message)
        this.getProducts()
      })
    },
    openDelModal (type, item) {
      this.tempProduct = { ...item }
      this.$refs.delModal.showModal()
    },
    delProduct () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
      this.$http.delete(api).then((res) => {
        const delComponet = this.$refs.delModal
        delComponet.hideModal()
        this.pushMessage(res.data.success, '刪除', res.data.message)
        this.getProducts()
      })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
