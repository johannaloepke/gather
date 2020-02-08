import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from './views/LandingPage.vue'
import UserRegistrationPage from './views/UserRegistrationPage.vue'
<<<<<<< HEAD
import AddRequestsPage from './views/AddRequestsPage.vue'
=======
import EventPage from './views/EventPage.vue'
>>>>>>> 0cfbf34d3bb606c7cbc1ba73f0a1ed257e168b58
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
<<<<<<< HEAD
      path: '/add-requests', // this is the user registration page
      name: 'addRequests',
      component: AddRequestsPage // this is the view rendered when visiting this path
=======
      path: '/event/:id', // this is an event page
      name: 'event',
      component: EventPage, // this is the view rendered when visiting this path
      props: true
>>>>>>> 0cfbf34d3bb606c7cbc1ba73f0a1ed257e168b58
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
