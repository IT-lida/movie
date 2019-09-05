import Vue from 'vue'
import Router from 'vue-router'
import moiveRouter from './movie'
import cinemaRouter from './cinema'
import mineRouter from './mine'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    moiveRouter,
    cinemaRouter,
    mineRouter,
    {path : '/*',redirect: '/movie'}
  ]
})
