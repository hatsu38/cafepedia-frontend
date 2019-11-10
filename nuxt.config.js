require('dotenv').config()
const { GOOGLE_MAP_API_KEY } = process.env

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'カフェぺディア | あなたの近くにあるカフェがすぐに見つかる',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'カフェペディアは、全国のカフェの設備情報サイトです。「Wi-Fi」「コンセント」「喫煙席」など設備に応じて気になるカフェを探すことが可能です。位置情報をONにすれば、すぐにあなたの近くにあるカフェもわかります。是非カフェ探しにご活用ください!' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: "https://use.fontawesome.com/releases/v5.0.13/css/all.css" }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^vue2-google-maps($|\/)/],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      config.externals = config.externals || [];
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      // GoogleMapを表示するPlugin
    }
  },
  env: {
    GOOGLE_MAP_API_KEY
  },
  plugins: [
    { src: "~/plugins/vue2-google-maps", ssr: false },
    { src: '~/plugins/infiniteloading', ssr: false }
  ],
  vendor: ['vue2-google-maps'],
  modules: [
    "@nuxtjs/axios",
    '@nuxtjs/vuetify'
  ],
  axios: {
  },
  vuetify: {
    // Vuetify の設定はここに書く
    theme: {
      primary: '#3f51b5',
      secondary: '#b0bec5',
      accent: '#8c9eff',
      error: '#b71c1c'
    },
  }
}

