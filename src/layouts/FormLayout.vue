<template>
  <div class="page-wrapper" :style="`--bgColor: ${bgColor};`">
    <div class="to-home">
      <router-link to="/" title="Вернуться на главную" class="to-home__link">
        <b-icon-arrow-left-short /> На главную
      </router-link>
    </div>
    <div class="form-wrapper">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormLayout',
  computed: {
    bgColor () {
      return this.$route.meta.layoutBackgroundColor || '#3676ff'
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  background-color: #e7e7e7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 0;

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 30vh;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: var(--bgColor);
    z-index: 1;
  }
}

.form-wrapper {
  min-width: 35%;
  background-color: #fff;
  padding: 3%;
  z-index: 2;
  box-shadow: 1px 5px 10px 2px rgba(0, 0, 0, .1);
}

.to-home {
  min-width: 200px;
  height: 5vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;

  transition: 0.2s ease-out background;

  &:hover {
    background: rgba($color: #000000, $alpha: 0.1);
  }

  &__link {
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: #fff;
    text-align: center;
    line-height: 5vh;
  }
}
</style>
