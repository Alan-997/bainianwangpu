import Vue from 'vue'
import Router from 'vue-router'
import { NavBar } from 'vant';
import { Icon } from 'vant';
import { Field } from 'vant';

Vue.use(Field);

Vue.use(Icon);

Vue.use(NavBar);
Vue.use(Router)
export const constantRoutes = [
  {
    path: '/',
    meta:{index:0,keepAlive: true},
    component: () => import('@/views/home/index'),
  },

  {
    path: '/findShop',
    meta:{index:0,keepAlive: true},
    component: () => import('@/views/findShop/index'),
  },
  {
    path: '/businessCircle',
    meta:{index:0,keepAlive: true},
    component: () => import('@/views/businessCircle/index'),
  },
  {
    path: '/restaurantFood',
    meta:{index:0,keepAlive: true},
    component: () => import('@/views/restaurantFood/index'),
  },
  {
    path: '/carService',
    meta:{index:0,keepAlive: true},
    component: () => import('@/views/carService/index'),
  },
  {
    path: '/clothing',
    meta:{index:0,keepAlive: true},
    component: () => import('@/views/clothing/index'),
  },
  {
    path: '/common',
    meta:{index:0,keepAlive: false},
    component: () => import('@/views/common/index'),
  },
  {
    path: '/exam',
    meta:{index:0,keepAlive: true},
    component: () => import('@/views/exam/index'),
  },
  {
    path: '/personCenter',
    meta:{index:0},
    component: () => import('@/views/personCenter/index'),
  },
  {
    path: '/publish',
    meta:{index:0},
    component: () => import('@/views/publish/index'),
  },
  {
    path: '/publishsell',
    meta:{index:0},
    component: () => import('@/views/publishsell/index'),
  },
  {
    path: '/publishwanted',
    meta:{index:0},
    component: () => import('@/views/publishwanted/index'),
  },
  {
    path: '/agreement',
    meta:{index:1},
    component: () => import('@/views/agreement/index'),
  },
  {
    path: '/question',
    meta:{index:1},
    component: () => import('@/views/question/index'),
  },
  {
    path: '/updatePassword',
    meta:{index:1},
    component: () => import('@/views/updatePassword/index'),
  },
  {
    path: '/publishInfo',
    meta:{index:1},
    component: () => import('@/views/publishinfo/index'),
  },

  {
    path: '/transferInfo',
    meta:{index:1},
    component: () => import('@/views/transferInfo/index'),
  },{
    path: '/addr',
    meta:{index:1},
    component: () => import('@/views/addr/index'),
  },{
    path: '/rentoutInfo',
    meta:{index:1},
    component: () => import('@/views/rentoutInfo/index'),
  },{
    path: '/sellInfo',
    meta:{index:1},
    component: () => import('@/views/sellInfo/index'),
  },{
    path: '/wantInfo',
    meta:{index:1},
    component: () => import('@/views/wantInfo/index'),
  },
  {
    path: '/outrent',
    meta:{index:0,keepAlive: true},
    component: () => import('@/views/outrent/index'),
  },
  {
    path: '/bsInfo',
    meta:{index:1},
    component: () => import('@/views/busnes/index'),
  },
  {
    path: '/adVideo',
    meta:{index:1},
    component: () => import('@/views/adVideo/index'),
  },
  {
    path: '/sell',
    meta:{index:0,keepAlive: true},
    component: () => import('@/views/sell/index'),
  },
  {
    path: '/want',
    meta:{index:0,keepAlive: true},
    component: () => import('@/views/want/index'),
  },
  {
    path: '/info',
    meta:{index:0},
    component: () => import('@/views/info/index'),
  },

  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/merchandise',
    meta:{index:1},
    name: 'merchandise',
    component: () => import('@/views/merchandise/index')
  },
  {
    path: '/hotel',
    meta:{index:1},
    name: 'hotel',
    component: () => import('@/views/hotel/index')
  },
  {
    path: '/hotelInfo',
    meta:{index:1},
    name: 'hotelInfo',
    component: () => import('@/views/hotelInfo/index')
  },

  // 新增路由
  {
    path: '/oldFood',
    meta:{index:1},
    name: 'oldFood',
    component: () => import('@/views/oldFood/index')
  },
  {
    path: '/specialty',
    meta:{index:1},
    name: 'specialty',
    component: () => import('@/views/specialty/index')
  },
  {
    path: '/recruitment',
    meta:{index:1},
    name: 'recruitment',
    component: () => import('@/views/recruitment/index')
  },
  {
    path: '/forceHelp',
    meta:{index:1},
    name: 'forceHelp',
    component: () => import('@/views/forceHelp/index')
  },
  {
    path: '/farmProducts',
    meta:{index:1},
    name: 'farmProducts',
    component: () => import('@/views/farmProducts/index')
  },
  {
    path: '/businessCircleRelease',
    meta:{index:1},
    name: 'businessCircleRelease',
    component: () => import('@/views/businessCircleRelease/index')
  },
  {
    path: '/businessCircleInfo',
    meta:{index:1},
    name: 'businessCircleInfo',
    component: () => import('@/views/businessCircleInfo/index')
  },
  {
    path: '/collectionInfo',
    meta:{index:1},
    name: 'collectionInfo',
    component: () => import('@/views/collectionInfo/index')
  }

]

const createRouter = () => new Router({
  // mode: 'history', // require service support

  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
