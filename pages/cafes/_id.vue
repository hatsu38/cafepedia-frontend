<template>
  <div>
    <v-simple-table>
      <tbody>
        <tr>
          <td>名前</td>
          <td>{{ cafe.name}}</td>
        </tr>
        <tr v-if="cafe.distance">
          <td>距離</td>
          <td>{{ cafe.distance }}</td>
        </tr>
        <tr v-if="cafe.business_hour">
          <td>営業時間</td>
          <td>{{ cafe.business_hour }}</td>
        </tr>
        <tr v-if="cafe.other_address">
          <td>住所</td>
          <td>{{ cafe.prefecture }}{{cafe.city}}{{cafe.other_address}}</td>
        </tr>
        <tr v-if="cafe.access">
          <td>アクセス</td>
          <td>{{ cafe.access }}</td>
        </tr>
        <tr v-if="cafe.hp">
          <td>HP</td>
          <td><a :href="cafe.hp">{{ cafe.name}}</a></td>
        </tr>
        <tr v-if="cafe.chair">
          <td>HP</td>
          <td>{{ cafe.chair }}</td>
        </tr>
        <tr v-if="cafe.tel">
          <td>TEL</td>
          <td>{{ cafe.tel }}</td>
        </tr>
        <tr>
          <td>設備</td>
          <td>
            <v-icon v-if="cafe.wifi" small color="pink" class="mr-2">fas fa-wifi</v-icon>
            <v-icon v-if="cafe.socket" small color="indigo" class="mr-2">fas fa-plug</v-icon>
            <v-icon v-if="cafe.smoking" small color="teal">fas fa-smoking</v-icon>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    {{cafe.lat}}
    <GmapMap
      :center="cafe_position"
      :zoom="15"
      map-type-id="terrain"
      style="max-width: 100%; height: 300px"
    >
      <GmapMarker
        :position="cafe_position"
        :clickable="true"
        :draggable="true"
      />
    </GmapMap>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  data() {
    return {
      cafe: [],
      cafe_position: {lat: 35.71, lng: 139.72},
    }
  },
  async created() {
    const query = {
                    lat: this.$nuxt.$route.query.lat,
                    lng: this.$nuxt.$route.query.lng
                  }
    const res = await axios.get(`https://hajiwata.com/api/shops/${this.$nuxt.$route.params.id}`,{params: query})
    this.cafe = res.data.shop
    this.cafe_position.lat = Number(this.cafe.lat)
    this.cafe_position.lng = Number(this.cafe.lng)
  },
}

</script>
