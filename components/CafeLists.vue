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
    <!-- IndexVueのときのみ表示 -->
    <v-alert
      v-if="$route.name == 'index'"
      dense
      color="cyan"
      border="left"
      elevation="1"
      colored-border
    >
      <span style="font-size: 13.5px;">
        <strong>{{ totalShopsCount }}</strong> 店舗あります
      </span>
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
          <h3 class="subtitle-2 font-weight-black" style="white-space: normal;">
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
          <v-col cols="auto" justify="center">
            <v-chip
              small
              class="group"
              :class="cafe.wifi ? 'have-wifi' : 'have-not-facility'"
            >
              <v-icon small color="white">
                fas fa-wifi
              </v-icon>
            </v-chip>
            <v-chip
              small
              class="group px-4"
              :class="cafe.socket ? 'have-socket' : 'have-not-facility'"
            >
              <v-icon small color="white">
                fas fa-plug
              </v-icon>
            </v-chip>
            <v-chip
              small
              class="group"
              :class="cafe.smoking ? 'have-smoking' : 'have-not-facility'"
            >
              <v-icon small color="white">
                fas fa-smoking
              </v-icon>
            </v-chip>
          </v-col>
        </v-row>
        <v-col cols="auto" class="pa-0">
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
      <v-list-item>
        <v-simple-table class="my-1" style="width: 100%;">
          <tbody class="caption">
            <tr>
              <td class="pa-0 caption text-center">
                <v-icon small class="pa-1">
                  fas fa-map
                </v-icon>
              </td>
              <td class="pa-1 caption">
                <span>{{ cafe.access }}</span>
              </td>
            </tr>
            <tr>
              <td class="pa-0 caption text-center">
                <v-icon small class="pa-1">
                  fas fa-clock
                </v-icon>
              </td>
              <td class="pa-1 caption white-space-pre-inline">
                <span>{{ cafe.business_hour }}</span>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-list-item>
    </v-card>
    <infinite-loading
      spinner="waveDots"
      :distance="200"
      @infinite="infiniteScroll"
    >
      <div slot="no-more" />
      <div slot="no-results" />
    </infinite-loading>
  </div>
</template>
<style>
.currentPositionGettingNow > .v-btn__content {
  display: block !important;
}
</style>
<style scoped>
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
import Cafes from '~/data/cafes'
import axios from 'axios'
export default {
  data() {
    return {
      cafes: [],
      page: 1,
      dialog: false,
      totalShopsCount: undefined,
      nowSearching: false,
      geolocation_optoins: {
        enableHighAccuracy: true,
        maximumAge: 2000
      },
      notSortedYet: true
    }
  },
  computed: {
    searchQuery() {
      return this.$store.state.searchQuery
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
  // 位置情報の取得を行う
  async beforeMount() {
    // URLから位置情報を取得
    if (this.$nuxt.$route.query.lat && this.$nuxt.$route.query.lng) {
      this.updatePosition(
        this.$nuxt.$route.query.lat,
        this.$nuxt.$route.query.lng
      )
      this.notSortedYet = false
    }
    // URLが空のクエリで位置情報が取得できない
    // && localStorageから取得できるとき
    else if (localStorage.getItem('position')) {
      try {
        this.getStorage()
      } catch (error) {
        localStorage.removeItem('position')
        const position = await this.getPosition()
        this.updatePosition(position.coords.latitude, position.coords.longitude)
      }
      this.notSortedYet = false
    }
    // URLからもlocalStorageでも取得できないとき
    else {
      this.cafes = Cafes.shops
      this.totalShopsCount = Cafes.shop_num
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
        this.cafes = Cafes.shops
        this.searchFetch()
      }
    },
    async infiniteScroll($state) {
      const res = await axios.get(`${this.$urls.apiUrl}api/search_shops?`, {
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
      const res = await axios.get(`${this.$urls.apiUrl}api/search_shops?`, {
        params: {
          lat: this.searchQuery.lat,
          lng: this.searchQuery.lng,
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
    updatePosition(lat, lng) {
      this.$store.commit('updatePosition', { lat: lat, lng: lng })
      this.setStorage()
      this.notSortedYet = false
    },
    setStorage() {
      localStorage.removeItem('position')
      const position = {
        current_lat: this.searchQuery.lat,
        current_lng: this.searchQuery.lng
      }
      localStorage.setItem('position', JSON.stringify(position))
    },
    getStorage() {
      const position = JSON.parse(localStorage.getItem('position'))
      this.updatePosition(position['current_lat'], position['current_lng'])
    }
  }
}
</script>
