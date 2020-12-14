<template>
  <b-row>
    <b-col lg="2" class="account-navbar">
      <div class="wrapper">
        <div class="to-home">
          <router-link to="/" class="to-home__link">
            <b-icon-arrow-left class="to-home__icon" /> На главную
          </router-link>
        </div>
        <div class="short-user-info">
          <b-avatar :src="user.photo" class="short-user-info__photo" />
          <h4 class="short-user-info__name">
            <b-icon-star-fill v-if="user.role === 'admin'" title="Является администратором" /> {{ fullName }}
          </h4>
          <h6 class="short-user-info__email">{{ user.email || 'Загрузка...' }}</h6>
        </div>
      </div>
      <nav class="account-navigation">
        <ul class="account-navigation__list">
          <li v-for="(item, i) in menu" :key="i" class="account-navigation__item">
            <router-link
              :to="'/account' + item.path"
              no-prefetch
              class="account-navigation__link"
              exact-active-class="account-navigation__link--active"
            >
              {{ item.title }}
            </router-link>
          </li>
        </ul>
      </nav>
      <button class="logout" @click="openConfirmModel()">
        <span class="logout__text">
          <b-icon-door-open /> Выйти
        </span>
      </button>
    </b-col>
    <b-col lg="10" class="page-content">
      <b-container class="page-content__container">
        <h2 v-if="title" class="page-content__title">{{ title }}</h2>
        <router-view />
      </b-container>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'account-layout',
  data: () => ({
    menu: [
      {
        title: 'Главная',
        path: '/'
      },
      {
        title: 'Проекты',
        path: '/projects'
      }
    ]
  }),
  computed: {
    ...mapGetters({
      user: 'info'
    }),
    fullName () {
      const { firstname, lastname } = this.user
      return firstname + ' ' + lastname
    },
    title () {
      const title = this.$route.meta.title
      return title || null
    }
  },
  methods: {
    async logout () {
      await this.$store.dispatch('logout')
      this.$router.push('/')
    },
    openConfirmModel () {
      this.$bvModal.msgBoxConfirm('Вы точно хотите выйти?', {
        title: 'Подтвердите выход',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'success',
        cancelVariant: 'danger',
        okTitle: 'Да',
        cancelTitle: 'Нет',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then(value => {
          if (value) {
            this.logout()
            this.$toast.open({
              message: 'Вы успешно вышли из аккаунта!',
              type: 'success'
            })
          }
        })
        .catch(err => {
          throw err
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-content {
  &__container {
    padding: 25px 15px;
  }

  &__title {
    text-align: center;
    font-size: 2.5rem;
    margin-top: 25px;
  }
}

.account-navbar {
  position: sticky;
  top: 0;
  left: 0;
  bottom: 0;

  min-height: 100vh;
  max-height: 100vh;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  padding: 0;
  background-color: #0f0f0f;

  .wrapper {
    width: 100%;
    min-height: 25%;
  }

  .to-home {
    width: 100%;
    height: 6vh;
    background-color: lighten($color: #0f0f0f, $amount: 10%);

    transition: 0.2s ease-in background-color;

    &:hover {
      background-color: lighten($color: #0f0f0f, $amount: 5%);
    }

    &__link {
      display: block;
      color: #fff;
      line-height: 6vh;
      text-align: center;
      text-decoration: none;
    }
  }

  .short-user-info {
    width: 100%;
    height: 100%;
    background-color: lighten($color: #0f0f0f, $amount: 5%);

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &__name,
    &__email {
      text-align: center;
    }

    &__name {
      color: #fff;
      font-size: 1.3rem;
      margin-bottom: 2px;
    }

    &__email {
      color: darken($color: #fff, $amount: 35%);
      font-weight: 400;
    }

    &__photo {
      width: 60px;
      height: 60px;
      margin-bottom: 15px;
    }
  }

  .account-navigation {
    display: block;
    width: 100%;

    &__list {
      list-style: none;
      padding: 0;
    }

    &__item {
      height: 6vh;
      background-color: lighten($color: #0f0f0f, $amount: 5%);

      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }

    &__link {
      display: block;
      width: 100%;
      height: 100%;
      text-decoration: none;
      padding-left: 30px;
      color: #fff;
      line-height: 6vh;

      &--active {
        &::after {
          display: block;
          position: relative;
          content: '';
          left: -30px;
          top: -75%;
          width: 5px;
          height: 50%;
          background-color: #38ff42;
        }
      }
    }
  }

  .logout {
    width: 100%;
    height: 6vh;
    background-color: #cc0000;
    display: flex;
    justify-content: center;
    cursor: pointer;
    border: none;
    outline: none;

    transition: 0.2s ease-in background-color;

    &__text {
      line-height: 6vh;
      color: #fff;
    }

    &:hover {
      background-color: darken($color: #cc0000, $amount: 15%);
    }
  }
}

</style>
