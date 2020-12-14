// Main imports
import Vue from 'vue'
import Vuex from 'vuex'

// Modules imports
import auth from './auth'
import info from './info'

// Setup store to app
Vue.use(Vuex)

// Store
export default new Vuex.Store({
  state: {
    layout: 'default-layout',
    error: null
  },
  mutations: {
    // Set layout template for page
    SET_LAYOUT (state, payload) {
      state.layout = payload
    },
    // Set error
    SET_ERROR (state, error) {
      state.error = error
    },
    // Clear error
    CLEAR_ERROR (state) {
      state.error = null
    }
  },
  actions: {
  },
  getters: {
    // Function return current selected layout
    layout: s => s.layout,
    // Function return error or errors
    error: s => s.error
  },
  modules: {
    // Auth module (auth.js)
    auth,
    // Info store module (info.js)
    info
  }
})
