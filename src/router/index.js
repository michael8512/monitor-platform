import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/index'
import PersonManage from '@/pages/person-manage/index'
import Crane from '@/pages/crane/index';
import Camera from '@/pages/camera/index';
import Lift from '@/pages/lift/index';
import Dischange from '@/pages/dischange/index';
import Dust from '@/pages/dust';
import OnDuty from '@/pages/onDuty';
import Safety from '@/pages/safety/index';
import Car from '@/pages/car/index';
import Foundation from '@/pages/foundation/index';
import Notify from '@/pages/notify/index';
import Model from '@/pages/model/index';
import Education from '@/pages/education/index';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
    }, {
      path: '/lift',
      name: 'lift',
      component: Lift
    },
    {
      path: '/dischange',
      name: 'dischange',
      component: Dischange
    },
    {
      path: '/dust',
      name: 'dust',
      component: Dust
    },
    {
      path: '/working',
      name: 'working',
      component: OnDuty
    },
    {
      path: '/safety',
      name: 'safety',
      component: Safety
    },
    {
      path: '/car',
      name: 'car',
      component: Car
    },
    {
      path: '/foundation',
      name: 'foundation',
      component: Foundation
    },
    {
      path: '/notify',
      name: 'notify',
      component: Notify
    },
    {
      path: '/model',
      name: 'model',
      component: Model
    },
    {
      path: '/education',
      name: 'education',
      component: Education
    },
  ]
})
