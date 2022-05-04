<template>
  <div class="modal fade" id="delModal" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header text-dark py-3 border-0">
          <button type="button" class="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body"><p class="text-dark text-center fs-6 mb-3"> 確定要刪除嗎？</p><p class="text-sm text-gray-400 text-center">(刪除後將無法恢復)</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-dismiss="modal"> 取消 </button>
          <button type="button" class="btn btn-danger text-white btn-sm" @click="$emit('del-product')"> 確認刪除</button></div>
        </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'
export default {
  props: {
    delItem: {}
  },
  data () {
    return {
      modal: ''
    }
  },
  mixins: [modalMixin]
}
</script>
