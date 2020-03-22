<template>
  <div>
    <show-cafe />
    <section class="container">
      <cafe-lists />
    </section>
  </div>
</template>

<script>
import ShowCafe from '~/components/ShowCafe.vue'
import CafeLists from '~/components/CafeLists.vue'
export default {
  components: {
    ShowCafe,
    CafeLists
  }
}
</script>
