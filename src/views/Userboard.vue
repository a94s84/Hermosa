<template>
  <body class="hasBannerBar" ref="mainbody">
    <Header/>
    <ToastList></ToastList>
    <router-view/>
  </body>
</template>

<script>
import ToastList from '@/components/ToastList.vue'
import emitter from '@/methods/emitter'
import Header from '../components/Header.vue'

export default {
  components: {
    Header, ToastList
  },
  methods: {
    closeTopBanner () {
      this.$refs.mainbody.classList.remove('hasBannerBar')
    }
  },
  provide () {
    return {
      emitter
    }
  }
}
</script>
