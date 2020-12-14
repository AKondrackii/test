// Firebase import
import firebase from 'firebase/app'

// Store module
export default {
  state: {
    info: {}
  },
  mutations: {
    // Function setting information about user
    SET_INFO (state, info) {
      state.info = info
    },
    // Function clear all information about user (local, not DB)
    CLEAR_INFO (state) {
      state.info = {}
    }
  },
  actions: {
    // Function getting information about user from database
    async fetchInfo ({ dispatch, commit }) {
      try {
        // Getting a unique identifier
        const uid = await dispatch('getUid')

        if (uid) {
          // Getting document from database
          const infoDocument = await firebase
            .firestore()
            .collection('users')
            .doc(uid)
            .get()

          // Setting info to global storage
          commit('SET_INFO', infoDocument.data())
        }
      } catch (e) {
        // If an error appears, debug error on console
        console.error(e)
      }
    }
  },
  getters: {
    // Function return info about user from storage
    info: s => s.info
  }
}
