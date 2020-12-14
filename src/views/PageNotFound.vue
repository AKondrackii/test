<template>
  <div class="page-wrapper">
    <div class="image">
      <img src="../assets/images/sticker-404.png" alt="Not found image">
    </div>

    <div class="content">
      <h1 class="title">Страница не найдена</h1>

      <p class="to-home">
        <router-link to="/" class="to-home__link">
          Вернуться на главную
        </router-link>
        (через {{ backToHomeTimeCount }})
      </p>

      <div class="reasons">
        <h6 class="reasons__title">
          Возможные причины:
        </h6>
        <ul class="reasons__list">
          <li v-for="(reason, i) in reasons" :key="i" class="reasons__item">
            {{ reason }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageNotFoundPage',
  metaInfo: {
    title: 'Страница не найдена'
  },
  data: () => ({
    backToHomeTimeCount: 30,
    reasons: [
      'Неправильно указан адрес страницы',
      'Страница раньше существовала, но теперь удалена',
      'Адрес страницы изменился',
      'Техническая ошибка'
    ],
    countdownID: 0
  }),
  methods: {
    countdown () {
      return setInterval(() => {
        this.backToHomeTimeCount -= 1
      }, 1000)
    }
  },
  watch: {
    backToHomeTimeCount: function (value, oldValue) {
      if (value === 0) {
        this.$router.push('/')
        this.$toast.open({
          message: 'Вы были автоматически возвращены на главную',
          type: 'info'
        })
      }
    }
  },
  mounted () {
    this.countdownID = this.countdown()
  },
  beforeDestroy () {
    clearInterval(this.countdownID)
  }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  width: 100%;
  max-width: 100%;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    font-size: 3rem;
  }

  .image {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: 25px;

    img {
      width: 50%;
    }
  }

  .reasons {
    margin-top: 25px;

    &__title {
      font-size: 1.5rem;
    }

    &__list {
      list-style-type: lower-greek;
    }
  }

  .to-home, .reasons .reasons__title {
    text-align: center;
  }
}
</style>
