<template>
  <v-row dense>
    <v-col v-for="cafe in mainCafes" :key="cafe.id" cols="3">
      <v-card>
        <v-img
          :src="
            `https://cafepedia-images.s3-ap-northeast-1.amazonaws.com${cafe.image}`
          "
          class="white--text align-end"
          height="40px"
        />
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      mainCafes: []
    }
  },
  beforeMount() {
    this.getMainCafes()
  },
  methods: {
    async getMainCafes() {
      const res = await axios.get('https://api.cafepedia.jp/api/main_shops')
      this.mainCafes = res.data.main_shops
    }
  }
}
</script>
