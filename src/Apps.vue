<template>
  <div id="app" >
    <!-- <img src="./assets/logo.png"> -->
    <div class="blockUI blockOverlay" style="z-index: 9000; border: none; margin: 0px; padding: 0px; width: 100%; height: 100%; top: 0px; left: 0px; background-color: rgb(0, 0, 0); opacity: 0.6; cursor: default; position: fixed;"></div>
   
    <div class="blockUI blockMsg blockPage" style="z-index: 9011;border-radius: 12px; position: fixed; padding: 0px; margin: -274.5px 0px 0px -330px; width: 660px; top: 50%; left: 50%; text-align: left; color: white; border: none; background: white; cursor: default; height: 450px;"><div class="mask-body" style="width: 660px;"><div class="tt-s"><span style="color:black;font-size:16px;font-weight:700;color:#606060">登录</span></div><div class="mask-cont"><div id="poplogin">
          <div id=login_message>
            <div class="login_input"><span>手机号/邮箱：</span><input type="text"></div>
            <div class="login_input"><span>密码：</span><input type="text"><a href="" class="pswd-forget">忘记密码？</a></div>
            <div class="u-chk">
              <div class="u-chk-remenber-me">
                <span><input class="chk" type="checkbox" name="remember" id="poplogin-rem" value="" checked=""></span>
                <label for="poplogin-rem">记住我</label>
              </div>
            </div>
            <div class="abtn">
              <button type="submit" class="pg-loginbtn"><u>登录</u></button>
            </div>
          </div>
          <div id='web_image'>sdfsdfsdfs</div>
          <div class="toreg">
            <a href="/reg/phone/?next=/">还没有账号?立即注册</a>
          </div>
    </div></div></div></div>

    <div id="all">
        <div id='top'>
            <img id='logo_img' src="./dfsd/Myproject/static/image/20180619182220_KLEPM.png" alt="" >
            <div id="classifiy"><span id="classifiy_text" >分类<span id="icon"></span></span>
                <div id="classifiy_content">
                    <span>摄影</span>
                    <span>摄影</span>
                    <span>摄影</span>
                    <span>摄影</span>
                    <span>摄影</span>
                    <span>摄影</span>
                </div>
            </div>
            <input id="search" type="text" placeholder="请输入感兴趣的内容">
            <button id='tt'></button>
            <router-link to="/login"><span id="register_login">登录/注册</span></router-link>
        </div>

        <div id="user_background"  style="">
            <div id="background_image"><img src="./assets/无标题.png" alt=""></div>
            <div id="avatar_image"  @mouseenter="overShow($event)" @mouseleave="outHide($event)" >
              <img class="big_avatar" v-bind:src="message_list.avatar_image_url" alt="" >
              <div class="mask" >
              <img style="width: 25px;height: 25px;border: none;position: absolute;top: 55%;transform: translateY(-50%);left: 40%" src="./assets/edit_avatar.png" alt="" >
              <!-- <input type="file" id="up_file" ref="fileRef" @change="fileChange" style="opacity: 0;width: 100px;height: 100px;border-radius: 100px;border: 1px solid red;position: absolute;left: 50%;transform: translateX(-50%);cursor: pointer;"></input> -->
              <!-- @click="update_avatar" -->
              </div>
              <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:8998/upload_avatar"
              :headers="headerMsg"
              :auto-upload="true"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            
            <!-- <el-button  @click="update_avatar">sdfsdfs</el-button> -->
            <div id="user_name" >
              <span v-if="message_list.user_name!=''|| message_list.user_name!=null">{{message_list.user_name}}</span><span style="color: gray" v-else>暂未设置用户名</span>
              <span v-if="message_list.sex=='男'"><img style="width: 15px;margin-left: 5px;" src="./assets/男.png" alt="" ></span>
              <span v-else-if="message_list.sex=='女'"><img style="width: 15px;margin-left: 5px;" src="./assets/女.png" alt="" ></span>
              <span v-else style="font-size: 10px;color:gray">未知</span>
              <router-link to="/self_message" ><img style="padding-left: 5px;" src="./assets/edit.png"></router-link></div>
            <div id="follow_fans"><span style="padding-right:5px">关注</span><span>{{message_list.follow_count}}</span><span class="split_symbol">|</span><span style="padding-right:5px">粉丝</span><span>{{message_list.fans_count}}</span></div>
            <div id="self_descrip" >简介：<span v-if="message_list.self_description!=null">{{message_list.self_description}}</span><span v-else>暂无简介</span></div>
        </div>
        <div id="message_navigation">
          <div id="navigation_list">
            <router-link to="/self_message" ><div><img src="./assets/self_setting.png">个人中心</div></router-link>
            <router-link to="/dynamic" ><div><img src="./assets/dynamic.png">我的动态</div></router-link>
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
      headerMsg:{access_token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTY3MjY0OTgsImlhdCI6MTY1NDEzNDQ5OCwiaXNzIjoia3hwIiwiZGF0YSI6eyJ1c2VyaWQiOjF9fQ.PH3FndpDOuOCbmPq-cRFRtg_3HwPc6j7LOXCze9VH-A"},
      imageUrl: ''
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
    },
    outHide(event){
      event.currentTarget.firstElementChild.nextElementSibling.style.display = 'none'
    },
    open2() {
        this.$message({
          showClose: true,
          message: '更新成功',
          type: 'success',
          duration:1000
        });
      },
    handleAvatarSuccess( res, file) {
        this.open2()
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    // update_avatar(){
    //   // this.$refs.upload.
    //   this.$refs.fileRef.dispatchEvent(new MouseEvent('click'))
    //   const file = this.$refs.img.files[0]
    //   console.log(file)
    //   const param = new FormData()
    //   param.append('file', file)
    //   const config = {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   }
    //   this.$axios.post('/api/upload_avatar', param, config)
    //     .then(res => {
    //       console.log(res)
    //       if (res.data.code === 200) {
    //         this.$message.success(res.data.object)
    //         this.AddGoodsForm = {}
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // },
    // fileChange(){
    //   // const file = this.$refs.files[0].name
    //   const file = document.getElementById('up_file').value
    //   // console.log(file)
    //   const files="E:\/商品图片\/b1c2f157a769f21ca146648c26cc9f5a.jpeg"
    //   console.log(files)
    //   const param = new FormData()
    //   param.append('file', files)
    //   const config = {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   }
    //   axios.post('/api/upload_avatar', param, config)
    //     .then(res => {
    //       console.log(res)
    //       if (res.data.code === 200) {
    //         this.$message.success(res.data.object)
    //         this.AddGoodsForm = {}
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // },
    
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
@import url('./dfsd/Myproject/src/css/index.css');
@import url('./css/register_login.css');
</style>
