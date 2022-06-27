import { defineStore } from 'pinia'

export default defineStore('statusStore', {
  state: () => ({
    isLoading: false,
    messages: []
  }),
  actions: {
    pushMessage (res = true, title = '更新', content) {
      if (res) {
        this.messages.push({
          style: 'success',
          title: `${title}成功`,
          content: `${content}`
        })
      } else {
        this.messages.push({
          style: 'danger',
          title: `${title}失敗`,
          content: `${content}`
        })
      }
    }
  }
})
