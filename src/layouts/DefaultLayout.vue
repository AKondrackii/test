<template>
  <fragment>
    <Header />
    <main id="main" class="main">
      <slot />
    </main>
  </fragment>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'DefaultLayout',
  components: {
    Header
  }
}
</script>

<style lang="scss">
.main {
  margin: 50px 0;
}
</style>
