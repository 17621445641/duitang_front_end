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
axios.defaults.headers.common['access_token'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTY0NjU0NTMsImlhdCI6MTY1Mzg3MzQ1MywiaXNzIjoia3hwIiwiZGF0YSI6eyJ1c2VyaWQiOjN9fQ.h5X8irDXIegu3vuJg4ImKh7acwqkTmc-Big13QeKNls';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
