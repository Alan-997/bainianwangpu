// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Button,Toast,Row, Col,Icon,Tabbar,TabbarItem } from 'vant';
import Vuerify from 'vuerify'
import echarts from 'echarts'
import CommFooter from './components/CommFooter';
import Popup from './components/popup/popup'
import store from './store'
import VueTouch from 'vue-touch'
// import BaiduMap from 'vue-baidu-map'

Vue.use(VueTouch, {name: 'v-touch'})
Vue.prototype.$popup = Popup.install
Vue.use(Button).use(Toast).use(Row).use(Col).use(Icon).use(Tabbar).use(TabbarItem);
Vue.use(Vuerify)
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;
Vue.use(CommFooter);
// Vue.use(BaiduMap, {
//   ak: 'zfQkSoRQR4HMoe1dFTFKjsUS8Pk5IBxV'  //这个地方是官方提供的ak密钥
// })
import './styles/comm.scss'
import 'swiper/dist/css/swiper.css'
import './permission'
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

