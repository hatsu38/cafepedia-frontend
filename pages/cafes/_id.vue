<template>
  <div>
    <show-cafe />
    <cafe-lists :searchQuery="searchQuery" />
  </div>
</template>

<script>
import ShowCafe from '~/components/ShowCafe.vue'
import CafeLists from '~/components/CafeLists.vue'
export default {
  components: {
    ShowCafe,
    CafeLists
  },
  data() {
    return {
      searchQuery: {
        haveSocket: this.$nuxt.$route.query.socket,
        haveWifi: this.$nuxt.$route.query.wifi,
        haveSmoking: this.$nuxt.$route.query.smoking
      }
    }
  },
}
</script>
