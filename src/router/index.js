import Vue from 'vue'
import Router from 'vue-router'
import Click_list from '@/components/Click_list'
import Views_list from '@/components/Views_list'
import Like_list from '@/components/Like_list'
import Self_message from '@/components/Self_message'
import test from '@/components/test'
import Dynamic_release from '@/components/Dynamic_release'
import login from '@/components/Login'
import Index from '@/components/Index'
import Personal_center from '@/components/Personal_center'
import Dynamic_details from '@/components/Dynamic_details'
import Register_updatepwd from '@/components/Register_updatepwd'
import Banner from '@/components/common/Banner'
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {//用来消除router.push的报错信息
return originalPush.call(this, location).catch(err => err)
}
export default new Router({
    mode:'history',//去除地址的#号
    routes: [
      {
        path:'/',
        name:'默认路由跳转',
        redirect:'/index',//默认跳转index首页
        
      },
      {
        path:'/common',
        name:'网页顶部导航',
        component: Banner,
        children:[
          {
            path:'/index',
            name:'首页',
            component: Index,
          },
          {
            path:'/dynamic_details',
            name:'动态详情页',
            component: Dynamic_details,
            // meta:{
            //   keepAlive:true,
            // }
          },
          {
            path:'/personal_center',//加/则不需要输入父组件地址即可访问，没加/则需要输入父组件地址才可访问
            name:'个人中心',
            component: Personal_center,
            children:[
              {
                  path:'self_message',
                  component: Self_message,
              },
              {
                path: 'views_histroy',
                component: Views_list,
              },
              {
                path:'click_list',
                component: Click_list,
              },
              {
                path:'dynamic_release',
                component: Dynamic_release,
              },
              {
                path:'like_list',
                component: Like_list,
              },
            ]  
          },
          
        ]
      },
      
      {
        path:'/register',
        component: Register_updatepwd,
      },
      {
        path:'/test',
        component: test,
      },
      
      {
        path:'/login',
        component: login,
      },
    ]
  })
