// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './Apps'
// import Hellowrod from './components/Hellowrod'
import router from './router'
import axios from 'axios'
// Vue.prototype.$http = axios// =号的两边必须隔开,通过注释掉build/webpack.base.conf.js文件的createLintingRule方法里的内容即可取消esint规范检查
// Vue.use(axios)

Vue.config.productionTip = false
axios.defaults.headers.common['access_token'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTY2ODMzMTYsImlhdCI6MTY1NDA5MTMxNiwiaXNzIjoia3hwIiwiZGF0YSI6eyJ1c2VyaWQiOjd9fQ.h3tUd6hoGoXy0KBklQ8lTRu4EwvzFEQW6VejNIOPHXw';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
