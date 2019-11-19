<template>
  <v-app dark>
    <!-- Header -->
    <Header />
    <div>
      <nuxt/>
    </div>
    <!-- Footer -->
    <Footer />
  </v-app>
</template>

<style>
a{
  text-decoration: none;
}
</style>
<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
export default {
  components: {
    Header,
    Footer
  }
}
</script>
