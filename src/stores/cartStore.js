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
        status.pushMessage(false, '更新', '發生錯誤，請重新整理頁面')
      })
    },
    updateCart (item, qty) {
      status.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      const cart = {
        product_id: item.product_id,
        qty: qty
      }
      if (qty >= 1) {
        axios.put(url, { data: cart }).then((res) => {
          this.getCartList()
          status.isLoading = false
          emitter.emit('updateCart')
          status.pushMessage(res, '更新', res.data.message)
        }).catch(() => {
          status.isLoading = false
          status.pushMessage(false, '更新', '發生錯誤，請重新整理頁面')
        })
      } else {
        status.isLoading = false
        status.pushMessage(false, '更新', '至少購入一件商品')
      }
    }
  }
})
