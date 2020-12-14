<template>
  <div class="projects">
    <div class="projects__head projects-head">
      <h3 class="projects-head__title">
        Все {{ user.role !== 'admin' ? 'ваши' : '' }} проекты ({{ projectsCount }})
      </h3>
      <b-button
        variant="outline-success"
        class="projects-head__button add-project-button"
        to="/projects/add"
      >
        <b-icon-plus /> Добавить
      </b-button>
    </div>
    <div class="projects__content projects-content">
      <LargeProjectCard
        v-for="(project, i) in projects"
        :key="i"
        v-bind="project"
        :controlPanel="true"
        class="projects-content__item"
      />
    </div>
  </div>
</template>

<script>
import store from '@/store/index'
import { mapGetters } from 'vuex'

import firebase from 'firebase/app'

import LargeProjectCard from '@/components/cards/LargeProjectCard.vue'

export default {
  name: 'ProjectsAccountPage',
  metaInfo: {
    title: 'Твои проекты'
  },
  components: {
    LargeProjectCard
  },
  data: () => ({
    projects: []
  }),
  computed: {
    projectsCount () {
      return this.projects.length
    },
    ...mapGetters({
      user: 'info'
    })
  },
  async created () {
    const userID = await store.dispatch('getUid')
    const userIsAdmin = this.user.role === 'admin'

    const projectsQuerySnapshot = await firebase
      .firestore()
      .collection('projects')
      .where(
        'author.uid',
        userIsAdmin ? '!=' : '==',
        userIsAdmin ? '*' : userID
      )
      .orderBy('created')
      .get()
    projectsQuerySnapshot.forEach((doc) => {
      this.projects.push(doc.data())
    })
  }
}
</script>

<style lang="scss" scoped>
.projects {
  &__head {
    margin-bottom: 25px;
  }

  &-head {
    width: 100%;
    padding: 0 25px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &-content {
    &__item {
      &:not(:last-child) {
        margin-bottom: 25px;
      }
    }
  }
}
</style>
