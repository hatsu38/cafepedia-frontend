<template>
  <!-- FixedのFooterでコンテンツが隠れないように -->
  <!-- Footerの高さ(83px)+15pxだけMarinを追加 -->
  <div class="cafe-lists" style="margin-bottom: 98px;">
    <v-dialog v-model="dialog" max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn
          fixed
          bottom
          right
          fab
          width="52px"
          height="52px"
          color="orange darken-2"
          class="white--text currentPositionGettingNow"
          aria-label="get current position"
          title="get current position"
          @click.stop="dialog = true"
          v-on="on"
        >
          <v-icon>fas fa-map-marker-alt</v-icon>
          <div class="font-weight-bold caption">
            探す
          </div>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="body-1">
          現在地に近いカフェを探しますか
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn color="green darken-1" text @click="dialog = false">
            いいえ
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="
              dialog = false
              clickUpdateLatLng()
            "
          >
            はい
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-progress-linear
      v-if="nowSearching"
      indeterminate
      color="blue darken-1"
      class="mb-1"
    />
    <!-- まだ位置情報がないとき -->
    <v-alert
      v-if="notSortedYet"
      dense
      color="orange darken-2"
      border="left"
      elevation="1"
      colored-border
    >
      <span style="font-size: 13.5px;">
        <strong>「探す」ボタン</strong>で近くのカフェを探せます
      </span>
    </v-alert>
    <GmapMap
      :center="mapCenterPosition"
      :zoom="mapZoomVal"
      :options="{
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false
      }"
      map-type-id="terrain"
      style="width: 100%; height: 450px; max-width:700px;"
      class="mb-2 mx-auto"
    >
      <GmapInfoWindow
        :position="infoWindow.pos"
        :opened="infoWindow.opened"
        @closeclick="infoWindow.opened = false"
      >
        <h4>
          <nuxt-link
            :to="{
              name: 'cafes-id',
              params: { id: infoWindow.cafe.id },
              query: {
                lat: searchQuery.lat,
                lng: searchQuery.lng,
                socket: searchQuery.haveSocket,
                wifi: searchQuery.haveWifi,
                smoking: searchQuery.haveSmoking,
                station_name: searchQuery.stationName
              }
            }"
          >
            {{ infoWindow.cafe.name }}
          </nuxt-link>
        </h4>
        <span>
          {{ infoWindow.cafe.prefecture }}{{ infoWindow.cafe.city
          }}{{ infoWindow.cafe.other_address }}
        </span>
      </GmapInfoWindow>
      <GmapMarker
        v-for="(cafe, idx) in cafes"
        :key="cafe.name + idx"
        :position="{ lat: Number(cafe.lat), lng: Number(cafe.lng) }"
        :title="cafe.name"
        :clickable="true"
        :draggable="true"
        @click="toggleInfoWindow(cafe)"
      />
    </GmapMap>
    <ul class="cafeCards">
      <li
        v-for="cafe in cafes"
        :key="cafe.id"
        :class="cafe.main_shop_eng_name"
        class="card-side-width"
        @click="toggleAndCenterUpdate(cafe)"
      >
        <v-card outlined elevation="3">
          <v-list-item class="mt-3">
            <v-img
              :src="
                `https://cafepedia-images.s3-ap-northeast-1.amazonaws.com${cafe.image}`
              "
              lazy-src="https://picsum.photos/10/6"
              :alt="cafe.main_shop_eng_name"
              max-width="42"
              class="mr-1"
            />
            <v-list-item-content>
              <h3 class="subtitle-2 font-weight-black three-point-reader">
                <nuxt-link
                  :to="{
                    name: 'cafes-id',
                    params: { id: cafe.id },
                    query: {
                      lat: searchQuery.lat,
                      lng: searchQuery.lng,
                      socket: searchQuery.haveSocket,
                      wifi: searchQuery.haveWifi,
                      smoking: searchQuery.haveSmoking,
                      station_name: searchQuery.stationName
                    }
                  }"
                >
                  {{ cafe.name }}
                </nuxt-link>
              </h3>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions class="px-5 py-0">
            <v-row class="d-flex justify-start" flat tile>
              <v-col cols="auto" justify="center" class="d-flex">
                <v-chip
                  small
                  class="group mx-1-helf"
                  :class="cafe.wifi ? 'have-wifi' : 'have-not-facility'"
                >
                  <v-icon small color="white">
                    fas fa-wifi
                  </v-icon>
                </v-chip>
                <v-chip
                  small
                  class="group px-4 mx-1-helf"
                  :class="cafe.socket ? 'have-socket' : 'have-not-facility'"
                >
                  <v-icon small color="white">
                    fas fa-plug
                  </v-icon>
                </v-chip>
                <v-chip
                  small
                  class="group  mx-1-helf"
                  :class="cafe.smoking ? 'have-smoking' : 'have-not-facility'"
                >
                  <v-icon small color="white">
                    fas fa-smoking
                  </v-icon>
                </v-chip>
              </v-col>
            </v-row>
            <v-col cols="auto">
              <v-icon
                small
                class="mb-1"
                :class="`${cafe.main_shop_eng_name}-title`"
              >
                fas fa-location-arrow
              </v-icon>
              <span :class="`${cafe.main_shop_eng_name}-title`" class="title">
                {{ cafe.distance }}
              </span>
            </v-col>
          </v-card-actions>
        </v-card>
      </li>
      <li style="width: 140px">
        <v-card outlined elevation="3">
          <v-list-item @click="searchMoreFetch()">
            もっとみる
            <v-icon small style="margin-left: 5px;">
              fas fa-chevron-right
            </v-icon>
          </v-list-item>
        </v-card>
      </li>
    </ul>
  </div>
