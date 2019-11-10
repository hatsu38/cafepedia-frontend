<template>
  <section class="container">
    <div>
      <search-form :searchQuery="searchQuery" />
      <cafe-lists :searchQuery="searchQuery" />
    </div>
  </section>
</template>

<script>
import SearchForm from '~/components/SearchForm.vue'
import CafeLists from '~/components/CafeLists.vue'
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
        haveSmoking: ""
      }
    }
  },
}
</script>
