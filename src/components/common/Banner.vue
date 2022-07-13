<template>
    <div id="33" >
    <div id="all">
        <div id='top'>
            <img id='logo_img' src="../../dfsd/Myproject/static/image/20180619182220_KLEPM.png" alt="" @click='goback_index' style="cursor: pointer;">
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
            <span v-show="!login_status"><span id="register_login" @click="login_page($event)">登录/注册</span></span>
            <span v-show="login_status" >
            <span  style="left: 18%;position: relative;display: inline-block;">
            <router-link to="/personal_center" >
              <span class="login_message" >
              <img  style="width: 36px;border-radius:36px;height:36px;box-shadow:1px 1px #DCDCDC" id="login_avatar" :src="message_list.avatar_image_url" alt="" >
              <span class="login_func" style="">
                <span v-if="message_list.user_name!=null && message_list.user_name!=''">{{this.message_list.user_name}}</span>
                <span v-else style="font-size: 14px;">完善下个人资料吧！</span>
              </span>
            </span>
            </router-link>
            <span class="login_func" id="logout" @click="logout">退出</span>
            </span></span>
        </div>

        <div class="blockUI blockOverlay" style="display:none;z-index: 9000; border: none; margin: 0px; padding: 0px; width: 100%; height: 100%; top: 0px; left: 0px; background-color: rgb(0, 0, 0); opacity: 0.6; cursor: default; position: fixed;"></div>
   
        <div class="blockUI blockMsg blockPage"  style="display:none;z-index: 9011;border-radius: 12px; position: fixed; padding: 0px; margin: -274.5px 0px 0px -330px; width: 660px; top: 50%; left: 50%; text-align: left; color: white; border: none; background: white; cursor: default; height: 450px;">
        <div class="mask-body" style="width: 660px;">
        <div class="tt-s">
          <span  style="font-size:16px;font-weight:700;color:#606060"><span v-if="register_display=='none'">登录</span><span v-else>注册</span></span>
          
          <span ><img @click="close_login_page($event)" style="width:18px;position:absolute;right:10px;top:10px;padding:4px;cursor: pointer;" src="../../assets/关闭.png" alt=""></span>
        </div>
        <div class="mask-cont"><div id="poplogin">
          <div id=login_message>
            <div class="login_input"><span>邮箱/手机号：</span><input type="text" ref="account" placeholder="请输入邮箱或手机号"></div>
            <div class="login_input">
              <span>密码：</span><input type="password" ref="password" placeholder="请输入密码" maxlength='12'>
              <a v-if="register_display=='none'"  class="pswd-forget" @click="update_password" style="cursor:pointer">忘记密码？</a>
            </div>
            <div class="login_input" style="display: none;"><span>确认密码：</span><input type="password" ref="confirm_password" placeholder="请再次输入密码" maxlength='12'></div>
            <div class="u-chk">
              <div class="u-chk-remenber-me">
                <span><input class="chk" type="checkbox" name="remember" id="poplogin-rem" value="" checked=""></span>
                <label for="poplogin-rem">记住我</label>
              </div>
            </div>
            <div class="abtn">
              <button type="submit" class="pg-loginbtn" @click="user_login" v-if="register_display=='none'"><u>登录</u></button>
              <button type="submit" class="pg-loginbtn" @click="user_register" v-else><u >提交注册</u></button>
            </div>
          </div>
          <div id='web_image'>sdfsdfsdfs</div>
          <div class="toreg">
            <span  id="register" @click="register($event)" style="color:#5678a0 ;"><span v-if="register_display=='none'">还没有账号?立即注册</span><span v-else>已有账户?去登录</span></span>
          </div>
    </div></div></div></div>
        <router-view class="inter_page">
          
        </router-view>
        <!-- <div id='bottom'>
            沪ICP备 13030189号 Copyright © 2014-2022 行吟信息科技（上海）有限公司 | 地址：上海市黄浦区马当路388号C座 | 电话：021-64224530
        </div> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
