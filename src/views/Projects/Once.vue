<template>
  <div>
    <div v-if="found">
      <div class="hero">
        <div class="hero-text">
          <h1 class="hero-text__title">{{ project.title }}</h1>
        </div>
        <div class="hero-image">
          <b-img-lazy :src="project.preview" :alt="project.title" class="hero-image__image" />
        </div>
      </div>
    </div>
    <div v-else>Не найден</div>
  </div>
</template>

<script>
import firebase from 'firebase/app'

export default {
  name: 'OnceProjectPage',
  data: () => ({
    found: false,
    project: {}
  }),
  async created () {
    const QueryShapshot = await firebase
      .firestore()
      .collection('projects')
      .where('slug', '==', this.$route.params.slug)
      .get()

    if (QueryShapshot.docs.length > 0) {
      this.found = true
      this.project = QueryShapshot.docs[0].data()
    }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  width: 100%;
  height: 50vh;
  overflow: hidden;
  position: relative;

  &-image {
    width: 100%;
    max-height: 50vh;
    overflow: hidden;
    filter: blur(5px);
    z-index: 1;

    &__image {
      width: 100%;
      height: 100%;
      transform: scale(1.5);
    }
  }

  &-text {
    display: block;
    width: 100%;
    position: absolute;
    top: 50%;
    bottom: 50%;
    z-index: 2;

    &__title {
      display: block;
      text-align: center;
      color: #fff;
      text-transform: uppercase;
      transform: translateY(-50%);
    }
  }
}
</style>
