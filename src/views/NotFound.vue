<template>
  <Header />
  <div class="contentWrap">
    <div class="d-flex flex-column align-items-center">
      <img
        src="@/assets/img/oops.gif"
        alt="404 Not Found"
        style="max-width: 75%"
      />
      <h2 class="fw-bold my-4 fs-2 fs-md-display">404 Page Not Found</h2>
      <p class="text-center fw-bold fs-5 fs-md-3 mb-4">這個頁面不存在喔!</p>
      <p class="text-center fw-bold fs-5 fs-md-3 mb-4">
        該頁將在
        <span class="text-primaryDark fs-4">{{ count }}</span> 秒後自動跳轉
      </p>
      <router-link to="/" class="btn btn-sm btn-outline-dark fs-6 mb-3"
        >點擊回到首頁</router-link
      >
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  data () {
    return {
      count: 6
    }
  },
  components: {
    Header
  },
  methods: {
    countDown () {
      this.count--
      if (this.count === 0) {
        this.$router.push('/')
      }
      setTimeout(() => {
        this.countDown()
      }, 1000)
    }
  },
  mounted () {
    this.countDown()
  }
}
</script>
