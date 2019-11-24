<template>
  <div>
    <v-card class="mx-auto">
      <v-list-item three-line>
        <v-list-item-content>
          <h1
            class="subtitle-1 font-weight-black"
            style="line-height: 1.35; color: #4f4f4f;"
          >
            {{ cafe.name }}
          </h1>
        </v-list-item-content>
      </v-list-item>
      <v-card-text class=" pt-0 mt-n5">
        <v-row
          justify="space-around"
          align="center"
          class="pt-0"
        >
          <v-col
            cols="auto"
            class="display-2 pa-0"
          >
            <v-icon :class="`${cafe.main_shop_eng_name}-title`">
              fas fa-location-arrow
            </v-icon>
            <span :class="`${cafe.main_shop_eng_name}-title`">{{ cafe.distance }}</span>
          </v-col>
          <v-col cols="auto pa-0">
            <img
              :src="`https://hajiwata.com/${cafe.image}`"
              width="90"
              height="90"
            >
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="px-1">
        <v-chip :class="cafe.wifi ? 'have-wifi' : 'have-not-facility'">
          <v-icon
            small
            class="mr-1"
            :class="cafe.wifi ? 'have-wifi' : 'have-not-facility'"
          >
            fas fa-wifi
          </v-icon>
          Wi-Fi
        </v-chip>
        <v-chip :class="cafe.socket ? 'have-socket' : 'have-not-facility'">
          <v-icon
            small
            class="mr-1"
            :class="cafe.socket ? 'have-socket' : 'have-not-facility'"
          >
            fas fa-plug
          </v-icon>
          電源
        </v-chip>
        <v-chip :class="cafe.smoking ? 'have-smoking' : 'have-not-facility'">
          <v-icon
            small
            class="mr-1"
            :class="cafe.smoking ? 'have-smoking' : 'have-not-facility'"
          >
            fas fa-smoking
          </v-icon>
          喫煙席
        </v-chip>
      </v-card-text>
      <v-simple-table>
        <tbody>
          <tr v-if="cafe.business_hour">
            <td>
              <v-icon style="font-size: 18px;">
                fas fa-clock
              </v-icon>
            </td>
            <td class="pl-0 body-2 white-space-pre-inline">{{ cafe.business_hour }}</td>
          </tr>
          <tr v-if="cafe.other_address">
            <td>
              <v-icon style="font-size: 18px;">
                fas fa-map
              </v-icon>
            </td>
            <td class="pl-0 body-2">
              {{ cafe.prefecture }}{{ cafe.city }}{{ cafe.other_address }}
            </td>
          </tr>
          <tr v-if="cafe.access">
            <td>
              <v-icon style="font-size: 18px;">
                fas fa-map-marker-alt
              </v-icon>
            </td>
            <td class="pl-0 body-2">
              {{ cafe.access }}
            </td>
          </tr>
          <tr v-if="cafe.hp">
            <td>
              <v-icon style="font-size: 18px;">
                fas fa-external-link-alt
              </v-icon>
            </td>
            <td class="pl-0 body-2">
              <a :href="cafe.hp">{{ cafe.name }}</a>
            </td>
          </tr>
          <tr v-if="cafe.chair">
            <td>
              <v-icon style="font-size: 18px;">
                fas fa-chair
              </v-icon>
            </td>
            <td class="pl-0 body-2">
              {{ cafe.chair }}
            </td>
          </tr>
          <tr v-if="cafe.tel">
            <td>
              <v-icon style="font-size: 18px;">
                fas fa-phone
              </v-icon>
            </td>
            <td class="pl-0 body-2">
              {{ cafe.tel }}
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
    <GmapMap
      :center="cafe_position"
      :zoom="15"
      map-type-id="terrain"
      style="max-width: 100%; height: 300px"
      class="mb-2"
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
import axios from "axios"
export default {
  data() {
    return {
      cafe: [],
      cafe_position: { lat: 35.71, lng: 139.72 }
    }
  },
  async created() {
    // 見ているページのカフェ情報
    const query = {
      lat: this.$nuxt.$route.query.lat,
      lng: this.$nuxt.$route.query.lng
    }
    const res = await axios.get(
      `https://hajiwata.com/api/shops/${this.$nuxt.$route.params.id}`,
      { params: query }
    )
    this.cafe = res.data.shop
    this.cafe_position.lat = Number(this.cafe.lat)
    this.cafe_position.lng = Number(this.cafe.lng)
  },
  methods: {
    createMetaDescription(cafe) {
      const wifiText = cafe.wifi ? "Wi-Fiがある、" : ""
      const socketText = cafe.socket ? "電源・コンセントがある" : ""
      const smokingText = cafe.smoking ? "喫煙席もある" : ""
      const stationText = this.$nuxt.$route.query.stationName ?  this.$nuxt.$route.query.stationName + "近くにある" : ""
      const descrptionText =
        wifiText +
        socketText +
        smokingText +
        stationText +
        cafe.main_shop_name +
        "です。" +
        cafe.prefecture +
        cafe.city +
        cafe.other_address +
        "にあります。"
      return descrptionText
    }
  },
  head () {
    return {
      title: this.cafe.name + " | カフェぺディア | あなたの近くにあるカフェがすぐに見つかる",
      meta: [
        { hid: 'description', name: 'description', content: this.createMetaDescription(this.cafe) }
      ]
    }
  }
}
</script>
