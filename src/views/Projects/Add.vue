<template>
  <fragment>
    <b-form @submit.stop.prevent="add()" class="add-form">
      <b-form-group id="title-group">
        <h1 class="title">Добавить проект</h1>
      </b-form-group>

      <b-form-group
        id="title-input-group"
        label="Название:"
        label-for="title-input"
      >
        <b-form-input
          id="title-input"
          v-model="form.title"
          type="text"
          name="title-input"
          placeholder="Введите название"
          v-validate="{ required: true, min: 20, max: 100 }"
          data-vv-as="название"
          :state="validateState('title-input')"
          aria-describedby="title-input-feedback"
        />
        <b-form-invalid-feedback id="title-input-feedback">
          {{ veeErrors.first('title-input') }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="subject-select-group"
        label="Предмет:"
        label-for="subject-select"
      >
        <b-form-select
          id="subject-select"
          v-model="form.subject"
          name="subject-select"
          v-validate="{ required: true }"
          data-vv-as="предмет"
          :state="validateState('subject-select')"
          aria-describedby="subject-select-feedback"
        >
          <b-form-select-option :value="null">Выберите предмет</b-form-select-option>
          <b-form-select-option
            v-for="(subject, i) in avalibleSubjects"
            :key="i" :value="subject"
          >
            {{ subject }}
          </b-form-select-option>
        </b-form-select>
        <b-form-invalid-feedback id="subject-select-feedback">
          {{ veeErrors.first('subject-select') }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="description-input-group"
        label="Описание:"
        label-for="description-input"
      >
        <b-form-textarea
          id="description-input"
          v-model="form.description"
          name="description-input"
          v-validate="{ required: true, min: 150, max: 10000 }"
          data-vv-as="описание"
          :state="validateState('description-input')"
          aria-describedby="description-input-feedback"
        />
        <b-form-invalid-feedback id="description-input-feedback">
          {{ veeErrors.first('description-input') }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="file-input-group"
        label="PDF файл:"
        label-for="file-input"
      >
        <b-form-file
          id="file-input"
          v-model="form.pdf"
          name="file-input"
          placeholder="Загрузите PDF файл сюда"
          browse-text="Выбрать"
          accept="application/pdf"
          v-validate="{ required: true, extension: 'pdf' }"
          data-vv-as="PDF файл"
          :state="validateState('file-input')"
          aria-describedby="file-input-feedback"
        />
        <b-form-invalid-feedback id="file-input-feedback">
          {{ veeErrors.first('file-input') }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="info-group">
        <span>
          Адрес проекта: {{ slug || 'Введите название!' }}
        </span>
      </b-form-group>

      <b-form-group id="submit-button-group">
        <b-button variant="outline-success" block type="submit">Добавить</b-button>
      </b-form-group>
    </b-form>
  </fragment>
</template>

<script>
import slug from 'slug'
import randomString from 'crypto-random-string'

import firebase from 'firebase/app'
import store from '@/store/index'

export default {
  name: 'ProjectsAddPage',
  metaInfo: {
    title: 'Добавить проект'
  },
  data: () => ({
    avalibleSubjects: [
      'Информатика',
      'Изо',
      'Технология',
      'Физкультура',
      'Обществознание',
      'История',
      'Биология',
      'География',
      'История СПб',
      'Физика',
      'Химия'
    ],
    form: {
      title: '',
      subject: null,
      pdf: null,
      description: ''
    },
    prefix: randomString({
      length: 6
    })
  }),
  computed: {
    slug () {
      const sluggedTitle = slug(this.form.title)

      return sluggedTitle
        ? `${this.prefix}-${sluggedTitle}`
        : ''
    }
  },
  methods: {
    validateState (ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref)
      }

      return null
    },
    async add () {
      const uid = await store.dispatch('getUid')
      const { firstname, lastname } = await store.getters.info

      this.$validator.validateAll().then((result) => {
        if (!result) return

        const storageRef = firebase.storage().ref(`pdfs/${this.slug}.pdf`).put(this.form.pdf)
        storageRef.on(
          'state_changed',
          snapshot => {},
          error => console.error(error),
          () => {
            storageRef.snapshot.ref.getDownloadURL().then((pdfUrl) => {
              firebase.firestore().collection('projects').add({
                title: this.form.title,
                description: this.form.description,
                preview: 'https://picsum.photos/id/10/300/300',
                pdf: pdfUrl,
                subject: this.form.subject,
                created: firebase.firestore.FieldValue.serverTimestamp(),
                slug: this.slug,
                author: {
                  uid,
                  fullname: `${firstname} ${lastname}`
                }
              }).then(() => {
                this.$router.push(`/project/${this.slug}`)
                this.$toast.open({
                  message: 'Проект успешно добавлен',
                  type: 'success'
                })
              }).catch((err) => {
                console.error(err)
                this.$toast.open({
                  message: 'Произошла техническая ошибка, проект не был добавлен',
                  type: 'error'
                })
              })
            })
          }
        )
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
}
</style>
