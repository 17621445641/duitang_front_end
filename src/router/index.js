import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Click_list from '@/components/Click_list'
import Views_list from '@/components/Views_list'
import Like_list from '@/components/Like_list'
import Self_message from '@/components/Self_message'
import test from '@/components/test'
Vue.use(Router)
export default new Router({
    routes: [
      {
        path: '/views',
        component: Views_list,
        // meta:{
        //   keepAlive:true,
        // }
      },
      {
        path:'/like',
        component: Like_list,
        // meta:{
        //   keepAlive:true,
        // }
      },
      {
        path:'/click',
        component: Click_list,
        // meta:{
        //   keepAlive:true,
        // }
      },
      {
        path:'/self_message',
        component: Self_message,
        // meta:{
        //   keepAlive:true,
        // }
      },
      {
        path:'/test',
        component: test,
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
