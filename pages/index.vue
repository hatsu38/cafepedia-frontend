<template>
  <section class="container">
    <div>
      <search-form :search-query="searchQuery" />
      <infeed-adsense />
      <cafe-lists :search-query="searchQuery" />
      <infeed-adsense />
    </div>
  </section>
</template>

<script>
import SearchForm from "~/components/SearchForm.vue"
import InfeedAdsense from "~/components/InfeedAdsense.vue"
import CafeLists from "~/components/CafeLists.vue"
export default {
  components: {
    SearchForm,
    InfeedAdsense,
    CafeLists
  },
  data() {
    return {
      searchQuery: {
        haveSocket: "",
        haveWifi: "",
        haveSmoking: "",
        stationName: ""
      }
    }
  }
}
</script>
