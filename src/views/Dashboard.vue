<template>
<body>
  <ToastList></ToastList>
  <div class="d-flex">
    <Daside></Daside>
    <main class="main">
      <div class="bg-white w-100 border-bottom sticky-top d-flex">
        <p class="py-3 px-4">Hermosa-後台管理</p>
      </div>
      <div class="p-4">
        <router-view/>
      </div>
    </main>
  </div>
</body>
</template>

<script>
import Daside from '@/components/Daside.vue'
import ToastList from '@/components/ToastList.vue'
import emitter from '@/methods/emitter'

export default {
  components: {
    Daside, ToastList
  },
  provide () {
    return {
      emitter
    }
  },
  created () {
    //   確認是否維持登入狀態
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = token
    // 串接驗證api
    const api = `${process.env.VUE_APP_API}api/user/check`
    console.log(api)
    this.$http.post(api).then((res) => {
      console.log(res)
      if (!res.data.success) {
        this.$router.push('/login')
      }
    })
  }
}
</script>
