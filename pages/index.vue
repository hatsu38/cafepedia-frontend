<template>
  <section class="container">
    <div>
      <search-form />
      <cafe-lists />
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
  }
}
</script>
