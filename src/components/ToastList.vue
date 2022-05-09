<template>
 <div class="position-fixed w-100" style="z-index:12; margin-top: 80px">
    <div class="toast-container position-absolute pe-3 pt-5 top-0 end-0" >
        <Toast v-for="(msg, key) in messages" :key="key" :msg="msg" />
    </div>
  </div>
</template>

<script>
import Toast from '@/components/Toast.vue'
export default {
  components: { Toast },
  data () {
    return {
      messages: []
    }
  },
  inject: ['emitter'],
  mounted () {
    this.emitter.on('push-message', (message) => {
      const { style = 'success', title, content } = message
      this.messages.push({ style, title, content })
    })
  }
}
</script>
