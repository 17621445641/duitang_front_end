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
// Vue.use(axios)
Vue.use(ElementUI)
Vue.config.productionTip = false
// axios.defaults.headers.common['access_token'] = window.sessionStorage.getItem('access_token')//从session中读取token设置全局token
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
