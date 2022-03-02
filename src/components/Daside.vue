<template>
    <aside class="sidebar vh-100 border-end pt-3 d-flex bg-white flex-column">
    <!-- 1. 後台名稱 -->
    <a href="b_dashboard.html" class="w-50"><img class="w-100" src="../assets/img/logo.png" alt="Hermosa" title="Hermosa"></a>
    <!-- 2. 選單 -->
    <div class="overflow-auto mt-3 w-100">
      <div>
        <a class="sidebar-link active"
          href="b_dashboard.html" role="button">
          <div class="px-4">
            <i class="bi bi-house me-2"></i>
            首頁
          </div>
        </a>
      </div>
      <div><!-- 包含子選項 -->
        <a data-bs-toggle="collapse"
          class="sidebar-link"
          href="#menu-admin" role="button">
          <div class="d-flex justify-content-between px-4">
            <p class="mb-0">
              <i class="bi bi-card-checklist me-2"></i>
              訂單管理
            </p>
            <i class="bi bi-caret-down"></i>
          </div>
        </a>
        <div class="collapse" id="menu-admin" role="button">
          <a href="b_orderlist.html" class="d-block ps-5 text-dark text-decoration-none sidebar-link">
            訂單列表
          </a>
          <a href="b_orderdetail.html" class="d-block ps-5 text-dark text-decoration-none sidebar-link">
            單一訂單細節
          </a>
        </div>
      </div>
      <div>
        <a class="sidebar-link"
          href="b_productlist.html" role="button">
          <div class="px-4">
            <i class="bi bi-receipt-cutoff"></i>
            產品列表
          </div>
        </a>
      </div>
      <div><!-- 不包含子選單 -->
        <a class="sidebar-link"
          href="b_coupon.html" role="button">
          <div class="px-4">
            <i class="bi bi-ticket-detailed"></i>
            優惠券
          </div>
        </a>
      </div>
        <!-- 3. 登出按鈕 -->
        <div>
        <a href="#" class="mt-auto sidebar-link" @click.prevent="logout">
          <div class="px-4">
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
      this.$http.post(api)
        .then((res) => {
          this.$router.push('/login')
        })
    }
  }
}
</script>
