import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from './views/LandingPage.vue'
import UserRegistrationPage from './views/UserRegistrationPage.vue'
import AddRequestsPage from './views/AddRequestsPage.vue'
import NotFound from './views/NotFound.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL, 
  routes: [
    {
      path: '/', // this is the default 'home' page
      name: 'home',
      component: LandingPage // this is the view rendered when visiting this path
    },
    {
      path: '/register', // this is the user registration page
      name: 'userReg',
      component: UserRegistrationPage // this is the view rendered when visiting this path
    },
    {
      path: '/add-requests', // this is the user registration page
      name: 'addRequests',
      component: AddRequestsPage // this is the view rendered when visiting this path
    },
    // {
    //   path: '/otherpage',
    //   name: 'otherpage',
    //   component: OtherPage
    // },
    { 
      path: '*', 
      component: NotFound
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})
