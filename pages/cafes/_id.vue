<template>
  <div>
    <show-cafe />
    <section class="container">
      <comment-form />
    </section>
    <InfeedAdsense />
    <section class="container">
      <cafe-lists :searchQuery="searchQuery" />
    </section>
  </div>
</template>

<script>
import ShowCafe from '~/components/ShowCafe.vue'
import CommentForm from '~/components/CommentForm.vue'
import InfeedAdsense from '~/components/InfeedAdsense.vue'
import CafeLists from '~/components/CafeLists.vue'
export default {
  components: {
    ShowCafe,
    CommentForm,
    InfeedAdsense,
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
