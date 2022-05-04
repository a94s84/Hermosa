<template>
    <Loading :active="isLoading"></Loading>
    <Header></Header>
     <div class="contentWrap">
        <form class="login_tabCnt loginWrap" @submit.prevent="signIn">
            <p class="login_Nav">LOGIN</p>
            <div>
                <input type="email" placeholder="E-mail" v-model="user.username" required>
                <div class="pw_switch">
                    <input type="password" placeholder="密碼" v-model="user.password" required>
                    <span class="pw_see"></span>
                </div>
                <button class="btn_black">登入</button>
                <div class="d-flex d-sp">
                    <label>
                        <input type="checkbox">記住我
                    </label>
                    <a class="forgetPW" href="forget.html">忘記密碼？</a>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'Login',
  components: {
    Header
  },
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      isLoading: false
    }
  },
  methods: {
    signIn () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}admin/signin`
      this.$http.post(api, this.user)
        .then((res) => {
          this.isLoading = false
          if (res.data.success) {
            const { token, expired } = res.data
            document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
            this.$router.push('/dashboard/productlist')
          } else {
            // alert('登入失敗，請輸入正確的帳號密碼')
            this.$httpMessageState(res, '登入失敗，請輸入正確的帳號密碼')
            this.user.username = ''
            this.user.password = ''
          }
        })
    }
  }
}
</script>
