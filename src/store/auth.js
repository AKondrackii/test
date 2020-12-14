// Firebase import
import firebase from 'firebase/app'

// Store module
export default {
  actions: {
    // Login function
    async login ({ dispatch, commit }, { email, password }) {
      try {
        // Login process
        await firebase.auth().signInWithEmailAndPassword(email, password)
        // Getting user data from database
        await dispatch('fetchInfo')
      } catch (e) {
        // On error push error to global storage
        commit('SET_ERROR', e.message)
        throw e
      }
    },
    // Registration function
    async register ({ dispatch, commit }, { email, password, firstname, lastname }) {
      try {
        // Registration process
        await firebase.auth().createUserWithEmailAndPassword(email, password)

        // Function getting a unique identifier from authed user (if exist, else return null value)
        const uid = await dispatch('getUid')
        // Creating user document with person data in database
        await firebase.firestore().collection('users').doc(uid).set({
          email,
          firstname,
          lastname,
          photo: null,
          registered: firebase.firestore.FieldValue.serverTimestamp(),
          role: 'default'
        })

        await dispatch('fetchInfo')
      } catch (e) {
        // On error push error to global storage
        commit('SET_ERROR', e.message)
        throw e
      }
    },
    // Function getting a unique identifier from authed user (if exist, else return null value)
    getUid () {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    // Function logout (clear session)
    async logout ({ commit }) {
      // Logout
      await firebase.auth().signOut()
      // Clear info about user
      commit('CLEAR_INFO')
    }
  }
}
