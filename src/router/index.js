// Main imports
import Vue from 'vue'
import VueRouter from 'vue-router'

// Page imports
import Index from '@/views/Index.vue'
import Auth from '@/views/Auth.vue'
import PageNotFound from '@/views/PageNotFound.vue'

// Middlewares import
import isAuthed from '../middlewares/isAuthed'

// Setup router to app
Vue.use(VueRouter)

// Router paths
const routes = [
  // on root page display home page
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/projects',
    name: 'AllProjects',
    component: () => import('@/views/Projects/Home.vue')
  },
  {
    path: '/project',
    beforeEnter: (to, from, next) => next({
      path: '/projects',
      replace: true
    })
  },
  {
    path: '/project/:slug',
    name: 'OnceProject',
    component: () => import('../views/Projects/Once.vue'),
    meta: {
      layout: 'empty'
    }
  },
  {
    path: '/projects/add',
    name: 'AddProject',
    component: () => import('@/views/Projects/Add.vue'),
    beforeEnter: (to, from, next) => isAuthed(next),
    meta: {
      layout: 'form'
    }
  },
  // on '/account' display account page
  {
    path: '/account',
    name: 'AccountHome',
    // This lazy loading component (page)
    component: () => import('@/views/Account/Home.vue'),
    // Route guardia, redirect not authed user to login page
    beforeEnter: (to, from, next) => isAuthed(next),
    meta: {
      // Set account latout to this page
      layout: 'account',
      title: 'Главная'
    }
  },
  {
    path: '/account/projects',
    name: 'AccountProjects',
    component: () => import('@/views/Account/Projects.vue'),
    beforeEnter: (to, from, next) => isAuthed(next),
    meta: {
      // Set account latout to this page
      layout: 'account',
      title: 'Проекты'
    }
  },
  // on '/account/login' display account auth (login) page
  {
    path: '/account/login',
    name: 'Login',
    component: Auth,
    meta: {
      // Since the component is the same on two paths, we indicate its role
      role: 'login',
      // Set empty latout to this page
      layout: 'form',
      layoutBackgroundColor: '#00e676'
    }
  },
  // on '/account/login' display account auth (registration) page
  {
    path: '/account/registration',
    name: 'Registration',
    component: Auth,
    meta: {
      // Since the component is the same on two paths, we indicate its role
      role: 'logup',
      // Set empty latout to this page
      layout: 'form',
      layoutBackgroundColor: '#c6ff00'
    }
  },
  {
    path: '**',
    name: 'PageNotFound',
    component: PageNotFound,
    meta: {
      layout: 'empty'
    }
  }
]

// Create router
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Export router to app
export default router
