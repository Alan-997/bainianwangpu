import router from './router'
import store from './store'
import {
  Message
} from 'element-ui'
import {
  getToken
} from '@/utils/auth' // 验权


const whiteList = ['/info'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  if (whiteList.indexOf(to.path) !== -1) {
    if (getToken()) {
      store.dispatch('GetInfo').then(res => { // 拉取用户信息
        next()
      }).catch((err) => {
        store.dispatch('FedLogOut').then(() => {
          Message.error(err || 'Verification failed, please login again')
          next({
            path: '/'
          })
        })
      })
    } else {
      Message.error('请登录！')
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    }
  } else {
    next()
  }
})

router.afterEach(() => {
})
