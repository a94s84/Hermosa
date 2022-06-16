<template>
  <body>
    <Loading :active="isLoading" />
    <Header />
    <ToastList />
    <div class="contentWrap">
      <form class="loginWrap" @submit.prevent="signIn">
        <p class="login-Nav">LOGIN</p>
        <div>
          <input
            type="email"
            placeholder="E-mail"
            v-model="user.username"
            required
          />
          <div class="pw-switch">
            <input
              :type="passwordType"
              placeholder="密碼"
              v-model="user.password"
              required
            />
            <span class="pw-see" ref="switchBtn" @click="switchPassword"></span>
          </div>
          <button type="submit" class="btn-black ">登入</button>
        </div>
      </form>
    </div>
  </body>
  <Footer />
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import ToastList from '@/components/ToastList.vue'
import { mapActions } from 'pinia'
import statusStore from '@/stores/statusStore'

export default {
  name: 'Login',
  components: {
    Header,
    Footer,
    ToastList
  },
  data () {
    return {
      user: {
        username: 'hermoda@service.com',
        password: ''
      },
      passwordType: 'password',
      isLoading: false
    }
  },
  methods: {
    ...mapActions(statusStore, ['pushMessage']),
    signIn () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}admin/signin`
      this.$http.post(api, this.user).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          const { token, expired } = res.data
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
          this.$router.push('/dashboard/productlist')
        } else {
          this.pushMessage(false, '登入', '請輸入正確的帳號密碼')
          this.user.username = 'hermoda@service.com'
          this.user.password = ''
        }
      })
    },
    checkUser () {
      this.isLoading = true
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      this.$http.defaults.headers.common.Authorization = token
      const api = `${process.env.VUE_APP_API}api/user/check`
      this.$http.post(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.$router.push('/dashboard/productlist')
        }
      })
    },
    switchPassword () {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
      this.$refs.switchBtn.classList.toggle('show')
      this.pushMessage(false, '登入', '請輸入正確的帳號密碼')
    }
  },
  mounted () {
    this.checkUser()
  }
}
</script>
