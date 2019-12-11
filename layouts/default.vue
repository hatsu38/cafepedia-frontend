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
body div, body button{
  font-family: 'Noto Sans', sans-serif;
}
.container{
  max-width: 700px;
}
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
  background-color: #ad1457 !important;
  color: #ffffff !important;
}
.have-socket {
  background-color: #5c6bc0 !important;
  color: #ffffff !important;
}
.starbacks-title {
  color: #0a7042 !important;
}
.pronto-title {
  color: #04483a !important;
}
.tullys-title {
  color: #b65900 !important;
}
.doutor-title {
  color: #f9cc21 !important;
}
.kissa_renoir-title {
  color: #000000 !important;
}
.komeda-title {
  color: #0d2881 !important;
}
.ueshima-title {
  color: #723e32 !important;
}
.newyorkers-title {
  color: #070b3b !important;
}
.cafemiyama-title {
  color: #f8931d !important;
}
.myspace-title {
  color: #7d5b2e !important;
}
</style>
<script>
import Header from "~/components/Header.vue"
import Footer from "~/components/Footer.vue"
import '@fortawesome/fontawesome-free/css/all.css'
export default {
  components: {
    Header,
    Footer
  }
}
</script>
