// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './Apps'
// import Hellowrod from './components/Hellowrod'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
// import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

// Vue.use( Editor, Toolbar)
// Vue.prototype.$http = axios// =号的两边必须隔开,通过注释掉build/webpack.base.conf.js文件的createLintingRule方法里的内容即可取消esint规范检查

Vue.prototype.$axios = axios//全局引入axios,通过this.$axios,(Vue.prototype后面跟的什么就用this.来使用)
Vue.use(ElementUI)
Vue.config.productionTip = false
// axios.defaults.headers.common['access_token'] = window.localStorage.getItem('access_token')//从session中读取token设置全局token
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
// router.afterEach((to,from,next) => {//控制始终显示在页面顶部
//   window.scrollTo(0,0);
// })
router.beforeEach(function(to, from, next) {
  if (to.meta.requireauth) {
    //页面是否登录
    if (localStorage.getItem("access_token")) {
      //本地存储中是否有token(uid)数据
      next(); //表示已经登录
    } else {
      //next可以传递一个路由对象作为参数 表示需要跳转到的页面
      next({
        path: "/index"
    });
    }
  } 
  else {
  //表示不需要登录
    next(); //继续往后走
  }
  });

    

