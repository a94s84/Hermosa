import { mapActions } from 'pinia'
import statusStore from '@/stores/statusStore'

export default {
  methods: {
    ...mapActions(statusStore, ['pushMessage']),
    saveLocalStorage (itemId) {
      const favoriteId = JSON.stringify(itemId)
      localStorage.setItem('favoriteItems', favoriteId)
    },
    addFavorite (itemId) {
      if (this.favoriteItems.includes(itemId)) {
        this.favoriteItems.splice(this.favoriteItems.indexOf(itemId), 1)
        this.pushMessage(true, '移除', '已從收藏清單移除')
      } else {
        this.favoriteItems.push(itemId)
        this.pushMessage(true, '加入', '已加入收藏清單')
      }
      localStorage.setItem('favoriteItems', JSON.stringify(this.favoriteItems))
      this.emitter.emit('update-favorite')
    },
    getLocalStorage () {
      return JSON.parse(localStorage.getItem('favoriteItems'))
    }
  }
}
