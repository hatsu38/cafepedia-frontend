<template>
  <div>
    <v-card class="mx-auto" width="300">
      <v-list>
        <v-list-group value="true">
          <template v-slot:activator>
            <v-list-item-title>北海道・東北</v-list-item-title>
          </template>
          <v-list-item
            v-for="prefecture in prefectures"
            :key="prefecture.id"
            link
          >
            <v-list-item-title v-text="prefecture.prefecture_name" />
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-card>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      prefectures: []
    }
  },
  created() {
    this.featchPrefectures()
  },
  methods: {
    async featchPrefectures() {
      const res = await axios.get(`${this.$urls.apiUrl}api/prefectures`)
      this.prefectures = res.data.prefectures
      console.log('prefectures', this.prefectures)
    }
  }
}
</script>
