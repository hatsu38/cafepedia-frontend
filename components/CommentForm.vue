<template>
  <div>
    <v-card outlined v-for="comment in comments" :key="comment.id">
      <div class="mb-1 ml-1 overline" color="grey lighten-4">{{comment.name}}</div>
      <v-card-text class="pt-1 pb-1" color="grey darken-4">{{comment.content}}</v-card-text>
    </v-card>
    <v-form ref="form" @submit.prevent="submit" class="ma-3">
      <v-textarea
        outlined
        auto-grow
        v-model="content"
        rows=2
        label="カフェの情報を書き込む"
      ></v-textarea>
      <div class="text-right mt-n5">
        <v-btn
          small
          color="primary"
          :disabled="!formIsValid"
          @click="submit"
        >投稿する</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios'
const axiosPost = axios.create({
    xsrfHeaderName: 'X-CSRF-Token'
})
export default {
  data(){
    return {
      page: 1,
      name: '名無しさん',
      content: undefined,
      comments: []
    }
  },
  async mounted() {
    this.getComments()
  },
  computed: {
    formIsValid() {
      return(
        (this.content || '').length > 2
      )
    },
  },
  methods: {
    async submit() {
      const res = await axiosPost.post(`https://hajiwata.com/api/shops/${this.$nuxt.$route.params.id}/comments`,{
        comment: {
          content: this.content,
          name: this.name,
          is_complete: false,
          shop_id: this.$nuxt.$route.params.id
        }
      })
    },
    async getComments(){
      const res = await axios.get(`https://hajiwata.com/api/shops/${this.$nuxt.$route.params.id}/comments?`,
        { params:
          {
            page: this.page
          }
        }
      )
      this.comments.push(...res.data.comments)
      this.page++
      this.content = ''
    },
  }
}
</script>
