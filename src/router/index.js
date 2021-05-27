import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/index'
import PersonManage from '@/pages/person-manage/index'
import Crane from '@/pages/crane/index';
import Camera from '@/pages/camera/index';
import Dust from '@/pages/dust';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/static',
      name: 'home',
      component: Home
    },
    {
      path: '/demo',
      name: 'person-manage',
      component: PersonManage
    },
    {
      path: '/crane',
      name: 'crane',
      component: Crane
    },
    {
      path: '/camera',
      name: 'camera',
      component: Camera
    },
    {
      path: '/dust',
      name: 'dust',
      component: Dust
    },
  ]
})
