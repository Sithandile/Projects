import Vue from 'vue'
import Router from 'vue-router'
import UserLocation from '@/pages/UserLocation'
import List from '@/components/List'


Vue.use(Router)

export default new Router({
  routes: [
    {
    path: '/',
    component: UserLocation
  },
  {
    path: '/',
    name: 'grocery-list',
    component: List
  }]
})
