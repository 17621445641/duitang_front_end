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
axios.defaults.headers.common['access_token'] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTY3MjY0OTgsImlhdCI6MTY1NDEzNDQ5OCwiaXNzIjoia3hwIiwiZGF0YSI6eyJ1c2VyaWQiOjF9fQ.PH3FndpDOuOCbmPq-cRFRtg_3HwPc6j7LOXCze9VH-A";
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
