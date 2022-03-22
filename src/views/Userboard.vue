<template>
  <body class="hasBannerBar">
    <Header/>@@include('./template/_offcanvas.html')
    <ToastList></ToastList>
    <div class="contentWrap">
      <router-view/>
    </div>
    <Footer/>
  </body>
</template>

<script>
import ToastList from '@/components/ToastList.vue'
import emitter from '@/methods/emitter'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  components: {
    Header, Footer, ToastList
  },
  provide () {
    return {
      emitter
    }
  },
  created () {
  }
}
</script>
