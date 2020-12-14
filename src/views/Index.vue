<template>
  <div class="home">
    <section class="section section-for-students">
      <b-container>
        <h3 class="section__title">Для тех, кто будет делать проект</h3>
        <ul class="section-for-students__list">
          <li v-for="(helpMaterial, i) in helpMaterials" :key="i" class="section-for-students__item">
            <router-link :to="helpMaterial.path" no-prefetch class="section-for-students__link">
              {{ helpMaterial.title }}
            </router-link>
          </li>
        </ul>
      </b-container>
    </section>

    <section class="section section-objective">
      <b-container>
        <h3 class="section__title">Цель этого проекта</h3>
        <p class="section-objective__text">Целью нашего проекта — <b>помочь девятиклассникам</b> с созданием проекта, а также их последующем <b>хранением</b>, что в дальнейшем может помочь следующему поколению девятиклассников.</p>
      </b-container>
    </section>

    <section class="section section-creators">
      <b-container>
        <h3 class="section__title">Создатели этого проекта</h3>

        <b-row>
          <b-col
            v-for="(creator, i) in creators"
            :key="i"
            class="section-creators__item section-creators-item"
          >
            <h4 class="section-creators-item__name">{{ creator.name }}</h4>
            <span class="section-creators-item__role">{{ creator.role }}</span>
            <HoverCard
              :image="creator.photo"
              :title="creator.name"
              :text="creator.role"
              :link="creator.link"
              class="section-creators-item__card"
            />
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
import HoverCard from '../components/cards/HoverCard.vue'

export default {
  components: { HoverCard },
  name: 'IndexPage',
  metaInfo: {
    title: 'Главная'
  },
  data: () => ({
    helpMaterials: [
      {
        title: 'Какая должна быть структура проекта',
        path: '/project-helper/structure'
      },
      {
        title: 'Как оформлять проект',
        path: '/project-helper/decoration'
      },
      {
        title: 'Как защищать проект',
        path: '/project-helper/protection'
      },
      {
        title: 'Работы участников',
        path: '/projects'
      }
    ],
    creators: [
      {
        name: 'Кондрацкий Артем',
        role: 'Ученик',
        photo: require('../assets/images/artem.jpg'),
        link: 'https://vk.com/artem_kondrackii'
      },
      {
        name: 'Красикова Ирина',
        role: 'Учитель Информатики',
        photo: require('../assets/images/irina.jpg'),
        link: 'https://vk.com/id5179075'
      }
    ]
  })
}
</script>

<style lang="scss" scoped>
.section {
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &__title {
    font-size: 2.5rem;
    margin-bottom: 50px;
    text-align: center;
  }

  &-for-students {
    &__list {
      display: flex;
      align-items: center;
      flex-direction: column;

      list-style: none;
      padding: 0;
    }

    &__item {
      width: 300px;
      display: block;
      text-align: center;
      background: #44ca22;
      margin-bottom: 10px;
      position: relative;

      transition: 0.2s ease-out background;

      &:hover {
        background: darken($color: #44ca22, $amount: 10%);
      }

      &:last-child {
        margin-bottom: 0;
        border-radius: 0 0 10px 10px;
      }

      &:first-child {
        border-radius: 10px 10px 0 0;
      }
    }

    &__link {
      display: block;
      width: 300px;
      padding: 25px 10px;
      color: #fff;
      text-decoration: none;
    }
  }

  &-objective {
    &__text {
      font-size: 1.2rem;
    }
  }

  &-creators {
    &-item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      &__name {
        font-size: 2.2rem;
        margin-bottom: 0;
      }

      &__role {
        font-size: 1.2rem;
        color: #5f5f5f;
      }

      &__card {
        transform: scale(0.8);
      }
    }
  }
}
</style>
