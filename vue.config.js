module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/Hermosa/' : '/',
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      const [meta] = args
      meta.title = 'Hermosa | 美麗如你'
      meta.icon = 'favicon.ico'
      meta.meta = {
        description:
          'Hermosa用溫暖率性的風格描繪日常的細膩，每一個日子，都能享受美麗的自己；用服裝上的細節，訴說不同的故事，讓每個你都成為故事的主角。',
        og: {
          type: 'website',
          url: 'https://a94s84.github.io/Hermosa/#/',
          title: 'Hermosa',
          image: '@/public/favicon.ico',
          description:
            'Hermosa用服裝上的細節，訴說不同的故事，讓每個你都成為故事的主角。'
        }
      }
      return args
    })
  }
}
