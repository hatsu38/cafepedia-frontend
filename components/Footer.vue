<template>
  <v-footer
    dark
    padless
  >
    <v-card
      flat
      tile
      width="100%"
      class="brown lighten-1 white--text text-center flex"
    >
      <v-card-title class="py-1">
        <strong class="">SNS Share</strong>
        <v-spacer></v-spacer>
        <v-btn
          class="white--text"
          icon
          v-for="sns in sns_buttons" :key="sns.id"
        >
          <a :href="sns.link" target="_blank" :prefetch="false" rel="nofollow" class="white--text">
            <v-icon>{{sns.icon}}</v-icon>
          </a>
        </v-btn>
        <v-divider></v-divider>
      </v-card-title>
      <v-card-title class="py-1">
        <strong>Contact</strong>
        <v-spacer></v-spacer>
        <v-btn
          class="white--text"
          icon
        >
          <a href="https://forms.gle/ETcw6uX9EjQhwo5m9" target="_blank" :prefetch="false" rel="nofollow" class="white--text">
            <v-icon>fas fa-envelope</v-icon>
          </a>
        </v-btn>
        <v-divider></v-divider>
        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>&copy; Cafepedia</strong>
        </v-card-text>
      </v-card-title>
    </v-card>
  </v-footer>
</template>
<script>
const cafepediaURL = "https://cafepedia.jp/"
export default {
  data() {
    return {
      sns_buttons: {
        twitter: {
          icon: "fab fa-twitter",
          link: `https://twitter.com/intent/tweet?url=${cafepediaURL}&text=カフェぺディア | あなたの近くにあるカフェがすぐに見つかる&hashtags=カフェペディア`
        },
        facebook: {
          icon: "fab fa-facebook",
          link: `https://www.facebook.com/sharer/sharer.php?u=${cafepediaURL}`
        },
        line: {
          icon: "fab fa-line",
          link: `https://line.me/R/msg/text/?${cafepediaURL}`
        }
      }
    }
  }
}
</script>
