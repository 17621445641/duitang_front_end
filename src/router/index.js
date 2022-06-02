import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Click_list from '@/components/Click_list'
import Views_list from '@/components/Views_list'
import Like_list from '@/components/Like_list'

Vue.use(Router)
export default new Router({
    routes: [
      {
        path: '/views',
        component: Views_list
      },
      {
        path:'/like',
        component: Like_list
      },
      {
        path:'/click',
        component: Click_list
      }
    ]
  })
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })
