<template>
  <div>
    <v-card class="mx-auto">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-subtitle
            class="subtitle-1 font-weight-black"
            style="line-height: 1.35; color: #4f4f4f;"
          >
            {{ cafe.name }}
          </v-list-item-subtitle>
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
            <v-icon :class="cafe.main_shop_eng_name">
              fas fa-location-arrow
            </v-icon>
            <span :class="cafe.main_shop_eng_name">{{ cafe.distance }}</span>
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
            <td class="pl-0 body-2 white-space-pre-inline">
              {{ cafe.business_hour }}
            </td>
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
<style scoped>
.starbacks {
  color: #0a7042 !important;
}
.pronto {
  color: #04483a !important;
}
.tullys {
  color: #b65900 !important;
}
.doutor {
  color: #f9cc21 !important;
}
.kissa_renoir {
  color: #000000 !important;
}
.komeda {
  color: #0d2881 !important;
}
.ueshima {
  color: #723e32 !important;
}
.newyorkers {
  color: #070b3b !important;
}
.cafemiyama {
  color: #f8931d !important;
}
.myspace {
  color: #7d5b2e !important;
}
</style>
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
  }
}
</script>
