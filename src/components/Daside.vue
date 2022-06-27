<template>
  <aside class="sidebar vh-100 border-end pt-3 d-flex bg-white flex-column">
    <!-- 1. 後台名稱 -->
    <a href="#" class="w-50"
      ><img
        class="w-100"
        src="../assets/img/logo.png"
        alt="Hermosa"
        title="HermosaPlat"
    /></a>
    <!-- 2. 選單 -->
    <div class="overflow-auto mt-3 w-100">
      <div>
        <router-link to="/dashboard/productlist" class="sidebar-link">
          <div class="px-4">
            <i class="bi bi-receipt-cutoff"></i>
            產品列表
          </div>
        </router-link>
      </div>
      <div>
        <router-link to="/dashboard/orderlist" class="sidebar-link">
          <div class="px-4">
            <i class="bi bi-card-checklist me-2"></i>
            訂單管理
          </div>
        </router-link>
      </div>
      <div>
        <router-link to="/dashboard/coupons" class="sidebar-link">
          <div class="px-4">
            <i class="bi bi-ticket-detailed"></i>
            優惠券
          </div>
        </router-link>
      </div>
      <div class="mt-3">
        <router-link to="/" class="sidebar-link">
          <div class="px-4">
            <i class="bi bi-house-door"></i>
            前往前台
          </div>
        </router-link>
      </div>
      <div>
        <a href="#" class="mt-auto sidebar-link" @click.prevent="logout">
          <div class="px-4">
            <i class="bi bi-box-arrow-right"></i>
            登出
          </div>
        </a>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  methods: {
    logout () {
      const api = `${process.env.VUE_APP_API}logout`
      this.$http.post(api).then((res) => {
        this.$router.push('/login')
      })
    }
  }
}
</script>
