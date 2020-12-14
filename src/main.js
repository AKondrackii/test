// Main imports
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// Firebase imports
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// Layouts imports
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import EmptyLayout from '@/layouts/EmptyLayout.vue'
import AccountLayout from '@/layouts/AccountLayout.vue'
import FormLayout from '@/layouts/FormLayout.vue'

// Other plugins JS imports
import VueMeta from 'vue-meta'
import Fragment from 'vue-fragment'
import {
  BootstrapVue,
  IconsPlugin,
  BootstrapVueIcons
} from 'bootstrap-vue'
import VueToast from 'vue-toast-notification'
import VeeValidate, { Validator } from 'vee-validate'
import dateFormat from 'dateformat'

// Other plugins CSS imports
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-toast-notification/dist/theme-default.css'

// Plugins localizations imports
import ru from 'vee-validate/dist/locale/ru'

// Errors and tips messages on production
Vue.config.productionTip = false

// Setup layouts to app
Vue.component('default-layout', DefaultLayout)
Vue.component('empty-layout', EmptyLayout)
Vue.component('account-layout', AccountLayout)
Vue.component('form-layout', FormLayout)

// Setup plugins to app
Vue.use(Fragment.Plugin)
Vue.use(VueMeta)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(BootstrapVueIcons)
Vue.use(VueToast)
Vue.use(VeeValidate, {
  // This is the default
  inject: true,
  // Important to name this something other than 'fields'
  fieldsBagName: 'veeFields',
  // This is not required but avoids possible naming conflicts
  errorBagName: 'veeErrors'
})
Validator.localize('ru', ru)
Validator.extend(
  'extension',
  {
    getMessage: (field) => 'Расширение файла обязательно должно быть разрешенным',
    validate: (value, [allowable]) => {
      const fileType = value.type.split('/')[1]
      return {
        valid: fileType === allowable
      }
    }
  }
)

// Custom vue filters
Vue.filter('date', function (value, formatStyle = 'dd.mm.yyyy') {
  value = new Date(value * 1000)
  return dateFormat(
    value,
    formatStyle
  )
})

Vue.filter('capitalize', function (value, lower = false) {
  return (lower ? value.toLowerCase() : value)
    .replace(
      /(?:^|\s|["'([{])+\S/g,
      match => match.toUpperCase()
    )
})

Vue.filter('trimWords', function (value, max = 100) {
  const trimmedText = value
    .trim()
    .slice(0, max - 3)
  return `${trimmedText}...`
})

// Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyA81URRm3oU4NjvlsLxHnryctwgPLxUFSM',
  authDomain: 'peremenka-net.firebaseapp.com',
  databaseURL: 'https://peremenka-net.firebaseio.com',
  projectId: 'peremenka-net',
  storageBucket: 'peremenka-net.appspot.com',
  messagingSenderId: '118500038734',
  appId: '1:118500038734:web:421600ac29681d2da5cb1f'
}

let app

// Firebase initialization
firebase.initializeApp(firebaseConfig)

// Run app with firebase
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
