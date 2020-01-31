<template>
  <section class="container">
    <div>
      <search-form :search-query="searchQuery" />
      <cafe-lists :search-query="searchQuery" />
    </div>
  </section>
</template>
<script>
import SearchForm from "~/components/SearchForm.vue"
import CafeLists from "~/components/CafeLists.vue"
export default {
  components: {
    SearchForm,
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
