<template>
  <div id="app">
    <transition name="fade">
      <div v-show="!pageLoaded" class="preloader">
        <b-icon-slash-circle class="preloader__loading" animation="spin-pulse" />
      </div>
    </transition>

    <component :is="layout + '-layout'">
      <router-view/>
    </component>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'app',
  metaInfo: {
    title: 'ПРОЕКТЫ',
    titleTemplate: '%s :: ПРОЕКТЫ'
  },
  data: () => ({
    pageLoaded: true
  }),
  computed: {
    layout () {
      return this.$route.meta.layout || 'default'
    },
    ...mapGetters({
      error: 'error'
    })
  },
  created () {
    window.addEventListener('load', (event) => {
      setTimeout(() => {
        this.pageLoaded = true
      }, 500)
    })
  },
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
  },
  watch: {
    error (fbError) {
      this.$toast.open({
        message: fbError,
        type: 'error'
      })
    },
    layout (layout) {
      this.SET_LAYOUT(layout)
    }
  },
  methods: mapMutations(['SET_LAYOUT'])
}
</script>

<style lang="scss">
img {
  max-width: 100%;
  height: auto;
}

body {
  max-width: 100vw;
  overflow-x: hidden;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.preloader {
  min-width: 100vw;
  min-height: 100vh;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;

  &__loading {
    font-size: 5rem;
  }
}
</style>
