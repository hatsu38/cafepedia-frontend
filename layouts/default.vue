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
.white-space-pre-inline{
  white-space: pre-line;
}
.have-not-facility{
  background-color: #E0E0E0 !important;
  color: #BDBDBD !important;
}
.have-smoking{
  background-color: #26A69A !important;
  color: #ffffff !important;
}
.have-wifi{
  background-color: #EC407A !important;
  color: #ffffff !important;
}
.have-socket{
  background-color: #5C6BC0 !important;
  color: #ffffff !important;
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
