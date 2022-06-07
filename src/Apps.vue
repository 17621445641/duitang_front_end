<template>
  <div id="app" >
    <!-- <img src="./assets/logo.png"> -->
    <div id="all">
        <div id="user_background" >
            <div id="background_image"><img src="./assets/无标题.png" alt=""></div>
            <div id="avatar_image"  @mouseenter="overShow($event)" @mouseleave="outHide($event)" @click="update_avatar">
              <img class="big_avatar" v-bind:src="message_list.avatar_image_url" alt="" >
              <div class="mask" >
              <img style="width: 25px;height: 25px;border: none;" src="./assets/edit_avatar.png" alt="">
              </div>
            </div>
            <div id="user_name" ><span v-if="message_list.user_name!=''|| message_list.user_name!=null">{{message_list.user_name}}</span><span style="color: gray" v-else>暂未设置用户名</span><img style="padding-left: 5px;" src="./assets/edit.png"></div>
            <div id="follow_fans"><span style="padding-right:5px">关注</span><span>{{message_list.follow_count}}</span><span class="split_symbol">|</span><span style="padding-right:5px">粉丝</span><span>{{message_list.fans_count}}</span></div>
            <div id="self_descrip" >简介：<span v-if="message_list.self_description!=null">{{message_list.self_description}}</span><span v-else>暂无简介</span></div>
        </div>
        <div id="message_navigation">
          <div id="navigation_list">
            <router-link to="/self_message" ><div><img src="./assets/self_setting.png">个人中心</div></router-link>
            <div><img src="./assets/dynamic.png">我的动态</div>
            <div><img src="./assets/article.png">我的文章</div>
            <router-link to="/click" ><div><img src="./assets/click.png" >我的点赞</div></router-link>
            <router-link to="/like"><div><img src="./assets/like.png">我的喜欢</div></router-link>
            <router-link to="/views"><div><img src="./assets/views.png">浏览记录</div></router-link>
          </div>
          <div id="message_content">
            <router-view></router-view>
          </div>
        </div>
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
      // click_list:{}
    }
  },
  //  beforeRouteEnter(to, from, next){
  //   next((vm)=>{
  //     vm.from_path=from.path
  //     vm.click_method()
  //     console.log(1)
  //     // console.log("vm:",from)
  //   })
  //   next()
  // },
  created(){
    this.send()
  },
  methods: {
    send(){
      axios.get('/api/userinfo',{
        })
        .then(resp => {
            var that=this;
            that.message_list=resp.data.data;
            console.log(that.message_list);
        }).catch(err => { //
            console.log('请求失败：'+ err.code + ',' + err.message);
        });
    },
    overShow(event){
      event.currentTarget.firstElementChild.nextElementSibling.style.display = 'block'
      // event.style.display='block'
    },
    outHide(event){
      event.currentTarget.firstElementChild.nextElementSibling.style.display = 'none'
      // event.style.display='none'
    },

    update_avatar(){
      this.$refs.fileRef.dispatchEvent(new MouseEvent('click'))
      const file = this.$refs.img.files[0]
      console.log(file)
      const param = new FormData()
      param.append('file', file)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.$axios.post('/api/upload_avatar', param, config)
        .then(res => {
          console.log(res)
          if (res.data.code === 200) {
            this.$message.success(res.data.object)
            this.AddGoodsForm = {}
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
    // click_method(){
    // if(this.from_path=='/like'){
    //   axios.get('/api/click_list',{
    //     })
    //     .then(resp => {
    //         var that=this
    //         that.click_list=resp.data.data;
    //         console.log(2)
    //         console.log(that.click_list)
    //     }).catch(err => { //
    //         console.log('请求失败：'+ err.code + ',' + err.message);
    //     });
    // }
      
    // }
    // click_history(){
    //   axios.get('/api/click_list',{
    //     })
    //     .then(resp => {
    //         var that=this;
    //         that.click_list=resp.data.data;
    //         // console.log(that.message_list);
    //     }).catch(err => { //
    //         console.log('请求失败：'+ err.code + ',' + err.message);
    //     });
    // }
  }
}
</script>

<style>
@import url('./css/index.css');
</style>
