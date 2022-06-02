import { defineStore } from 'pinia'
import statusStore from './statusStore'
import emitter from '@/methods/emitter'
import axios from 'axios'

const status = statusStore()

export default defineStore('productStore', {
  state: () => ({
    products: [],
    productsCategory: []
  }),
  actions: {
    getPdList () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      status.isLoading = true
      axios.get(url).then((res) => {
        status.isLoading = false
        if (res.data.success) {
          this.products = res.data.products
        }
      }).catch(() => {
        status.isLoading = false
        status.pushMessage(false, '更新', '發生錯誤，請重新整理頁面')
      })
    },
    createCategory () {
      this.getPdList()
      this.products.forEach((product) => {
        if (!this.productsCategory.includes(product.category)) {
          this.productsCategory.push(product.category)
        }
      })
    },
    addCart (id, qty = 1) {
      status.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const cart = {
        product_id: id,
        qty
      }
      axios.post(url, { data: cart }).then((res) => {
        status.isLoading = false
        status.pushMessage(res.data.success, '加入', res.data.message)
        if (res.data.success) {
          emitter.emit('updateCart')
        }
      }).catch(() => {
        status.isLoading = false
        status.pushMessage(false, '更新', '發生錯誤，請重新整理頁面')
      })
    }
  }
})
