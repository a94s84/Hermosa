<template>
  <div class="modal fade" id="orderModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-secondary text-white">
          <h5 class="modal-title fs-6" id="exampleModalLabel">
            <span>訂單細節</span>
          </h5>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close">
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-5">
              <h3 class="fs-6">用戶資料</h3>
              <table class="table mt-2">
                <tbody v-if="tempOrder.user">
                  <tr>
                    <th style="width: 100px;">姓名</th>
                    <td>{{ tempOrder.user.name }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ tempOrder.user.email }}</td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>{{ tempOrder.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ tempOrder.user.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-7">
              <h3 class="fs-6">訂單細節</h3>
              <table class="table mt-2">
                <tbody>
                  <tr>
                    <th style="width: 100px">訂單編號</th>
                    <td>{{ tempOrder.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ $filters.date(tempOrder.create_at)}}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span v-if="tempOrder.paid_date">
                        {{ $filters.date(tempOrder.paid_date) }}
                      </span>
                      <span v-else>時間不正確</span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                    <!-- <strong v-if="tempOrder.is_paid" class="text-success">已付款</strong>
                    <span v-else class="text-muted">尚未付款</span> -->
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" :id="`paidSwitch${tempOrder.id}`" v-model="tempOrder.is_paid">
                        <label class="form-check-label" :for="`paidSwitch${tempOrder.id}`">
                            <span class="align-middle" v-if="tempOrder.is_paid">已付款</span>
                            <span class="align-middle" v-else>未付款</span>
                        </label>
                    </div>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>
                      {{ $filters.currency(tempOrder.total) }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <h3 class="fs-6 mt-3">選購商品</h3>
              <table class="table mt-2">
                <thead>
                  <tr>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in tempOrder.products" :key="item.id">
                    <th>
                      {{ item.product.title }}
                    </th>
                    <td>
                      {{ item.qty }} / {{ item.product.unit }}
                    </td>
                    <td class="text-end">
                      {{ $filters.currency(item.final_total) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary"
                  data-bs-dismiss="modal">取消
          </button>
          <button type="button" class="btn btn-primary"
                  @click="$emit('update-order', tempOrder)">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'
export default {
  name: 'orderModal',
  props: {
    order: {
      type: Object,
      default () { return {} }
    }
  },
  data () {
    return {
      //   status: {},
      modal: '',
      tempOrder: {},
      isPaid: false
    }
  },
  emits: ['update-order'],
  mixins: [modalMixin],
  inject: ['emitter'],
  watch: {
    order () {
      this.tempOrder = this.order
      this.isPaid = this.tempOrder.is_paid
    }
  }
}
</script>