</template>
<style>
.currentPositionGettingNow > .v-btn__content {
  display: block !important;
}
</style>
<style scoped>
.mx-1-helf {
  margin: 0 1.5px;
}
.three-point-reader {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.white-space-pre-inline {
  white-space: pre-line;
}
.cafeCards {
  overflow-x: auto;
  white-space: nowrap;
  position: sticky;
  bottom: 90px;
}
.cafeCards > li {
  display: inline-block;
  margin-right: 5px;
  width: 310px;
}
.card-side-width {
  border-left-width: 3px !important;
  border-left-style: solid;
}
.starbacks {
  border-left-color: #0a7042 !important;
}
.pronto {
  border-left-color: #04483a !important;
}
.tullys {
  border-left-color: #b65900 !important;
}
.doutor {
  border-left-color: #f9cc21 !important;
}
.kissa_renoir {
  border-left-color: #000000 !important;
}
.komeda {
  border-left-color: #0d2881 !important;
}
.ueshima {
  border-left-color: #723e32 !important;
}
.newyorkers {
  border-left-color: #070b3b !important;
}
.cafemiyama {
  border-left-color: #f8931d !important;
}
.myspace {
  border-left-color: #7d5b2e !important;
}
</style>
<script>
import Cafes from '~/data/cafes'
import axios from 'axios'
export default {
  data() {
    return {
      page: 1,
      dialog: false,
      nowSearching: false,
      geolocation_optoins: {
        enableHighAccuracy: true,
        maximumAge: 2000
      },
      notSortedYet: true,
      infoWindow: {
        pos: null,
        opened: true,
        cafe: []
      },
      mapZoomVal: 15
    }
  },
  computed: {
    searchQuery() {
      return this.$store.state.searchQuery
    },
    cafes() {
      return this.$store.state.cafes
    },
    mapCenterPosition() {
      return this.$store.state.mapCenterPosition
    }
  },
  watch: {
    searchQuery: {
      handler() {
        this.searchFetch()
      },
      deep: true
    }
  },
  created() {
    // TopページならMapのZoom率を15に。Topページ以外では19にする。
    this.mapZoomVal = this.$route.path === '/' ? 15 : 19
  },
  // 位置情報の取得を行う
  async beforeMount() {
    // URLから位置情報を取得
    if (this.$nuxt.$route.query.lat && this.$nuxt.$route.query.lng) {
      this.updatePosition(
        this.$nuxt.$route.query.lat,
        this.$nuxt.$route.query.lng
      )
      this.notSortedYet = false
    } else {
      this.$store.commit('getCafeList', Cafes.shops)
      var cafe = Cafes.shops[0]
      this.toggleAndCenterUpdate(cafe)
    }
  },
  methods: {
    getPosition() {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          // 位置情報がOnになっている時
          navigator.geolocation.getCurrentPosition(
            resolve,
            reject,
            this.geolocation_optoins
          )
        } else {
          // 位置情報がOffになっているとき
          alert('この端末では、現在位置を取得できません。')
        }
      })
    },
    async clickUpdateLatLng() {
      try {
        const position = await this.getPosition()
        this.updatePosition(position.coords.latitude, position.coords.longitude)
        this.searchFetch()
      } catch (error) {
        alert('位置情報の取得に失敗しました' + error.message)
        this.$store.commit('getCafeList', Cafes.shops)
        this.searchFetch()
      }
    },
    async searchFetch() {
      this.nowSearching = true
      const res = await axios.get(`${this.$urls.apiUrl}api/search?`, {
        params: {
          lat: this.searchQuery.lat,
          lng: this.searchQuery.lng,
          socket: this.searchQuery.haveSocket,
          wifi: this.searchQuery.haveWifi,
          smoking: this.searchQuery.haveSmoking,
          station_name: this.searchQuery.stationName
        }
      })
      this.$store.commit('getCafeList', res.data.shops)
      this.nowSearching = false
      this.page = 2
      this.$store.commit('getMapCenterPosition', this.cafes[0])
    },
    async searchMoreFetch() {
      this.nowSearching = true
      const res = await axios.get(`${this.$urls.apiUrl}api/search?`, {
        params: {
          lat: this.searchQuery.lat,
          lng: this.searchQuery.lng,
          socket: this.searchQuery.haveSocket,
          wifi: this.searchQuery.haveWifi,
          smoking: this.searchQuery.haveSmoking,
          station_name: this.searchQuery.stationName,
          page: this.page
        }
      })
      this.$store.commit('pushCafeList', res.data.shops)
      this.nowSearching = false
      this.page++
    },
    updatePosition(lat, lng) {
      this.$store.commit('updatePosition', { lat: lat, lng: lng })
      this.notSortedYet = false
    },
    toggleAndCenterUpdate(cafe) {
      this.$store.commit('getMapCenterPosition', cafe)
      this.infoWindow.pos = { lat: Number(cafe.lat), lng: Number(cafe.lng) }
      this.infoWindow.opened = true
      this.infoWindow.cafe = cafe
    },
    toggleInfoWindow(cafe) {
      this.infoWindow.pos = { lat: Number(cafe.lat), lng: Number(cafe.lng) }
      this.infoWindow.opened = !this.infoWindow.opened
      this.infoWindow.cafe = cafe
    }
  }
}
</script>
