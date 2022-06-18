<template>
<div style="display:inline-block;width:100%;">
  <!-- <div style="width:800px;height:300px;border:1px solid green;margin:auto"></div> -->
<div id="user_background"  style="margin:auto">
            <div id="background_image"><img src="../assets/无标题.png" alt=""></div>
            <div id="avatar_image"  @mouseenter="overShow($event)" @mouseleave="outHide($event)" >
              <img class="big_avatar" v-bind:src="message_list.avatar_image_url" alt="" >
              <div class="mask" >
              <img style="width: 25px;height: 25px;border: none;position: absolute;top: 55%;transform: translateY(-50%);left: 40%" src="../assets/edit_avatar.png" alt="" >
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
            
            <div id="user_name" >
              <span v-if="message_list.user_name!=''|| message_list.user_name!=null">{{message_list.user_name}}</span><span style="color: gray" v-else>暂未设置用户名</span>
              <span v-if="message_list.sex=='男'"><img style="width: 15px;margin-left: 5px;" src="../assets/男.png" alt="" ></span>
              <span v-else-if="message_list.sex=='女'"><img style="width: 15px;margin-left: 5px;" src="../assets/女.png" alt="" ></span>
              <span v-else style="font-size: 10px;color:gray">未知</span>
              <router-link to="/self_message" ><img style="padding-left: 5px;" src="../assets/edit.png"></router-link></div>
            <div id="follow_fans"><span style="padding-right:5px">关注</span><span>{{message_list.follow_count}}</span><span class="split_symbol">|</span><span style="padding-right:5px">粉丝</span><span>{{message_list.fans_count}}</span></div>
            <div id="self_descrip" >简介：<span v-if="message_list.self_description!=null">{{message_list.self_description}}</span><span v-else>暂无简介</span></div>
        </div>
        <div id="message_navigation">
          <div id="navigation_list">
            <router-link to="/self_message" ><div><img src="../assets/self_setting.png">个人中心</div></router-link>
            <router-link to="/dynamic_release" ><div><img src="../assets/dynamic.png">我的动态</div></router-link>
            <div><img src="../assets/article.png">我的文章</div>
            <router-link to="/click" ><div><img src="../assets/click.png" >我的点赞</div></router-link>
            <router-link to="/like"><div><img src="../assets/like.png">我的喜欢</div></router-link>
            <router-link to="/views"><div><img src="../assets/views.png">浏览记录</div></router-link>
          </div>
          <div id="message_content">
            <router-view></router-view>
          </div>
        </div>
        <div id="model_list">
          底部
        </div>
</div>

</template>

<script>
import axios from 'axios'
export default {
    data () {
    return {
      message_list:{},
      imageUrl: '',
      headerMsg:{access_token:window.sessionStorage.getItem("access_token")}
    }
},
created(){//刚注释
    this.user_info()
  },
    methods: {
    
    user_info(){
      axios.get('/api/userinfo',{
         headers:{
          access_token:window.sessionStorage.getItem('access_token')
        }
        })
        .then(resp => {
            var that=this;
            that.message_list=resp.data.data;
        }).catch(err => { //
            console.log('请求失败：'+ err.code + ',' + err.message);
        });
    },

    send(){
      if(window.sessionStorage.getItem("access_token")!=null){
        this.login_status=true
        this.user_info()
      }

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
@import url('../css/index.css');
</style>