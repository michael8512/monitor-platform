import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/index'
import PersonManage from '@/pages/person-manage/index'
import Crane from '@/pages/crane/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/person',
      name: 'person-manage',
      component: PersonManage
    },
    {
      path: '/crane',
      name: 'crane',
      component: Crane
    },
  ]
})
