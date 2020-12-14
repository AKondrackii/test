import store from '@/store/index'

/**
 * If user not authed, he go to home
 * @param {function} next - Next function from router
 */
async function isAuthed (next) {
  if (!await store.dispatch('getUid')) {
    next({
      path: '/account/login',
      replace: true
    })
  } else {
    next()
  }
}

export default isAuthed
