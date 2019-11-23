<template>
  <v-app dark>
    <!-- Header -->
    <Header />
    <div>
      <nuxt />
    </div>
    <!-- Footer -->
    <Footer />
  </v-app>
</template>

<style>
a {
  text-decoration: none;
}
.white-space-pre-inline {
  white-space: pre-line;
}
.have-not-facility {
  background-color: #e0e0e0 !important;
  color: #bdbdbd !important;
}
.have-smoking {
  background-color: #26a69a !important;
  color: #ffffff !important;
}
.have-wifi {
  background-color: #ec407a !important;
  color: #ffffff !important;
}
.have-socket {
  background-color: #5c6bc0 !important;
  color: #ffffff !important;
}
</style>
<script>
import Header from "~/components/Header.vue"
import Footer from "~/components/Footer.vue"
export default {
  components: {
    Header,
    Footer
  }
}
</script>
