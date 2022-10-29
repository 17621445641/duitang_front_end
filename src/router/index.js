import Vue from 'vue'
import Router from 'vue-router'
import Collect_list from '@/components/Collect_list'
import Views_list from '@/components/Views_list'
import Like_list from '@/components/Like_list'
import Self_message from '@/components/Self_message'
import test from '@/components/test'
import Dynamic_list from '@/components/Dynamic_list'
import login from '@/components/Login'
import Index from '@/components/Index'
import Personal_center from '@/components/Personal_center'
import Dynamic_details from '@/components/Dynamic_details'
import Register_updatepwd from '@/components/Register_updatepwd'
import Banner from '@/components/common/Banner'
import concerns from '@/components/Concerns'
import fans from '@/components/Fans'
import homepage from '@/components/Homepage'
import Author_dynamic from '@/components/Author_dynamic'

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
            path:'/homepage',
            name:'用户主页',
            component: homepage,
            children:[
              {
                  path:'author_dynamic',
                  name:'个人中心',
                  component: Author_dynamic
              }]
          },
          {
            path:'/personal_center',//加/则不需要输入父组件地址即可访问，没加/则需要输入父组件地址才可访问
            name:'个人中心',
            component: Personal_center,
            meta: {
              requireauth: true //需要登录校检判断的路由
            },
            children:[
              {
                  path:'self_message',
                  name:'个人中心',
                  component: Self_message,
                  meta: {
                    requireauth: true //需要登录校检判断的路由
                  },
              },
              {
                path:'concerns',
                name:'关注列表',
                component: concerns,
                meta: {
                  requireauth: true //需要登录校检判断的路由
                },
              },
              {
                path:'fans',
                name:'粉丝列表',
                component: fans,
                meta: {
                  requireauth: true //需要登录校检判断的路由
                },
              },
              {
                path: 'views_histroy',
                name:'浏览记录',
                component: Views_list,
                meta: {
                  requireauth: true //需要登录校检判断的路由
                },
              },
              {
                path:'collect_list',
                name:'收藏列表',
                component: Collect_list,
                meta: {
                  requireauth: true //需要登录校检判断的路由
                },
              },
              {
                path:'dynamic_list',
                name:'我的发布',
                component: Dynamic_list,
                meta: {
                  requireauth: true //需要登录校检判断的路由
                },
              },
              {
                path:'like_list',
                name:'喜欢列表',
                component: Like_list,
                meta: {
                  requireauth: true //需要登录校检判断的路由
                },
              },
            ]  
          },
          
        ]
      },
      
      {
        path:'/register',
        name:'注册页面',
        component: Register_updatepwd,
      },
      {
        path:'/test',
        component: test,
      },
      
      {
        path:'/login',
        name:'登录页面',
        component: login,
      },
      
      
    ]
  })
