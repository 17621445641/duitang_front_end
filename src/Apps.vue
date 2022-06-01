<template>
  <div id="app" >
    <!-- <img src="./assets/logo.png"> -->
    <div id="all">
        <div id="user_background" >
            <div id="background_image"><img src="./assets/无标题.png" alt=""></div>
            <div id="avatar_image" ><img v-bind:src="message_list.avatar_image_url" alt=""></div>
            <div id="user_name" >{{message_list.user_name}}</div>
            <div id="follow_fans"><span style="padding-right:10px">关注</span><span>5</span><span class="split_symbol">|</span><span style="padding-right:10px">粉丝</span><span>0</span></div>
        </div>
        <input type="button" value="获取数据" v-on:click="send"> 
        <div id="model_list">

        </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  data () {
    // message_list:{}
    // console.log(message_list)
    // return message_list
    // ()必须跟data和{隔开
    return {// 都必须隔开，注释也要隔开
      message_list:{}
    //   // follow_count: 5
    //   // 冒号必须和返回的数据隔开
    }
  },
  methods: {
    send(){
      axios.get('/api/userinfo',{
        // params:{
        //     name:'alice',
        //     age:19
        // },
        // Headers:{
        //   "access_token":'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTY0NjU0NTMsImlhdCI6MTY1Mzg3MzQ1MywiaXNzIjoia3hwIiwiZGF0YSI6eyJ1c2VyaWQiOjN9fQ.h5X8irDXIegu3vuJg4ImKh7acwqkTmc-Big13QeKNls'
        // }
        })
        .then(resp => {
            var that=this;
            that.message_list=resp.data.data;
            // console.log(that.message_list);
        }).catch(err => { //
            console.log('请求失败：'+ err.code + ',' + err.message);
        });
    // searchUsers(){

    // }
    }
  }
}
</script>

<style>
@import url('./css/index.css');
</style>
