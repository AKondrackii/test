<template>
  <header ref="header" class="header">
    <b-navbar toggleable="lg" type="dark" variant="dark" sticky ref="navbar">
      <b-container>
        <b-navbar-brand to="/">
          ПРОЕКТЫ
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item v-for="(item, i) in menu" :key="i" :to="item.path" no-prefetch>
              {{ item.title }}
            </b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item to="/account" right>
              <b-icon-person-circle /> {{ user.firstname || 'Гость' }}
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <div class="header__hero hero" ref="hero">
      <div class="container">
        <h4 class="hero__title">
          «Проект — это черновик будущего»
        </h4>

        <div v-if="!user.email" class="hero__buttons">
          <b-button to="/account/login" variant="success" class="hero__button">
            Войти
          </b-button>
          <b-button to="/account/registration" variant="info" class="hero__button">
            Регистрация
          </b-button>
        </div>
        <div v-else class="hero__buttons">
          <b-button to="/account" no-prefetch variant="info" class="hero__button">
            Личный кабинет
          </b-button>
        </div>

        <transition name="fade">
          <div
            v-show="showScrollDown"
            @click="scrollDown()"
            class="hero__scroll-down hero-scroll-down"
          >
            <b-icon-arrow-bar-down class="hero-scroll-down__icon" animation="cylon-vertical" />
            <span class="hero-scroll-down__text">Листайте вниз!</span>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderComponent',
  data: () => ({
    showScrollDown: false,
    menu: [
      {
        title: 'Главная',
        path: '/'
      },
      {
        title: 'Архив',
        path: '/archive'
      },
      {
        title: 'Работы участников',
        path: '/projects'
      },
      {
        title: 'Защита',
        path: '/project-helper/protection'
      },
      {
        title: 'Оформление',
        path: '/project-helper/decoration'
      },
      {
        title: 'Структура',
        path: '/project-helper/structure'
      }
    ]
  }),
  computed: {
    ...mapGetters({
      user: 'info'
    })
  },
  mounted () {
    this.setHeroHeight()

    window.addEventListener('resize', this.setHeroHeight)
    window.addEventListener('scroll', () => {
      if (window.scrollY >= Math.round(window.screen.height / 2)) {
        this.showScrollDown = false
      }
    })

    setTimeout(() => {
      this.showScrollDown = true
    }, 1500)
  },
  destroyed () {
    window.removeEventListener('resize', this.setHeroHeight)
  },
  methods: {
    setHeroHeight () {
      const navbar = this.$refs.navbar
      const hero = this.$refs.hero
      hero.setAttribute('style', `height: ${window.innerHeight - navbar.$el.clientHeight}px`)
    },
    scrollDown () {
      const block = document.getElementById('main')
      block.scrollIntoView({ behavior: 'smooth' })
      this.showScrollDown = false
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  .hero {
    position: relative;
    width: 100%;
    height: 100vh;

    background: url('../assets/images/bg1.jpg') no-repeat 50% 50% fixed;
    background-color: #858585;
    background-size: cover;

    display: flex;
    justify-content: center;
    align-items: center;

    &__title {
      color: #fff;
      text-align: center;
      margin-bottom: 5vh;
      font-size: 2.5rem;
    }

    &__buttons {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }

    &__button {
      &:not(:last-child) {
        margin-right: 20px;
      }
    }

    .container {
      background-color: rgba($color: #000000, $alpha: 0.5);
      padding: 25vh 0;
    }

    &__scroll-down {
      min-width: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column-reverse;
      left: 50%;
      right: 50%;
      bottom: 5vh;
      position: absolute;
      transform: translateX(-50%);
    }

    &-scroll-down {
      cursor: pointer;

      &__text,
      &__icon {
        color: #fff;
        font-size: 1.5rem;
      }

      &__text {
        margin-bottom: 5px;
      }
    }
  }
}
</style>
