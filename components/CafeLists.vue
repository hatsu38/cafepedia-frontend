<template>
  <div class="cafe-lists">
    <v-btn block outlined color="orange accent-3" class="white--text mb-3" @click="clickUpdateLatLng">
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
            <nuxt-link :to="{name:'cafes-id',params:{id:cafe.id},query: { lat: lat,lng: lng, socket: searchQuery.haveSocket, wifi: searchQuery.havewifi, smoking: searchQuery.havesmoking  }}">{{ cafe.name }}</nuxt-link>
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
      geolocation_optoins: {
        "enableHighAccuracy": true,
        "maximumAge": 2000,
      }
    }
  },
  async beforeMount() {
    if (this.$nuxt.$route.query.lat && this.$nuxt.$route.query.lng){
      this.lat = this.$nuxt.$route.query.lat
      this.lng = this.$nuxt.$route.query.lng
    } else {
      try{
        const position = await this.getPosition()
        this.updatePosition(position)
      }
      catch(error){
        alert("位置情報の取得に失敗しました"+error.message)
        this.lat = 35.659328
        this.lng = 139.700553
        this.searchFetch()
      }
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
  methods: {
    getPosition() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, this.geolocation_optoins);
      })
    },
    async clickUpdateLatLng() {
      try {
        const position = await this.getPosition()
        this.updatePosition(position)
        this.searchFetch()
      }
      catch(error){
        alert("位置情報の取得に失敗しました"+error.message)
        this.lat = 35.659328
        this.lng = 139.700553
        this.searchFetch()
      }
    },
    updatePosition( position ) {
      this.lat = position.coords.latitude
      this.lng = position.coords.longitude
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
    }
  }
}

</script>
