<template>
  <div class="cafe-lists">
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          fixed
          bottom
          right
          fab
          color="orange lighten-2"
          class="white--text currentPositionGettingNow"
          aria-label="get current position"
          title="get current position"
          @click.stop="dialog=true"
          v-on="on"
        >
          <v-icon>fas fa-map-marker-alt</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="body-1">
          位置情報から近い順にカフェを取得しますか？
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="green darken-1"
            text
            @click="dialog=false"
          >
            いいえ
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="dialog=false; clickUpdateLatLng();"
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
    <v-alert
      dense
      color="cyan"
      border="left"
      elevation="1"
      type="info"
      colored-border
    >
      {{ cafes.length }}/<strong>{{ totalShopsCount }}</strong> 店舗表示しています
    </v-alert>
    <v-card
      v-for="cafe in cafes"
      :key="cafe.id"
      class="mb-4 card-side-width"
      outlined
      elevation="3"
      :class="cafe.main_shop_eng_name"
    >
      <v-list-item class="mt-3">
        <img
          :src="`https://api.cafepedia.jp/${cafe.image}`"
          :alt="cafe.main_shop_eng_name"
          width="48"
          tile
          class="mr-1"
        >
        <v-list-item-content>
          <h3
            class="subtitle-2 font-weight-black"
            style="white-space: normal;"
          >
            <nuxt-link
              :to="{
                name: 'cafes-id',
                params: { id: cafe.id },
                query: {
                  lat: lat,
                  lng: lng,
                  socket: searchQuery.haveSocket,
                  wifi: searchQuery.havewifi,
                  smoking: searchQuery.havesmoking,
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
        <v-row
          class="d-flex justify-start"
          flat
          tile
        >
          <v-col
            cols="auto"
            justify="center"
          >
            <v-chip
              small
              class="group"
              :class="cafe.wifi ? 'have-wifi' : 'have-not-facility'"
            >
              <v-icon
                small
                color="white"
              >
                fas fa-wifi
              </v-icon>
            </v-chip>
            <v-chip
              small
              class="group px-4"
              :class="cafe.socket ? 'have-socket' : 'have-not-facility'"
            >
              <v-icon
                small
                color="white"
              >
                fas fa-plug
              </v-icon>
            </v-chip>
            <v-chip
              small
              class="group teal lighten-1"
              :class="cafe.smoking ? 'have-smoking' : 'have-not-facility'"
            >
              <v-icon
                small
                color="white"
              >
                fas fa-smoking
              </v-icon>
            </v-chip>
          </v-col>
        </v-row>
        <v-col
          cols="auto"
        >
          <v-icon
            small
            class="mb-1"
            :class="`${cafe.main_shop_eng_name}-title`"
          >
            fas fa-location-arrow
          </v-icon>
          <span
            :class="`${cafe.main_shop_eng_name}-title`"
            class="title"
          >
            {{ cafe.distance }}
          </span>
        </v-col>
      </v-card-actions>
      <v-list-item>
        <v-simple-table
          class="my-1"
          style="width: 100%;"
        >
          <tbody class="caption">
            <tr>
              <td class="pa-0 caption text-center">
                <v-icon
                  small
                  class="pa-1"
                >
                  fas fa-map
                </v-icon>
              </td>
              <td class="pa-1 caption">{{ cafe.access }}</td>
            </tr>
            <tr>
              <td class="pa-0 caption text-center">
                <v-icon
                  small
                  class="pa-1"
                >
                  fas fa-clock
                </v-icon>
              </td>
              <td class="pa-1 caption white-space-pre-inline">{{ cafe.business_hour }}</td>
            </tr>
            <tr v-if="cafe.congrestion_info">
              <td
                class="pa-0 caption text-center"
                width="35"
              >
                混雑状況
              </td>
              <td
                class="pa-1 caption white-space-pre-inline"
              >
                <div
                  v-if="cafe.congrestion_info==1"
                >
                  <img
                    v-for="index in cafe.congrestion_info*2"
                    :key="index"
                    src="~/assets/vacant.png"
                    width="35"
                  >
                </div>
                <div
                  v-if="cafe.congrestion_info==2"
                >
                  <img
                    v-for="index in cafe.congrestion_info*2"
                    :key="index"
                    src="~/assets/little_crowded.png"
                    width="35"
                  >
                </div>
                <div
                  v-if="cafe.congrestion_info==3"
                >
                  <img
                    v-for="index in cafe.congrestion_info*2"
                    :key="index"
                    src="~/assets/crowded.png"
                    width="35"
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-list-item>
    </v-card>
    <infinite-loading
      spinner="waveDots"
      :distance="50"
      @infinite="infiniteScroll"
    >
      <div slot="no-more" />
      <div slot="no-results" />
    </infinite-loading>
  </div>
</template>
<style scoped>
.currentPositionGettingNow {
  background-color: #ff9100;
}
.white-space-pre-inline {
  white-space: pre-line;
}
.card-side-width {
  border-left-width: 3px !important;
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
      cafes: [],
      page: 1,
      lat: undefined,
      lng: undefined,
      dialog: false,
      totalShopsCount: undefined,
      nowSearching: false,
      geolocation_optoins: {
        enableHighAccuracy: true,
        maximumAge: 2000
      }
    }
  },
  watch: {
    searchQuery: {
      handler() {
        this.searchFetch()
      },
      deep: true
    },
    lat() {
      this.setStorage()
    },
    lng() {
      this.setStorage()
    }
  },
  // 位置情報の取得を行う
  async beforeMount() {
    // URLから位置情報を取得
    if (this.$nuxt.$route.query.lat && this.$nuxt.$route.query.lng) {
      this.updatePosition(
        this.$nuxt.$route.query.lat,
        this.$nuxt.$route.query.lng
      )
    }
    // URLがからのクエリから位置情報が取得できない
    // && localStorageから取得できるとき
    else if (localStorage.getItem("position")) {
      try {
        this.getStorage()
      } catch (error) {
        localStorage.removeItem("position")
        const position = await this.getPosition()
        this.updatePosition(
          position.coords.latitude,
          position.coords.longitude
        )
      }
    }
    // URLからもlocalStorageでも取得できないとき
    else {
      this.updatePosition(35.659328, 139.700553)
    }
  },
  methods: {
    getPosition() {
      return new Promise((resolve, reject) => {
        // 位置情報がOnになっている時
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            resolve,
            reject,
            this.geolocation_optoins
          )
        }
        // 位置情報がOffになっているとき
        else {
          alert("あなたの端末では、現在位置を取得できません。")
        }
      })
    },
    async clickUpdateLatLng() {
      try {
        const position = await this.getPosition()
        this.updatePosition(
          position.coords.latitude,
          position.coords.longitude
        )
        this.searchFetch()
      } catch (error) {
        alert("位置情報の取得に失敗しました" + error.message)
        this.updatePosition(35.659328, 139.700553)
        this.searchFetch()
      }
    },
    updatePosition(lat, lng) {
      this.lat = lat
      this.lng = lng
    },
    async infiniteScroll($state) {
      const res = await axios.get("https://api.cafepedia.jp/api/search?", {
        params: {
          lat: this.lat,
          lng: this.lng,
          socket: this.searchQuery.haveSocket,
          wifi: this.searchQuery.haveWifi,
          smoking: this.searchQuery.haveSmoking,
          station_name: this.searchQuery.stationName,
          page: this.page
        }
      })
      this.totalShopsCount = res.data.shop_num
      if (res.data.shops.length > 0) {
        this.cafes.push(...res.data.shops)
        this.page++
        $state.loaded()
      } else {
        $state.complete()
      }
    },
    async searchFetch() {
      this.nowSearching = true
      const res = await axios.get("https://api.cafepedia.jp/api/search?", {
        params: {
          lat: this.lat,
          lng: this.lng,
          socket: this.searchQuery.haveSocket,
          wifi: this.searchQuery.haveWifi,
          smoking: this.searchQuery.haveSmoking,
          station_name: this.searchQuery.stationName
        }
      })
      this.totalShopsCount = res.data.shop_num
      this.cafes = res.data.shops
      this.nowSearching = false
      this.page = 2
    },
    setStorage() {
      localStorage.removeItem("position")
      const position = { current_lat: this.lat, current_lng: this.lng }
      localStorage.setItem("position", JSON.stringify(position))
    },
    getStorage() {
      const position = JSON.parse(localStorage.getItem("position"))
      this.updatePosition(position["current_lat"], position["current_lng"])
    }
  }
}
</script>
