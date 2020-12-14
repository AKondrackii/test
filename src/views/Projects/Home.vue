<template>
  <b-container>
    <h1>Все проекты</h1>
    <b-card-group deck columns>
      <SmallProjectCard
        v-for="(project, i) in projects"
        :key="i"
        :controlPanel="false"
        v-bind="project"
      />
    </b-card-group>
  </b-container>
</template>

<script>
import firebase from 'firebase/app'
import SmallProjectCard from '@/components/cards/SmallProjectCard.vue'

export default {
  name: 'ProjectsHomePage',
  metaInfo: {
    title: 'Проекты'
  },
  components: {
    SmallProjectCard
  },
  data: () => ({
    projects: []
  }),
  async created () {
    const projectsQuerySnapshot = await firebase
      .firestore()
      .collection('projects')
      .orderBy('created')
      .get()
    projectsQuerySnapshot.forEach((doc) => {
      this.projects.push(doc.data())
    })
  }
}
</script>
