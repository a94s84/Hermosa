<template>
 <div class="position-fixed w-100" style="z-index:12; margin-top: 80px">
    <div class="toast-container position-absolute pe-3 pt-5 top-0 end-0" >
        <Toast v-for="(msg, key) in messages" :key="key" :msg="msg" />
    </div>
  </div>
</template>

<script>
import Toast from '@/components/Toast.vue'
import { mapState, mapActions } from 'pinia'
import statusStore from '@/stores/statusStore'

export default {
  components: { Toast },
  computed: {
    ...mapState(statusStore, ['messages'])
  },
  methods: {
    ...mapActions(statusStore, ['pushMessage'])
  }
}
</script>
