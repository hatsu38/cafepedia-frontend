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
              :src="`https://api.cafepedia.jp/${cafe.image}`"
              width="90"
              height="90"
            >
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="px-1 pb-2">
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
      <v-simple-table class="mb-n1">
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
                fas fa-link
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
      <p
        class="mb-0 mx-2 pb-2 text-right body-2"
      >
        <a
          :href="editUrlRequest(cafe)"
          target="_blank"
          rel="nofollow"
        >
          <v-icon
            color="blue darken-2"
            style="font-size: 14px;"
          >
            fas fa-external-link-alt
          </v-icon>
          情報の修正を提案
        </a>
      </p>
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
    <a
      :href="`https://www.google.com/maps/search/?api=1&query=${cafe.prefecture }${ cafe.city }${ cafe.other_address}`"
      class="caption d-flex d-sm-none"
      target="_blank"
      rel="nofollow"
    >
      地図を見る
    </a>
  </div>
</template>
<script>
import axios from "axios"
export default {
  data() {
    return {
      cafe: [],
      cafe_position: { lat: 35.71, lng: 139.72 },
      editRequestUrl: undefined
    }
  },
  async created() {
    // 見ているページのカフェ情報
    const query = {
      lat: this.$nuxt.$route.query.lat,
      lng: this.$nuxt.$route.query.lng
    }
    const res = await axios.get(
      `https://api.cafepedia.jp/api/shops/${this.$nuxt.$route.params.id}`,
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
    },
    editUrlRequest(cafe) {
      const cafeName = "entry.537099549=" + cafe.name,
            cafeAddress = cafe.other_address ? "&entry.1935919079="+cafe.prefecture+cafe.city+cafe.other_address : "",
            cafeAccess = cafe.access ? "&entry.639648788="+cafe.access : "",
            cafeTel = cafe.tel ? "&entry.361805782="+cafe.tel : "",
            cafeBusinessHour = cafe.business_hour ? "&entry.1300411853="+cafe.business_hour : "",
            cafeChair = cafe.chair ? "&entry.1986662663=" + cafe.chair : "",
            cafeUrl = cafe.url ? "&entry.376343537=" + cafe.url : "",
            cafeWifi = cafe.wifi ? "&entry.1484239701=Wi-Fiが使えます" : "",
            cafeSocket = cafe.socket ? "&entry.189878129=コンセントが使えます" : "",
            cafeSmoking = cafe.smoking ? "&entry.625872371=喫煙席があります" : ""
      const googleForm = "https://docs.google.com/forms/d/e/1FAIpQLSdkTXNrlKD-6fFP7EvBwU0DqqiWR_7J_4LAO6Igs-_7KyxiMw/viewform?usp=sf_link&"
      const googleURL = googleForm +
                        cafeName +
                        cafeAddress +
                        cafeAccess +
                        cafeTel +
                        cafeBusinessHour +
                        cafeChair +
                        cafeUrl +
                        cafeWifi +
                        cafeSocket +
                        cafeSmoking
      return googleURL
    },
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
