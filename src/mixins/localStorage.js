export default {
  methods: {
    saveLocalStorage (itemId) {
      const favoriteId = JSON.stringify(itemId)
      localStorage.setItem('favoriteItems', favoriteId)
    },
    addFavorite (itemId) {
      if (this.favoriteItems.includes(itemId)) {
        this.favoriteItems.splice(this.favoriteItems.indexOf(itemId), 1)
        this.emitter.emit('push-message', {
          style: 'warning',
          title: '商品已從收藏清單移除'
        })
        this.isLoading = false
      } else {
        this.favoriteItems.push(itemId)
        this.emitter.emit('push-message', {
          style: 'success',
          title: '商品已加入收藏清單'
        })
        this.isLoading = false
      }
      localStorage.setItem('favoriteItems', JSON.stringify(this.favoriteItems))
      this.emitter.emit('update-favorite')
    },
    getLocalStorage () {
      return JSON.parse(localStorage.getItem('favoriteItems'))
    }
  }
}
