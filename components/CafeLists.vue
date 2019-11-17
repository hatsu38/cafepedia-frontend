<template>
  <div class="cafe-lists">
    <v-btn
      block
      outlined
      color="orange"
      class="mb-3"
      @click="clickUpdateLatLng"
      :class="{currentPositionGettingNow: currentPositionGettingNow}"
    >
      <v-icon small class="mr-1">fas fa-map-marker-alt</v-icon>現在地を取得
    </v-btn>
    <v-card v-for="cafe in cafes" :key="cafe.id"
      class="mb-4 card-side-width"
      outlined
      :class="cafe.main_shop_eng_name"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="subtitle-1 mb-1" >
            <nuxt-link
              :to="{name:'cafes-id',
                    params:{id:cafe.id},
                    query: {lat: lat,
                            lng: lng,
                            socket: searchQuery.haveSocket,
                            wifi: searchQuery.havewifi,
                            smoking: searchQuery.havesmoking
                            }
                    }"
            >{{ cafe.name }}</nuxt-link>
          </v-list-item-title>
          <v-simple-table dense>
            <tbody class="caption">
              <tr>
                <th class="pa-1 caption">
                  <v-icon small class="pa-1">fas fa-map</v-icon>
                </th>
                <td class="pa-1 caption">
                  {{cafe.prefecture}} {{cafe.city}} {{ cafe.other_address}}
                </td>
              </tr>
              <tr>
                <th class="pa-1 caption">
                  <v-icon small style="padding: 4px 2px !important;">fas fa-clock</v-icon>
                </th>
                <td class="pa-1 caption white-space-pre-inline">{{cafe.business_hour}}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-list-item-content>
        <img :src="`https://hajiwata.com/${cafe.image}`" width="100" height="100" tile class="pt-3">
      </v-list-item>
      <v-card-actions class="pt-0">
        <v-row class="d-flex justify-start" flat tile>
          <v-col cols="auto" justify="center">
            <span class="group pa-1 pink lighten-1" small v-if="cafe.wifi">
              <v-icon small color="white">fas fa-wifi</v-icon>
            </span>
            <span class="group indigo lighten-1 px-2 py-1" small v-if="cafe.socket">
              <v-icon small color="white">fas fa-plug</v-icon>
            </span>
            <span class="group pa-1 teal lighten-1" small v-if="cafe.smoking">
              <v-icon small color="white">fas fa-smoking</v-icon>
            </span>
          </v-col>
        </v-row>
        <v-col cols="auto">
          <v-icon small class="mb-1">fas fa-location-arrow</v-icon>
          <span class="title">{{cafe.distance}}</span>
        </v-col>
      </v-card-actions>
    </v-card>
    <infinite-loading spinner="waveDots" @infinite="infiniteScroll" :distance="50">
      <!-- slotでメッセージをカスタマイズできる -->
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </infinite-loading>
  </div>
</template>
<style scoped>
.currentPositionGettingNow{
  background-color: #FF9100;
  color: #ffffff !important;
}
.white-space-pre-inline{
  white-space: pre-line;
}
.card-side-width{
  border-left-width: 3px !important;
}
.starbacks {
  border-left-color: #0A7042 !important;
}
.pronto{
  border-left-color: #04483A !important;
}
.tullys {
  border-left-color: #B65900 !important;
}
.doutor {
  border-left-color: #F9CC21 !important;
}
.kissa_renoir{
  border-left-color: #000000 !important;
}
.komeda{
  border-left-color: #0D2881 !important;
}
.ueshima{
  border-left-color: #723E32 !important;
}
.newyorkers{
  border-left-color: #070b3b !important;
}
.cafemiyama{
  border-left-color: #F8931D !important;
}
.myspace{
  border-left-color: #7D5B2E !important;
}
</style>
<script>
import axios from 'axios'
export default {
  props: ['searchQuery'],
  data() {
    return {
      cafes: [],
      page: 1,
      lat: undefined,
      lng: undefined,
      currentPositionGettingNow: false,
      geolocation_optoins: {
        "enableHighAccuracy": true,
        "maximumAge": 2000,
      }
    }
  },
  // 位置情報の取得を行う
  async beforeMount() {
    // URLから位置情報を取得
    if (this.$nuxt.$route.query.lat && this.$nuxt.$route.query.lng){
      this.updatePosition(
        this.$nuxt.$route.query.lat, this.$nuxt.$route.query.lng
      )
    }
    // URLがからのクエリから位置情報が取得できない
    // && localStorageから取得できるとき
    else if(localStorage.getItem("position")) {
      try{
        this.getStorage()
      }
      catch(error){
        localStorage.removeItem('position')
        const position = await this.getPosition()
        this.updatePosition(position.coords.latitude, position.coords.longitude)
      }
    }
    // URLからもlocalStorageでも取得できないとき
    else {
      try{
        const position = await this.getPosition()
        this.updatePosition(position.coords.latitude, position.coords.longitude)
      }
      catch(error){
        alert("位置情報の取得に失敗しました"+error.message)
        this.updatePosition(35.659328, 139.700553)
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
  methods: {
    getPosition() {
      return new Promise((resolve, reject) => {
        // 位置情報がOnになっている時
        if( navigator.geolocation ){
          navigator.geolocation.getCurrentPosition(resolve, reject, this.geolocation_optoins);
        }
        // 位置情報がOffになっているとき
        else{
          alert( "あなたの端末では、現在位置を取得できません。" ) ;
        }
      })
    },
    async clickUpdateLatLng() {
      // 現在地取得(取得中はcurrentPositionGettingNow クラスをつける)
      this.currentPositionGettingNow = true
      try {
        const position = await this.getPosition()
        this.updatePosition(position.coords.latitude, position.coords.longitude)
        this.searchFetch()
      }
      catch(error){
        alert("位置情報の取得に失敗しました"+error.message)
        this.updatePosition(35.659328, 139.700553)
        this.searchFetch()
      }
      // 現在地取得(取得中後はcurrentPositionGettingNow クラスを外す)
      this.currentPositionGettingNow = false
    },
    updatePosition(lat, lng) {
      this.lat = lat
      this.lng = lng
    },
    async infiniteScroll($state){
      const res = await axios.
                        get('https://hajiwata.com/api/search?',
                            { params:
                              {
                                lat: this.lat,
                                lng: this.lng,
                                socket: this.searchQuery.haveSocket,
                                wifi: this.searchQuery.haveWifi,
                                smoking: this.searchQuery.haveSmoking,
                                page: this.page
                              }
                            }
                          )
      if(res.data.shops.length > 0) {
        this.cafes.push(...res.data.shops)
        this.page++
        $state.loaded()
      } else {
        $state.complete()
      }
    },
    async searchFetch() {
      const res = await axios.
                        get('https://hajiwata.com/api/search?',
                            { params:
                              {
                                lat: this.lat,
                                lng: this.lng,
                                socket: this.searchQuery.haveSocket,
                                wifi: this.searchQuery.haveWifi,
                                smoking: this.searchQuery.haveSmoking
                              }
                            }
                          )
      this.cafes = res.data.shops
      this.page = 2
    },
    setStorage(){
      localStorage.removeItem("position")
      const position = {"current_lat": this.lat, "current_lng": this.lng}
      localStorage.setItem(
        "position", JSON.stringify(position)
      )
    },
    getStorage(){
      const position = JSON.parse(localStorage.getItem("position"))
      this.updatePosition(position["current_lat"], position["current_lng"])
    }
  }
}
</script>
