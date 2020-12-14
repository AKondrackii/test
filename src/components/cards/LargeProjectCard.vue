<template>
  <b-card
    no-body
    tag="article"
    class="overflow-hidden project-card-lg"
  >
    <b-row no-gutters>
      <b-col md="6">
        <router-link :to="`/project/${slug}`" no-prefetch>
          <b-card-img-lazy :src="preview" :alt="title" class="rounded-0"></b-card-img-lazy>
        </router-link>
      </b-col>
      <b-col md="6">
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
            {{ description | trimWords(250) }}
          </b-card-text>
          <b-card-text>
            <b-icon-person />
            <router-link :to="`/user/${author.uid}`" no-prefetch>
              {{ author.fullname | capitalize }}
            </router-link>
          </b-card-text>
          <b-card-text>
            <b-icon-calendar /> {{ created.seconds | date }}
          </b-card-text>
          <b-card-text v-if="controlPanel" text-tag="div">
            <b-button-group size="md">
              <b-button :to="`/project/${slug}`" no-prefetch variant="primary">
                <b-icon-eye /> Смотреть
              </b-button>
              <b-button :to="`/project/${slug}/edit`" no-prefetch variant="warning">
                <b-icon-pencil /> Редактировать
              </b-button>
              <b-button :to="`/project/${slug}/delete`" no-prefetch variant="danger">
                <b-icon-trash /> Удалить
              </b-button>
            </b-button-group>
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  name: 'LargeProjectCard',
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
    },
    author: {
      type: Object,
      required: true
    },
    created: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.project-card-lg {
  width: 100%;
  max-height: 35vh;

  .col-md-6:last-child {
    height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>
