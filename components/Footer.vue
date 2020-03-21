<template>
  <v-footer text-center padless fixed v-scroll="onScroll" v-show="showAbleFooter">
    <v-card tile width="100%" class="brown lighten-1 text-center">
      <v-card-text class="py-1">
        <v-btn
          v-for="sns in sns_buttons"
          :key="sns.id"
          class="mx-2"
          icon
          :aria-label="sns.name"
          :title="sns.name"
        >
          <a
            :href="sns.link"
            target="_blank"
            :prefetch="false"
            rel="noopener"
            class="white--text"
            :aria-label="sns.name"
          >
            <v-icon size="20px">{{ sns.icon }}</v-icon>
          </a>
        </v-btn>
      </v-card-text>
      <v-divider />
      <v-card-title class="py-1">
        <v-card-text class="white--text py-1">
          {{ new Date().getFullYear() }} —
          <strong>&copy; カフェペディア</strong>
        </v-card-text>
      </v-card-title>
    </v-card>
  </v-footer>
</template>
<script>
const cafepediaURL = 'https://cafepedia.jp/'
export default {
  data() {
    return {
      sns_buttons: {
        twitter: {
          icon: 'fab fa-twitter',
          name: 'twitter',
          link: `https://twitter.com/intent/tweet?url=${cafepediaURL}&text=カフェぺディア | あなたの近くにあるカフェがすぐに見つかる&hashtags=カフェペディア`
        },
        facebook: {
          icon: 'fab fa-facebook',
          name: 'facebook',
          link: `https://www.facebook.com/sharer/sharer.php?u=${cafepediaURL}`
        },
        line: {
          icon: 'fab fa-line',
          name: 'line',
          link: `https://line.me/R/msg/text/?${cafepediaURL}`
        },
        contactForm: {
          icon: 'fas fa-envelope',
          name: 'contact form',
          link: 'https://forms.gle/ETcw6uX9EjQhwo5m9'
        }
      },
      showAbleFooter: false
    }
  },
  methods: {
    onScroll(e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.showAbleFooter = top > 200
    }
  }
}
</script>
