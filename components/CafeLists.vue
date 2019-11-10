<template>
  <div class="cafe-lists">
    <v-btn block outlined color="orange accent-3" class="white--text mb-3" @click="clickUpdateLatLng">
      現在地を取得
    </v-btn>
    <v-card v-for="cafe in cafes" :key="cafe.name" class="mb-2">
      <v-card-title class="subtitle-1 pb-1">
        <nuxt-link :to="{name:'cafes-id',params:{id:cafe.id},query: { lat: lat,lng: lng }}">{{ cafe.name }}</nuxt-link>
      </v-card-title>
      <v-row no-gutters dense>
        <v-col cols="3" sm="6" md="8">
          <v-card flat>
            <v-img
              src="https://lohas.nicoseiga.jp/thumb/865728i?1303612428"
              lazy-src="https://picsum.photos/id/11/10/6"
              aspect-ratio="1"
              class="grey lighten-2"
              max-width="100"
              max-height="100"
            ></v-img>
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
    <infinite-loading spinner="waveDots" @infinite="searchFetch" :distance="500">
      <!-- slotでメッセージをカスタマイズできる -->
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </infinite-loading>
  </div>
</template>

<script>
import axios from 'axios'
import InfiniteLoading from "vue-infinite-loading";
export default {
  props: ['searchQuery'],
  components: {
    InfiniteLoading
  },
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
    try {
      const position = await this.getPosition()
      this.updatePosition(position)
    }
    catch(error){
      this.lat = 35.6589568
      this.lng = 139.7219328
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
    infiniteHandler() {
      setTimeout(() => {
        this.count += 20
        this.$refs.infiniteLoading.stateChanger.loaded()
      }, 1000)
    },
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
    async searchFetch($state) {
      console.log("search!")
      const res = await axios.
                        get('http://localhost:3001/api/search?',
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
    }
  }
}

</script>
