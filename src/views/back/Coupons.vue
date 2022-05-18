<template>
  <div>
    <Loading :active="isLoading"></Loading>
    <div class="text-end mt-4">
      <button class="btn btn-warning btn-sm" type="button" @click="openCouponModal(true)">建立新的優惠券</button>
    </div>
    <table class="table mt-4">
      <thead>
      <tr>
        <th>活動名稱</th>
        <th>優惠碼</th>
        <th class="d-none d-lg-table-cell">折扣百分比</th>
        <th class="d-none d-lg-table-cell">到期日</th>
        <th class="d-none d-lg-table-cell">是否啟用</th>
        <th class="text-center">編輯</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, key) in coupons" :key="key">
        <td>{{ item.title }}</td>
        <td>{{ item.code }}</td>
        <td class="d-none d-lg-table-cell">{{ item.percent }}%</td>
        <td class="d-none d-lg-table-cell">{{ $filters.date(item.due_date) }}</td>
        <td class="d-none d-lg-table-cell">
          <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
          <span v-else class="text-muted">未起用</span>
        </td>
        <td class="text-center">
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" @click="openCouponModal(false, item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="openDelCouponModal(item)">刪除</button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @emitPages="getCoupons"></Pagination>
    <CouponModal ref="couponModal" :coupon="tempCoupon" @update-coupon="updateCoupon"></CouponModal>
    <DelModal :delItem="tempCoupon" ref="delModal" @del-product="delCoupon"/>
  </div>
</template>

<script>
import CouponModal from '@/components/CouponModal.vue'
import DelModal from '@/components/DelModal.vue'
import Pagination from '@/components/Pagination.vue'
export default {
  components: { CouponModal, DelModal, Pagination },
  props: {
    config: Object
  },
  inject: ['emitter'],
  data () {
    return {
      coupons: {},
      pagination: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      isLoading: false,
      isNew: false
    }
  },
  methods: {
    openCouponModal (isNew, item) {
      this.isNew = isNew
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000
        }
      } else {
        this.tempCoupon = { ...item }
      }
      this.$refs.couponModal.showModal()
    },
    openDelCouponModal (item) {
      this.tempCoupon = { ...item }
      this.$refs.delModal.showModal()
    },
    getCoupons (page = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`
      this.$http.get(url, this.tempCoupon).then((res) => {
        this.coupons = res.data.coupons
        this.pagination = res.data.pagination
      })
    },
    updateCoupon (tempCoupon) {
      this.isLoading = true
      if (this.isNew) {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`
        this.$http.post(url, { data: tempCoupon }).then((res) => {
          console.log(res, tempCoupon)
          this.$httpMessageState(res, '新增優惠券成功')
          this.getCoupons()
          this.$refs.couponModal.hideModal()
          this.isLoading = false
        })
      } else {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
        this.$http.put(url, { data: this.tempCoupon }).then((res) => {
          this.$httpMessageState(res, '更新優惠券成功')
          this.getCoupons()
          this.$refs.couponModal.hideModal()
          this.isLoading = false
        })
      }
    },
    delCoupon () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
      this.isLoading = true
      this.$http.delete(url).then((res) => {
        this.$httpMessageState(res, '刪除優惠券成功')
        this.getCoupons()
        this.$refs.delModal.hideModal()
        this.isLoading = false
      })
    }
  },
  created () {
    this.getCoupons()
  }
}
</script>
