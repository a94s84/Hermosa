<template>
      <main class="main container-fluid">
            <div class="bg-white w-100 border-bottom sticky-top d-flex">
              <a href="#"
              class="d-inline-block py-3 px-4 border-end" id="toggle-btn">
                <i class="bi bi-arrows-angle-expand"></i>
              </a>
              <p class="py-3 px-4">Hermosa-後台管理</p>
            </div>
            <div class="p-4">
            <div class="text-end mt-3">
                <button class="btn btn-warning btn-sm" type="button"
                @click="openModal(true)">
                增加產品
                </button>
            </div>
            <table class="table mt-4">
                <thead>
                    <tr>
                    <th width="120">分類</th>
                    <th>產品名稱</th>
                    <th width="120">原價</th>
                    <th width="120">售價</th>
                    <th width="100">是否啟用</th>
                    <th width="200" class="text-center">編輯</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in products" :key="item.id">
                    <td>{{item.category}}</td>
                    <td>{{item.title}}</td>
                    <td class="text-right">{{item.origin_price}}</td>
                    <td class="text-right">{{item.price}}</td>
                    <td>
                        <span class="text-success" v-if="item.is_enabled">啟用</span>
                        <span class="text-muted" v-else>未啟用</span>
                    </td>
                    <td class="text-center">
                        <div class="btn-group">
                        <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
                        <button class="btn btn-outline-danger btn-sm">刪除</button>
                        </div>
                    </td>
                    </tr>
                </tbody>
                </table>
                <ProductModal ref="productModal" :modalProduct="tempProduct" @update-product="updateProduct"></ProductModal>
            </div>
          </main>
</template>

<script>
import ProductModal from '@/components/ProductModal.vue'

export default {
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false
    }
  },
  components: {
    ProductModal
  },
  methods: {
    openModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {}
      } else {
        this.tempProduct = { ...item }
      }
      this.isNew = isNew
      this.$refs.productModal.showModal()
    },
    getProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products`
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          console.log(res.data)
          this.products = res.data.products
          this.pagination = res.data.pagination
        }
      })
    },
    updateProduct (item) {
      this.tempProduct = item
      // 更新
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let httpMethod = 'post'
      // 編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
        httpMethod = 'put'
      }
      const productComponet = this.$refs.productModal
      this.$http[httpMethod](api, { data: this.tempProduct }).then((res) => {
        if (res.data.success) {
          productComponet.hideModal()
          this.getProducts()
        } else {
          alert('請填寫所有必填欄位')
          this.getProducts()
          console.log(res)
        }
      })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
