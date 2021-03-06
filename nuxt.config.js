require('dotenv').config()
const { GOOGLE_MAP_API_KEY } = process.env
const { CAFEPEDIA_GA_ID } = process.env
const { CAFEPDIA_NUXT_GTAG_ID } = process.env
const { CAFEPEDIA_GOOGLE_ADSENSE } = process.env
const { CAFEPEDIA_LOG_ROCKET_ID } = process.env

const baseName = 'カフェぺディア | あなたの近くにあるカフェがすぐに見つかる'
const baseDesc =
  'カフェペディアは、全国のカフェの設備情報サイトです。「Wi-Fi」「コンセント」「喫煙席」など設備に応じて気になるカフェを探すことが可能です。位置情報をONにすれば、すぐにあなたの近くにあるカフェもわかります。是非カフェ探しにご活用ください!'
const baseUrl = 'https://cafepedia.jp/'
const baseOgp =
  'https://cafepedia-images.s3-ap-northeast-1.amazonaws.com/images/ogp_img.png'

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: baseName,
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: baseDesc },
      { hid: 'og:site_name', property: 'og:site_name', content: baseName },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: baseUrl },
      { hid: 'og:title', property: 'og:title', content: baseName },
      { hid: 'og:description', property: 'og:description', content: baseDesc },
      { hid: 'og:image', property: 'og:image', content: baseOgp },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@hatsu_38' },
      { hid: 'robots', name: 'robots', content: 'noindex' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicons/favicon.ico' },
      { rel: 'manifest', href: '/favicons/manifest.json' },
      {
        rel: 'apple-touch-icon',
        sizes: '57x57',
        href: '/favicons/apple-touch-icon-57x57.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '60x60',
        href: '/favicons/apple-touch-icon-60x60.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '72x72',
        href: '/favicons/apple-touch-icon-72x72.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '76x76',
        href: '/favicons/apple-touch-icon-76x76.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '114x114',
        href: '/favicons/apple-touch-icon-114x114.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '120x120',
        href: '/favicons/apple-touch-icon-120x120.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '144x144',
        href: '/favicons/apple-touch-icon-144x144.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '152x152',
        href: '/favicons/apple-touch-icon-152x152.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/favicons/apple-touch-icon-180x180.png'
      }
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
    transpile: [/^vue2-google-maps($|\/)/]
  },
  env: {
    GOOGLE_MAP_API_KEY,
    CAFEPEDIA_GA_ID,
    CAFEPDIA_NUXT_GTAG_ID,
    CAFEPEDIA_GOOGLE_ADSENSE,
    CAFEPEDIA_LOG_ROCKET_ID
  },
  plugins: [
    { src: '~/plugins/vue2-google-maps', ssr: true },
    { src: '~/plugins/infiniteloading', ssr: false },
    { src: '~/plugins/api-urls', ssr: true }
  ],
  vendor: ['vue2-google-maps'],
  modules: [
    'nuxt-fontawesome',
    '@nuxtjs/axios',
    '@nuxtjs/vuetify',
    'nuxt-webfontloader',
    'nuxt-logrocket',
    '@nuxtjs/sentry',
    '@nuxtjs/sitemap',
    ['@nuxtjs/google-analytics', { id: process.env.CAFEPEDIA_GA_ID }],
    ['@nuxtjs/google-gtag', { id: process.env.CAFEPDIA_NUXT_GTAG_ID }],
    ['@nuxtjs/google-adsense', { id: process.env.CAFEPEDIA_GOOGLE_ADSENSE }]
  ],
  axios: {},
  vuetify: {
    // Vuetify の設定はここに書く
    theme: {
      primary: '#3f51b5',
      secondary: '#b0bec5',
      accent: '#8c9eff',
      error: '#b71c1c',
      dark: false
    },
    icons: {
      iconfont: 'fa'
    }
  },
  webfontloader: {
    google: {
      families: ['Noto+Sans', 'M PLUS Rounded 1c']
    }
  },
  logRocket: {
    logRocketId: process.env.CAFEPEDIA_LOG_ROCKET_ID,
    devModeAllowed: false
  },
  sentry: {
    dsn: 'https://eb1901656a8b4fcab01d35aea67ef851@sentry.io/1831661',
    disabled: process.env.NODE_ENV != 'production',
    config: {
      environments: ['production']
    }
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://cafepedia.jp',
    generate: true,
    exclude: ['/admin'],
    routes() {
      const paths = []
      for (let i = 1; i <= 4868; i++) {
        paths.push('cafes/' + i)
      }
      return paths
    }
  }
}
