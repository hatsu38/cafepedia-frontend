<template>
  <div>
    <v-row>
      <v-col cols="4" md="4" class="text-center py-2">
        <v-btn
          width="100%"
          outlined
          color="pink"
          :class="{ wifiFilterOn: searchQuery.haveWifi }"
          @click="wifiFilter"
        >
          <v-icon small class="mr-1">
            fas fa-wifi
          </v-icon>
          <span>Wi-Fi</span>
        </v-btn>
      </v-col>
      <v-col cols="4" md="4" class="text-center py-2">
        <v-btn
          width="100%"
          outlined
          color="indigo"
          :class="{ socketFilterOn: searchQuery.haveSocket }"
          @click="socketFilter"
        >
          <v-icon small class="mr-1">
            fas fa-plug
          </v-icon>
          <span>電源</span>
        </v-btn>
      </v-col>
      <v-col cols="4" md="4" class="text-center py-2">
        <v-btn
          width="100%"
          outlined
          color="teal"
          :class="{ smokingFilterOn: searchQuery.haveSmoking }"
          @click="smokingFilter"
        >
          <v-icon small class="mr-1">
            fas fa-smoking
          </v-icon>
          <span class="smoking_filter_text">
            喫煙席
          </span>
        </v-btn>
      </v-col>
      <v-col cols="12" md="12" class="text-center py-1 pb-3">
        <v-btn
          outlined
          block
          color="purple"
          :class="{ stationToggleOn: stationSearchShow }"
          @click="stationToggle"
        >
          <v-icon small class="mr-1">
            fas fa-train
          </v-icon>
          <span class="smoking_filter_text">
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
      prepend-icon="fas fa-train"
      class="ma-0"
    />
    <!-- 検索ワードがあるときに表示 -->
    <v-chip-group
      v-if="stations"
      v-model="stationIdx"
      column
      active-class="primary--text"
    >
      <v-chip
        v-for="(station, idx) in stations"
        :key="station.id"
        small
        ripple
        class="ma-1"
        @click="selectStation(station.kanji_name, idx)"
      >
        {{ station.kanji_name }}
      </v-chip>
    </v-chip-group>
    <v-col v-if="moreRead" class="text-center pa-0">
      <v-btn text small center color="primary" @click="getMoreStations">
        もっと見る
      </v-btn>
    </v-col>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      word: this.$store.state.searchQuery.stationName,
      stations: [],
      stationSearchShow: false,
      page: 1,
      moreRead: false,
      stationIdx: 0
    }
  },
  computed: {
    searchQuery() {
      return this.$store.state.searchQuery
    },
    selectStationIdx() {
      return this.$store.state.selectStationIdx
    }
  },
  watch: {
    word() {
      this.searchStation()
    }
  },
  created() {
    this.searchStation()
  },
  methods: {
    socketFilter() {
      this.$store.commit('socketFilter', this.searchQuery.haveSocket)
    },
    wifiFilter() {
      this.$store.commit('wifiFilter', this.searchQuery.haveWifi)
    },
    smokingFilter() {
      this.$store.commit('smokingFilter', this.searchQuery.haveSmoking)
    },
    stationToggle() {
      this.stationSearchShow = !this.stationSearchShow
    },
    selectStation(stationName, selectStationIdx) {
      this.$store.commit('selectStation', stationName)
      this.$store.commit('updateSelectStationIdx', selectStationIdx)
      this.stationSearchShow = false
      this.stationIdx = this.$store.state.selectStationIdx
    },
    async searchStation() {
      if (this.word.length <= 1) {
        this.stations = []
        this.$store.commit('selectStation', '')
      } else {
        const res = await axios.get(
          `${this.$urls.apiUrl}api/stations/search?`,
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
<style>
/* テキストフォームの中のFontAwesome */
.v-input__icon--prepend > .fas {
  font-size: 18px;
}
</style>
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
