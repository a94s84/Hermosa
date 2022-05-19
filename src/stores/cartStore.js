import { defineStore } from 'pinia'
import statusStore from './statusStore'
import emitter from '@/methods/emitter'
import axios from 'axios'

const status = statusStore()

export default defineStore('cartStore', {
  state: () => ({
    carts: []
  }),
  actions: {
    getCartList () {
      status.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      axios.get(api).then((res) => {
        status.isLoading = false
        if (res.data.success) {
          this.carts = res.data.data
        }
      }).catch(() => {
        status.isLoading = false
        status.pushMessage(false, '發生錯誤，請重新整理頁面')
      })
    },
    updateCart (item, qty) {
      status.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      const cart = {
        product_id: item.product_id,
        qty: qty
      }
      axios.put(url, { data: cart }).then((res) => {
        status.isLoading = false
        emitter.emit('updateCart')
        status.pushMessage(res, res.data.message)
        this.getCartList()
      }).catch(() => {
        status.isLoading = false
        status.pushMessage(false, '發生錯誤，請重新整理頁面')
      })
    }
  }
})
