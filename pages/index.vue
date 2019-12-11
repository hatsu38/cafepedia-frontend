<template>
  <section class="container">
    <div>
      <search-form :search-query="searchQuery" />
      <cafe-lists :search-query="searchQuery" />
      <top-display-responsive-square-adsense />
    </div>
  </section>
</template>
<script>
import SearchForm from "~/components/SearchForm.vue"
import TopDisplayResponsiveSquareAdsense from "~/components/TopDisplayResponsiveSquareAdsense.vue"
import CafeLists from "~/components/CafeLists.vue"
export default {
  components: {
    SearchForm,
    TopDisplayResponsiveSquareAdsense,
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