//   name: 'App',
  data () {
    return {
      message_list:[],
      imageUrl: '',
      login_status:false,
      register_display:'none',
      account:'',
      password:''
      // this_event:'click'
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

  created(){//判断用户是否已登录过
  this.judge_login()
  },
  methods: {
    close_login_page(event){
      event.target.parentElement.parentElement.parentElement.parentElement.style.display = 'none'
      event.target.parentElement.parentElement.parentElement.parentElement.previousElementSibling.style.display = 'none'
    },
    login_page(event){
      this.$refs.account.value=""
      this.$refs.password.value=""
      // console.log(event,  event.target.parentElement)
      event.target.parentElement.parentElement.nextElementSibling.style.display = 'block'
      event.target.parentElement.parentElement.nextElementSibling.nextElementSibling.style.display = 'block'
    },
    user_login(){
      this.account=this.$refs.account.value
      this.password=this.$refs.password.value
      var that=this
      const param={
        "account": this.account,
        "password": this.password
      }
        axios.post("/api/login",param).then(res => {
        console.log(res.data)
        if (res.data.code == 200) {
          sessionStorage.setItem("access_token",res.data.access_token) 
          that.login_status=true
          this.user_info()
          // this.get_article_list()
          location.reload()
          
        }
        else{
          this.open4(res.data.message)
        }
        })
        .catch(err => {
        //   this.open4()
          console.log(err)
        })
    },
    user_register(){
      let account=this.$refs.account.value
      let password=this.$refs.password.value
      let confirm_password=this.$refs.confirm_password.value
      var that=this
      const param={
        "account": account,
        "password": password,
        "Confirm_password":confirm_password
      }
      axios.post("/api/register",param).then(res => {
        console.log(res.data)
        if (res.data.code == 200) {
          this.account=account
          this.password=password
          this.open2(res.data.message)
          
          this.user_login()
          
        }
        else{
          this.open4(res.data.message)
        }
        })
        .catch(err => {
        //   this.open4()
          console.log(err)
        })
    },
    logout(){
      window.sessionStorage.clear();
      window.localStorage.removeItem('user_id')
      this.login_status=false
      this.$router.push('/index')
      location.reload()  
      
    },
    user_info(){
      axios.get('/api/userinfo',{
        headers:{
          access_token:window.sessionStorage.getItem('access_token')
        }
        })
        .then(resp => {
            var that=this;
            that.message_list=resp.data.data;
            localStorage.setItem('user_id',resp.data.data.user_id)
            // location.reload()
            // console.log(that.message_list.user_id)
        }).catch(err => { //
            console.log('请求失败：'+ err.code + ',' + err.message);
        });
    },

    judge_login(){//判断用户是否登录过
      if(window.sessionStorage.getItem("access_token")!=null){
        this.login_status=true
        this.user_info()
      }

    },
    goback_index(){//返回首页
      this.$router.push('/index')
    },
    overShow(event){
      event.currentTarget.firstElementChild.nextElementSibling.style.display = 'block'
    },
    outHide(event){
      event.currentTarget.firstElementChild.nextElementSibling.style.display = 'none'
    },
    register(event){
      if(this.register_display=='block'){
        event.target.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.style.display = 'none'
        this.register_display='none'
      }
      else{
        event.target.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.style.display = 'block'
        this.register_display='block'
      }
      
    },
    get_article_list(){
        axios.get('/api/article_list',{
            params:{
                user_id:window.localStorage.getItem('user_id')
            }
            })
            .then(resp => {
                // console.log((that.article_list).length)
            }).catch(err => { //
                console.log('请求失败：'+ err.code + ',' + err.message);
            })
    },
    open2(message_data) {
        this.$message({
          showClose: true,
          message: message_data,
          type: 'success',
          duration:1000
        });
      },
      open4(message_content) {
        this.$message({
          showClose: true,
          message: message_content,
          type: 'error',
        });
      },
    handleAvatarSuccess( res, file) {
        this.open2("图片上传成功")
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
      },
      update_password(){
        window.open('/update_pwd', '_blank')
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

<style >
@import url('../../css/index.css');
@import url('../../dfsd/Myproject/src/css/index.css');
@import url('../../css/register_login.css');
</style>