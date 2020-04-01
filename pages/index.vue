<template>
  <section class="container">
    <search-form />
    <cafe-lists-map />
  </section>
</template>
<script>
import SearchForm from '~/components/SearchForm.vue'
import CafeListsMap from '~/components/CafeListsMap.vue'
export default {
  components: {
    SearchForm,
    CafeListsMap
  }
}
</script>
