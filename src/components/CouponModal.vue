<template>
  <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fs-6 lh-1" id="exampleModalLabel">優惠券</h5>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title" class="form-label">標題</label>
            <input type="text" class="form-control" id="title" v-model="innerTempCoupon.title" placeholder="請輸入標題">
          </div>
          <div class="mb-3">
            <label for="coupon_code" class="form-label">優惠碼</label>
            <input type="text" class="form-control" id="coupon_code" v-model="innerTempCoupon.code" placeholder="請輸入優惠碼">
          </div>
          <div class="mb-3">
            <label for="due_date" class="form-label">到期日</label>
            <input type="date" class="form-control" id="due_date" v-model="due_date">
          </div>
          <div class="mb-3">
            <label for="price" class="form-label">折扣百分比</label>
            <input type="number" class="form-control" id="price" v-model.number="innerTempCoupon.percent" placeholder="請輸入折扣百分比">
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input class="form-check-input mt-0" type="checkbox"
                     :true-value="1"
                     :false-value="0"
                     v-model="innerTempCoupon.is_enabled" id="is_enabled">
              <label class="form-check-label lh-base" for="is_enabled">
                是否啟用
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="$emit('update-coupon', innerTempCoupon)">確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modalMixin from '@/mixins/modalMixin'
export default {
  name: 'couponModal',
  props: {
    coupon: {}
  },
  data () {
    return {
      innerTempCoupon: {},
      due_date: ''
    }
  },
  emits: ['update-coupon'],
  mixins: [modalMixin],
  watch: {
    coupon () {
      this.innerTempCoupon = this.coupon
      const dateAndTime = new Date(this.innerTempCoupon.due_date * 1000).toISOString().split('T')
      this.due_date = dateAndTime[0]
    },
    due_date () {
      this.innerTempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000)
    }
  }
}
</script>
