<template>
  <div>
    <show-cafe />
    <section class="container">
      <cafe-lists-map />
    </section>
  </div>
</template>

<script>
import ShowCafe from '~/components/ShowCafe.vue'
import CafeListsMap from '~/components/CafeListsMap.vue'
export default {
  components: {
    ShowCafe,
    CafeListsMap
  }
}
</script>
