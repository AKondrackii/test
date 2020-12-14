<template>
  <fragment>
    <b-form @submit.stop.prevent="isLogin ? signin() : signup()" class="auth-form">
      <b-form-group id="text-group">
        <div class="status">
          <h1 class="status__title">{{ isLogin ? 'Вход' : 'Регистрация' }}</h1>
          <p class="status__text">
            Перейти к <router-link :to="`/account/${isLogin ? 'registration' : 'login' }`" class="status__link">{{ isLogin ? 'регистрации' : 'входу' }}</router-link>
          </p>
        </div>
      </b-form-group>

      <b-form-group
        id="email-input-group"
        label="E-Mail:"
        label-for="email-input"
      >
        <b-form-input
          id="email-input"
          v-model="form.email"
          type="text"
          name="email-input"
          placeholder="Введите E-Mail"
          v-validate="{ required: true, email: true }"
          data-vv-as="email"
          :state="validateState('email-input')"
          aria-describedby="email-input-feedback"
        ></b-form-input>
        <b-form-invalid-feedback id="email-input-feedback">
          {{ veeErrors.first('email-input') }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-row v-if="!isLogin">
        <b-col>
          <b-form-group
            id="firstname-input-group"
            label="Имя:"
            label-for="firstname-input"
          >
            <b-form-input
              id="firstname-input"
              v-model="form.firstname"
              type="text"
              placeholder="Введите имя"
              name="firstname-input"
              v-validate="{ required: true, min: 2 }"
              data-vv-as="имя"
              :state="validateState('firstname-input')"
              aria-describedby="firstname-input-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="firstname-input-feedback">
              {{ veeErrors.first('firstname-input') }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="lastname-input-group"
            label="Фамилия:"
            label-for="lastname-input"
          >
            <b-form-input
              id="lastname-input"
              v-model="form.lastname"
              type="text"
              placeholder="Введите фамилию"
              name="lastname-input"
              v-validate="{ required: true, min: 3 }"
              data-vv-as="фамилия"
              :state="validateState('lastname-input')"
              aria-describedby="lastname-input-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="lastname-input-feedback">
              {{ veeErrors.first('lastname-input') }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>

      <b-form-group id="password-input-group" label="Пароль:" label-for="password-input">
        <b-form-input
          id="password-input"
          v-model="form.password"
          name="password-input"
          ref="password-input"
          type="password"
          placeholder="Введите пароль"
          v-validate="{ required: true, min: 5, max: 30 }"
          data-vv-as="пароль"
          :state="validateState('password-input')"
          aria-describedby="password-input-feedback"
        ></b-form-input>
        <b-form-invalid-feedback id="password-input-feedback">
          {{ veeErrors.first('password-input') }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="repeat-password-input-group" v-if="!isLogin" label="Повторный пароль:" label-for="repeat-password-input">
        <b-form-input
          id="repeat-password-input"
          v-model="form.repeatPassword"
          type="password"
          placeholder="Введите пароль еще раз"
          name="repeat-password-input"
          v-validate="{ required: true, min: 5, max: 30, confirmed: 'password-input' }"
          data-vv-as="повторный пароль"
          :state="validateState('repeat-password-input')"
          aria-describedby="repeat-password-input-feedback"
        ></b-form-input>
        <b-form-invalid-feedback id="repeat-password-input-feedback">
          {{ veeErrors.first('repeat-password-input') }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="agree-checkbox-group" v-if="!isLogin">
        <b-form-checkbox
          id="agree-checkbox"
          :value="true"
          v-model="form.agree"
          name="agree-checkbox"
          :state="this.form.agree"
        >
          Я согласен/согласна на обработку моих персональных данных
        </b-form-checkbox>
      </b-form-group>

      <b-button block type="submit" variant="outline-success">
        {{ isLogin ? 'Войти' : 'Зарегистрироваться' }}
      </b-button>
    </b-form>
  </fragment>
</template>

<script>
export default {
  name: 'AuthPage',
  metaInfo: {
    title: 'Авторизация'
  },
  data: () => ({
    form: {
      email: '',
      password: '',
      repeatPassword: '',
      firstname: '',
      lastname: '',
      agree: false
    }
  }),
  computed: {
    isLogin () {
      return this.$route.meta.role === 'login'
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
    signin () {
      const formData = {
        email: this.form.email,
        password: this.form.password
      }

      this.$validator.validateAll().then(async (result) => {
        if (!result) return

        try {
          await this.$store.dispatch('login', formData)
          this.$router.push('/')
          this.$toast.open({
            message: 'Вы успешно вошли в учетную запись!',
            type: 'success'
          })
        } catch (err) {
          console.error(err)
          throw err
        }
      })
    },
    signup () {
      const formData = {
        email: this.form.email,
        password: this.form.password,
        firstname: this.form.firstname,
        lastname: this.form.lastname
      }

      this.$validator.validateAll().then(async (result) => {
        if (!result) return

        if (this.form.agree) {
          try {
            await this.$store.dispatch('register', formData)
            this.$router.push('/')
            this.$toast.open({
              message: 'Вы успешно зарегистрировались!',
              type: 'success'
            })
          } catch (err) {
            console.error(err)
            throw err
          }
        } else {

        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.status {
  &__title {
    text-transform: uppercase;
  }

  &__text, &__title {
    text-align: center;
  }
}
</style>
