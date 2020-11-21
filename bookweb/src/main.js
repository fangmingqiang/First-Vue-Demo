import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// import NavView from '@/views/NavView'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.withCredentials = true

Vue.use(Antd)
// Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.loginRequest) {
    if (localStorage.getItem('accessToken')) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath // 把要跳转的页面路径作为参数传到登陆界面
        }
      })
    }
  } else {
    next()
  }
})
