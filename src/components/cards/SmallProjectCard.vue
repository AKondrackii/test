<template>
  <b-card
    no-body
    tag="article"
    class="project-card-sm"
  >
    <router-link :to="`/project/${slug}`" no-prefetch>
      <b-card-img-lazy :src="preview" :alt="title" class="rounded-0"></b-card-img-lazy>
    </router-link>

    <b-card-body>
      <b-card-title>
        <router-link :to="`/project/${slug}`">
          {{ title | capitalize }}
        </router-link>
      </b-card-title>
      <b-card-sub-title>
        {{ subject | capitalize }}
      </b-card-sub-title>
      <b-card-text>
        {{ description | trimWords(100) }}
      </b-card-text>

      <b-button-group v-if="controlPanel" size="sm">
        <b-button :to="`/project/${slug}`" no-prefetch variant="primary">
          <b-icon-eye /> Смотреть
        </b-button>
        <b-button :to="`/project/${slug}/edit`" no-prefetch variant="warning">
          <b-icon-pencil /> Редактировать
        </b-button>
      </b-button-group>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    controlPanel: {
      type: Boolean,
      required: false,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    preview: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    }
  }
}
</script>
