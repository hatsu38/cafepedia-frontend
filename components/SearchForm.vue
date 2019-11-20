<template>
  <div>
    <v-row>
      <v-col cols="4" md="4" class="text-center">
        <v-btn outlined color="pink"
          @click="wifiFilter"
          :class="{wifiFilterOn: searchQuery.haveWifi}"
          >
          <v-icon small class="mr-1">fas fa-wifi</v-icon>
          <span>Wi-Fi</span>
        </v-btn>
      </v-col>
      <v-col cols="4" md="4" class="text-center">
        <v-btn outlined color="indigo"
          @click="socketFilter"
          :class="{socketFilterOn: searchQuery.haveSocket}"
          >
          <v-icon small class="mr-1">fas fa-plug</v-icon>
          <span>電源</span>
        </v-btn>
      </v-col>
      <v-col cols="4" md="4" class="text-center">
        <v-btn outlined color="teal"
          @click="smokingFilter"
          :class="{smokingFilterOn: searchQuery.haveSmoking}"
          >
          <v-icon small class="mr-1">fas fa-smoking</v-icon>
          <span class="smoking_filter_text">喫煙席</span>
        </v-btn>
      </v-col>
      <v-col cols="12" md="12" class="text-center">
        <v-btn outlined block color="purple"
          @click="stationToggle"
          :class="{stationToggleOn: stationSearchShow}"
          >
          <v-icon small class="mr-1">fas fa-train</v-icon>
          <span class="smoking_filter_text">駅名検索</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-text-field
      v-model="word"
      maxlength=30,
      :counter="30"
      label="駅名検索"
      v-if="this.stationSearchShow"
    ></v-text-field>
    <v-chip-group
        column
        active-class="primary--text"
      >
      <v-chip
        small
        class="ma-1"
        v-for="station in stations"
        :key="station.id"
        @click="selectStation(station.kanji_name)"
      >
        {{station.kanji_name}}
      </v-chip>
    </v-chip-group>
    <v-col class="text-center pa-0" v-if="moreRead">
      <v-btn text small center color="primary" @click="getMoreStations">もっと見る</v-btn>
    </v-col>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  props: ['searchQuery'],
  data() {
    return {
      word: '',
      stations: [],
      stationSearchShow: false,
      page: 1,
      moreRead: false
    }
  },
  watch: {
    word() {
      this.searchStation()
    }
  },
  methods: {
    socketFilter() {
      this.searchQuery.haveSocket = this.changeFilterFacilityCondition(this.searchQuery.haveSocket)
    },
    wifiFilter() {
      this.searchQuery.haveWifi = this.changeFilterFacilityCondition(this.searchQuery.haveWifi)
    },
    smokingFilter() {
      this.searchQuery.haveSmoking = this.changeFilterFacilityCondition(this.searchQuery.haveSmoking)
    },
    changeFilterFacilityCondition(facilityState) {
      // "" なら true が。true なら "" に値が変わります。
      return (facilityState ? "" : true )
    },
    stationToggle(){
      this.stationSearchShow = !this.stationSearchShow
    },
    selectStation(stationName){
      this.stationSearchShow = false
      this.searchQuery.stationName = stationName
    },
    async searchStation() {
      if(this.word.length <= 1){
        this.stations = []
      } else {
        const res = await axios
                          .get('https://hajiwata.com/api/stations/search?',
                                {
                                  params: {word: this.word, page: this.page}
                                }
                              )
        this.stations = res.data.stations
      }
    },
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
.stationToggleOn{
  background-color: #AB47BC;
  color: #fff !important;
}
</style>
