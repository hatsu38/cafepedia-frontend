<template>
  <section class="container">
    <search-form />
    <cafe-lists />
  </section>
</template>
<script>
import SearchForm from '~/components/SearchForm.vue'
import CafeLists from '~/components/CafeLists.vue'
export default {
  components: {
    SearchForm,
    CafeLists
  }
}
</script>
