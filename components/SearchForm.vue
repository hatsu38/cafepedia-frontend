<template>
  <div>
    <v-row>
      <v-col cols="4" md="4" class="text-center">
        <v-btn outlined color="pink"
          @click="wifiFilter"
          :class="{wifiFilterOn: searchQuery.haveWifi}"
          >
          <v-icon small>fas fa-wifi</v-icon>
          <span>Wi-Fi</span>
        </v-btn>
      </v-col>
      <v-col cols="4" md="4" class="text-center">
        <v-btn outlined color="indigo"
          @click="socketFilter"
          :class="{socketFilterOn: searchQuery.haveSocket}"
          >
          <v-icon small>fas fa-plug</v-icon>
          <span>コンセント</span>
        </v-btn>
      </v-col>
      <v-col cols="4" md="4" class="text-center">
        <v-btn outlined color="teal"
          @click="smokingFilter"
          :class="{smokingFilterOn: searchQuery.haveSmoking}"
          >
          <v-icon small>fas fa-smoking</v-icon>
          <span class="smoking_filter_text">喫煙席</span>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: ['searchQuery'],
  methods: {
    socketFilter() {
      this.searchQuery.haveSocket = this.changeFilterFacilityCondition(this.searchQuery.haveSocket)
    },
    wifiFilter() {
      this.searchQuery.haveWifi = this.changeFilterFacilityCondition(this.searchQuery.haveWifi)
    },
    smokingFilter() {
      this.searchQuery.haveSmoking= this.changeFilterFacilityCondition(this.searchQuery.haveSmoking)
    },
    changeFilterFacilityCondition(facilityState) {
      // "" なら true が。true なら "" に値が変わります。
      return (facilityState ? "" : true )
    }
  }
}
</script>
<style scoped>
.socketFilterOn{
  background-color: #1A237E;
  color: #fff !important;
}
.wifiFilterOn{
  background-color: #AD1457;
  color: #fff !important;
}
.smokingFilterOn{
  background-color: #00695C;
  color: #fff !important;
}
</style>
