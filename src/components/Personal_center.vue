<template>
<div style="display:inline-block;width:100%;">
	<div id="user_background" style="margin:auto">
		<div id="background_image">
			<img src="../assets/无标题.png" alt="">
		</div>
		<div id="avatar_image">
			<div class="mask">
				<img style="width: 25px;height: 25px;border: none;position: absolute;top: 55%;transform: translateY(-50%);left: 40%" src="../assets/edit_avatar.png" alt="">
			</div>

			<el-upload
					   class="avatar-uploader"
					   action="http://127.0.0.1:8998/upload_avatar"
					   :headers="headerMsg"
					   :show-file-list="false"
					   :on-success="handleAvatarSuccess"
					   :before-upload="beforeAvatarUpload">
				<img v-if="imageUrl" :src="imageUrl" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		</div>

		<div id="user_name">
			<span v-if="message_list.user_name!=''|| message_list.user_name!=null">{{message_list.user_name}}</span>
			<span style="color: gray" v-else>暂未设置用户名</span>
			<span v-if="message_list.sex=='男'">
				<img style="width: 15px;margin-left: 5px;" src="../assets/男.png" alt="">
			</span>
			<span v-else-if="message_list.sex=='女'">
				<img style="width: 15px;margin-left: 5px;" src="../assets/女.png" alt="">
			</span>
			<span v-else style="font-size: 10px;color:gray">未知</span>
			<router-link to="/personal_center/self_message">
				<img style="padding-left: 5px;" src="../assets/edit.png">
			</router-link>
		</div>
		<div id="follow_fans">
			<span style="padding-right:5px">关注</span>
			<span>{{message_list.follow_count}}</span>
			<span class="split_symbol">|</span>
			<span style="padding-right:5px">粉丝</span>
			<span>{{message_list.fans_count}}</span>
		</div>
		<div id="self_descrip">简介：<span v-if="message_list.self_description!=null">{{message_list.self_description}}</span>
			<span v-else>暂无简介</span>
		</div>
	</div>
	<div id="message_navigation">
		<div id="navigation_list">
      <router-link to="/personal_center/dynamic_list">
				<div>
					<img src="../assets/dynamic.png">我的动态
        </div>
			</router-link>
			<router-link to="/personal_center/click_list">
				<div>
					<img src="../assets/like.png">我的点赞</div>
			</router-link>
			<router-link to="/personal_center/like_list">
				<div>
					<img src="../assets/like.png">我的喜欢</div>
			</router-link>
			<router-link to="/personal_center/views_histroy">
				<div>
					<img src="../assets/views.png">浏览记录</div>
			</router-link>
      <router-link to="/personal_center/self_message">
				<div>
					<img src="../assets/self_setting.png">个人中心</div>
			</router-link>
		</div>
		<div id="message_content">
			<router-view> </router-view>
		</div>
	</div>
</div>
</template>

<script>
export default {
    data () {
      return {
        message_list:{},
        imageUrl: '',
        headerMsg:{access_token:window.sessionStorage.getItem("access_token")},
      }
    },
    created(){
      this.user_info()
    },

    methods: {
    
    /* 
      查询用户信息
    */
      user_info(){
        this.$axios.get('/api/userinfo',{
          headers:{
            access_token:window.sessionStorage.getItem('access_token')
          }
          })
          .then(resp => {
            var that=this;
            that.message_list=resp.data.data[0];
            this.imageUrl=that.message_list.avatar_image_url
          }).catch(err => { //
              console.log("接口调用异常"+err);
          });
      },
    /* 
    头像上传成功后的提示展示及页面头像图片更新
    */
      handleAvatarSuccess( res, file) {
        this.open2("更新头像成功")
        this.imageUrl = URL.createObjectURL(file.raw);
        this.$parent.user_message.avatar_image_url=this.imageUrl
      },

    /* 
    图片格式限制
    */
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是jpg,png格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过2MB!');
        }
        return isJPG && isLt2M;
      },

      open2(message_content) {
			this.$message({
				showClose: true,
				message: message_content,
				type: 'success',
				duration: 1500
			});
		},
		open3(message_content) {
			this.$message({
			showClose: true,
			message: message_content,
			type: 'warning',
			duration: 1500
			});
      	},
		open4(message_content) {
			this.$message({
				showClose: true,
				message: message_content,
				type: 'error',
				duration: 1500
			});
		},
  }
}
</script>

<style>
@import url('../css/index.css');
</style>