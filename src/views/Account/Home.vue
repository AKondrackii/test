<template>
  <fragment>
    <div class="recent-projects">
      <div class="recent-projects__head recent-projects-head">
        <h3 class="recent-projects-head__title">
          <router-link to="/account/projects" title="Перейти ко всем проектам">
            Недавние проекты
          </router-link>
        </h3>
        <b-button
          variant="outline-success"
          class="recent-projects-head__button add-project-button"
          to="/projects/add"
        >
          <b-icon-plus /> Добавить
        </b-button>
      </div>
      <b-card-group class="recent-projects__content recent-projects-content" deck columns>
        <SmallProjectCard
          v-for="(project, i) in projects"
          :key="i"
          :controlPanel="true"
          v-bind="project"
        />
      </b-card-group>
    </div>
  </fragment>
</template>

<script>
import store from '@/store/index'
import firebase from 'firebase/app'

import SmallProjectCard from '@/components/cards/SmallProjectCard.vue'

export default {
  name: 'HomeAccountPage',
  metaInfo: {
    title: 'Аккаунт'
  },
  components: {
    SmallProjectCard
  },
  data: () => ({
    projects: []
  }),
  async created () {
    const userID = await store.dispatch('getUid')

    const projectsQuerySnapshot = await firebase
      .firestore()
      .collection('projects')
      .where('author.uid', '==', userID)
      .orderBy('created')
      .limit(4)
      .get()
    projectsQuerySnapshot.forEach((doc) => {
      this.projects.push(doc.data())
    })
  }
}
</script>

<style lang="scss" scoped>
.recent-projects {
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
}
</style>
