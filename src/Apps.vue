<template>
  <div id="app" >
    <!-- <img src="./assets/logo.png"> -->
    <div id="all">
        <div id="user_background" >
            <div id="background_image"><img src="./assets/无标题.png" alt=""></div>
            <div id="avatar_image" ><img v-bind:src="message_list.avatar_image_url" alt=""></div>
            <div id="user_name" >{{message_list.user_name}}</div>
            <div id="follow_fans"><span style="padding-right:5px">关注</span><span>{{message_list.follow_count}}</span><span class="split_symbol">|</span><span style="padding-right:5px">粉丝</span><span>{{message_list.fans_count}}</span></div>
            <div id="self_descrip" >简介：<span v-if="message_list.self_description!=null">{{message_list.self_description}}</span><span v-else>暂无简介</span></div>
        </div>
        <div id="message_navigation">
          <div id="navigation_list">
            <div><img src="./assets/self_setting.png">个人中心</div>
            <div><img src="./assets/dynamic.png">我的动态</div>
            <div><img src="./assets/article.png">我的文章</div>
            <router-link to="/click" ><div v-on:click="click_history"><img src="./assets/click.png" >我的点赞</div></router-link>
            <router-link to="/like"><div><img src="./assets/like.png">我的喜欢</div></router-link>
            <router-link to="/views"><div><img src="./assets/views.png">浏览记录</div></router-link>
          </div>
          <div id="message_content">
            <router-view></router-view>
          </div>
        </div>
        <!-- <br/>
        <br/> -->
        <input type="button" value="获取数据" v-on:click="send"> 
        <div id="model_list">
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  data () {
    return {
      message_list:{},
      click_list:{}
    }
  },
  methods: {
    send(){
      axios.get('/api/userinfo',{
        })
        .then(resp => {
            var that=this;
            that.message_list=resp.data.data;
            // console.log(that.message_list);
        }).catch(err => { //
            console.log('请求失败：'+ err.code + ',' + err.message);
        });
    },
    click_history(){
      axios.get('/api/click_list',{
        })
        .then(resp => {
            var that=this;
            that.click_list=resp.data.data;
            console.log(that.message_list);
        }).catch(err => { //
            console.log('请求失败：'+ err.code + ',' + err.message);
        });
    }
  }
}
</script>

<style>
@import url('./css/index.css');
</style>
