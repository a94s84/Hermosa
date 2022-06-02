<template>
  <body ref="dashboardBody">
    <ToastList />
    <div class="d-flex">
      <Daside />
      <main class="main">
        <div class="bg-white w-100 border-bottom sticky-top d-flex">
          <a
            href="#"
            class="d-inline-block py-3 px-4 border-end"
            @click.prevent="sidebarToggle"
          >
            <i class="bi bi-arrows-angle-expand"></i>
          </a>
          <p class="py-3 px-4">Hermosa-後台管理</p>
        </div>
        <div class="p-2 p-md-4">
          <router-view />
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
    Daside,
    ToastList
  },
  provide () {
    return {
      emitter
    }
  },
  methods: {
    sidebarToggle () {
      this.$refs.dashboardBody.classList.toggle('sidebar-toggled')
    }
  },
  created () {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    this.$http.defaults.headers.common.Authorization = token
    const api = `${process.env.VUE_APP_API}api/user/check`
    this.$http.post(api).then((res) => {
      if (!res.data.success) {
        this.$router.push('/login')
      }
    })
  }
}
</script>
