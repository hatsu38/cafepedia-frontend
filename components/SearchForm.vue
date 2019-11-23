<template>
  <div>
    <v-row>
      <v-col
        cols="4"
        md="4"
        class="text-center"
      >
        <v-btn
          outlined
          color="pink"
          :class="{ wifiFilterOn: searchQuery.haveWifi }"
          @click="wifiFilter"
        >
          <v-icon
            small
            class="mr-1"
          >
            fas fa-wifi
          </v-icon>
          <span>Wi-Fi</span>
        </v-btn>
      </v-col>
      <v-col
        cols="4"
        md="4"
        class="text-center"
      >
        <v-btn
          outlined
          color="indigo"
          :class="{ socketFilterOn: searchQuery.haveSocket }"
          @click="socketFilter"
        >
          <v-icon
            small
            class="mr-1"
          >
            fas fa-plug
          </v-icon>
          <span>電源</span>
        </v-btn>
      </v-col>
      <v-col
        cols="4"
        md="4"
        class="text-center"
      >
        <v-btn
          outlined
          color="teal"
          :class="{ smokingFilterOn: searchQuery.haveSmoking }"
          @click="smokingFilter"
        >
          <v-icon
            small
            class="mr-1"
          >
            fas fa-smoking
          </v-icon>
          <span
            class="smoking_filter_text"
          >
            喫煙席
          </span>
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        md="12"
        class="text-center"
      >
        <v-btn
          outlined
          block
          color="purple"
          :class="{ stationToggleOn: stationSearchShow }"
          @click="stationToggle"
        >
          <v-icon
            small
            class="mr-1"
          >
            fas fa-train
          </v-icon>
          <span
            class="smoking_filter_text"
          >
            駅名検索
          </span>
        </v-btn>
      </v-col>
    </v-row>
    <v-text-field
      v-if="stationSearchShow"
      v-model="word"
      maxlength="30,"
      :counter="30"
      label="駅名検索"
    />
    <v-chip-group
      column
      active-class="primary--text"
    >
      <v-chip
        v-for="station in stations"
        :key="station.id"
        small
        class="ma-1"
        @click="selectStation(station.kanji_name)"
      >
        {{ station.kanji_name }}
      </v-chip>
    </v-chip-group>
    <v-col
      v-if="moreRead"
      class="text-center pa-0"
    >
      <v-btn
        text
        small
        center
        color="primary"
        @click="getMoreStations"
      >
        もっと見る
      </v-btn>
    </v-col>
  </div>
</template>
<script>
import axios from "axios"
export default {
  props: {
    searchQuery: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      word: "",
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
      this.searchQuery.haveSocket = this.changeFilterFacilityCondition(
        this.searchQuery.haveSocket
      )
    },
    wifiFilter() {
      this.searchQuery.haveWifi = this.changeFilterFacilityCondition(
        this.searchQuery.haveWifi
      )
    },
    smokingFilter() {
      this.searchQuery.haveSmoking = this.changeFilterFacilityCondition(
        this.searchQuery.haveSmoking
      )
    },
    changeFilterFacilityCondition(facilityState) {
      // "" なら true が。true なら "" に値が変わります。
      return facilityState ? "" : true
    },
    stationToggle() {
      this.stationSearchShow = !this.stationSearchShow
    },
    selectStation(stationName) {
      this.stationSearchShow = false
      this.searchQuery.stationName = stationName
    },
    async searchStation() {
      if (this.word.length <= 1) {
        this.stations = []
      } else {
        const res = await axios.get(
          "https://hajiwata.com/api/stations/search?",
          {
            params: { word: this.word, page: this.page }
          }
        )
        this.stations = res.data.stations
      }
    }
  }
}
</script>
<style scoped>
.socketFilterOn {
  background-color: #1a237e;
  color: #fff !important;
}
.wifiFilterOn {
  background-color: #ad1457;
  color: #fff !important;
}
.smokingFilterOn {
  background-color: #00695c;
  color: #fff !important;
}
.stationToggleOn {
  background-color: #ab47bc;
  color: #fff !important;
}
</style>
