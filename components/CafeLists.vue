<template>
  <div class="cafe-lists">
    <v-btn block outlined color="orange accent-3" class="white--text mb-3" @click="clickUpdateLatLng">
      現在地を取得
    </v-btn>
    <v-card v-for="cafe in cafes" :key="cafe.name" class="mb-2">
      <v-card-title class="subtitle-1 pb-1">
        <nuxt-link :to="{name:'cafes-id',params:{id:cafe.id},query: { lat: lat,lng: lng, socket: searchQuery.haveSocket, wifi: searchQuery.havewifi, smoking: searchQuery.havesmoking  }}">{{ cafe.name }}</nuxt-link>
      </v-card-title>
      <v-row no-gutters dense>
        <v-col cols="3" sm="6" md="8">
          <v-card flat>
            <img :src="`https://hajiwata.com/${cafe.image}`" width="100" height="100">
            <v-card-actions>
              <v-row align="center" justify="space-around">
                <v-col cols="4">
                  <v-icon v-if="cafe.wifi" small color="pink">fas fa-wifi</v-icon>
                </v-col>
                <v-col cols="4">
                  <v-icon v-if="cafe.socket" small color="indigo">fas fa-plug</v-icon>
                </v-col>
                <v-col cols="4">
                  <v-icon v-if="cafe.smoking" small color="teal">fas fa-smoking</v-icon>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="9" sm="6" md="8">
          <v-list dense>
            <v-list-item-group color="primary indigo">
              <v-list-item>
                <v-list-item-icon class="mr-1">
                  <v-icon small>fas fa-map-marker-alt</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="cafe.prefecture + cafe.city + cafe.other_address"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon class="mr-1">
                  <v-icon small>fas fa-clock</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="cafe.business_hour"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon class="mr-1">
                  <v-icon small>fas fa-location-arrow</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="cafe.distance"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>
    </v-card>
    <infinite-loading spinner="waveDots" @infinite="infiniteScroll" :distance="500">
      <!-- slotでメッセージをカスタマイズできる -->
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </infinite-loading>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['searchQuery'],
  data() {
    return {
      count: 20,
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
      try {
        const position = await this.getPosition()
        this.updatePosition(position)
      }
      catch(error){
        this.lat = 35.6589568
        this.lng = 139.7219328
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
        alert("位置情報の取得に失敗しました"+error)
        this.lat = 35.6589568
        this.lng = 139.7219328
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
      if(res.data.shops.length > 0){
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
    }
  }
}

</script>
