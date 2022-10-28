<template>
<div style="display:inline-block;width:100%;">
	<img @click="goScrollTop" ref="go_scrolltop"  src="../assets/scrolltop.png" alt="" id='go_scrolltop' >
	<div id="user_background" style="margin:auto">
		<div id="background_image">
			<img src="../assets/无标题.png" alt="">
		</div>
		<!-- <div id="avatar_image"> -->
			<!-- <div class="mask">
				<img style="width: 25px;height: 25px;border: none;position: absolute;top: 55%;transform: translateY(-50%);left: 40%" src="../assets/edit_avatar.png" alt="">
			</div> -->

			<!-- <el-upload
				class="avatar-uploader"
				action="http://127.0.0.1:8998/upload_avatar"
				:headers="headerMsg"
				:show-file-list="false"
				:on-success="handleAvatarSuccess"
				:before-upload="beforeAvatarUpload">
				<img v-if="imageUrl" :src="imageUrl" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload> -->
		<div class="cropper-app" style="">
    	<el-form :model="formValidate" :rules="ruleValidate" ref="formValidate" label-width="100px" class="demo-ruleForm">
        <div class="list-img-box" >
          <div v-if="formValidate.mainImage !== ''&& formValidate.mainImage != null">
            <img class="img_style" :src="formValidate.mainImage" style='' alt="头像" @click="uploadPicture('flagImg')">
          </div>
          <div v-else class="upload-btn img_style" style="height: 100px;width:100px;border-radius:100px;background:#f6f6f6" @click="uploadPicture('flagImg')">
            <img src="../assets/add.png" alt="" style="">
          </div>
        </div>
        <input type="hidden" v-model="formValidate.mainImage" pl封面设置eholder="请添加封面">
    </el-form>
    <!-- 剪裁组件弹窗 -->
    <el-dialog
        title="裁剪图片"
        :visible.sync="cropperModel"
        width="750px"
		:lock-scroll='false'
        center
       >
     <upload-cropper
         :Name="cropperName"
         @uploadImgSuccess = "handleUploadSuccess"
         ref="child">
     </upload-cropper>
    </el-dialog>
    <!--查看大封面-->
    <el-dialog
        title="查看大封面"
        :visible.sync="imgVisible"
        center>
      <img :src="imgName" v-if="imgVisible" style="width: 100%" alt="查看">
    </el-dialog>
  </div>


		<!-- </div> -->

		<div id="user_name">
			<span v-if="message_list.user_name!=''&& message_list.user_name!=null">{{message_list.user_name}}</span>
			<span style="" v-else>设置个好听的名字吧~</span>
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
			<span @click="go_follows_fans(0)"  class='follow_fans_count'>
				<span >关注</span>
				<span style="color:rgb(73, 73, 73)">{{message_list.follow_count}}</span>
			</span>
			<span class="split_symbol" >|</span>
			<span @click="go_follows_fans(1)"  class='follow_fans_count'>
				<span >粉丝</span>
				<span style="color:rgb(73, 73, 73)">{{message_list.fans_count}}</span>
			</span>	
		</div>
		<div id="self_descrip">简介：<span v-if="message_list.self_description!=null">{{message_list.self_description}}</span>
			<span v-else>暂无简介</span>
		</div>
	</div>
	<div id="message_navigation" >
		<div id="navigation_list">
      		<router-link to="/personal_center/dynamic_list">
				<div tabindex="1" ref='publish'>
					<img style="width:32px;top:8px;transform:translateX(-10%)" src="../assets/dynamic (2).png">我发布的
        		</div>
			</router-link>
			<router-link to="/personal_center/concerns">
				<div tabindex="1" ref='follows'>
					<img style="width:25px" src="../assets/follows.png">我关注的
        		</div>
			</router-link>
			<router-link to="/personal_center/fans">
				<div tabindex="1" ref='fans'>
					<img style="width:28px" src="../assets/fans.png">我的粉丝
        		</div>
			</router-link>
			<router-link to="/personal_center/collect_list">
				<div tabindex="1">
					<img style="width:28px" src="../assets/collect.png">我的收藏
				</div>
			</router-link>
			<router-link to="/personal_center/like_list">
				<div tabindex="1">
					<img style="width:24px" src="../assets/like.png">我喜欢的
				</div>
			</router-link>
			<router-link to="/personal_center/views_histroy">
				<div tabindex="1">
					<img style="width:24px" src="../assets/views.png">浏览记录
				</div>
			</router-link>
      		<router-link to="/personal_center/self_message">
				<div tabindex="1" ref='self_message'>
					<img style="width:24px"  src="../assets/self_setting.png">个人中心
				</div>
			</router-link>
		</div>
			<router-view id="message_content"> </router-view>
	</div>
	
</div>
</template>

<script>
import uploadCropper from "@/components/common/upload-cropper";

export default {
	components: {uploadCropper},
    data () {
      return {
        message_list:{},
        imageUrl: '',
        headerMsg:{access_token:window.localStorage.getItem("access_token")},
		formValidate: {
        mainImage: '',
      	},
      	ruleValidate: {
        mainImage: [
          {required: true, message: '请上传封面', trigger: 'blur'}
        ],
      },
      //裁切图片参数
      cropperModel:false,
      cropperName:'',
      imgName: '',
      imgVisible: false
      }
    },
	
    created(){
      this.user_info()
	  
	  window.addEventListener("scroll", this.scrollHandle);
	  window.addEventListener("click", this.show_menu);

	  
    },
	destroyed(){
        window.removeEventListener("scroll", this.scrollHandle);
		window.removeEventListener("click", this.show_menu);
    },
	mounted(){
		this.$refs.publish.style.color='#ff8200'
		window.scrollTo({
			top:0,
			left:0
		})
	},

    methods: {

		middleAdFinish(){
 
      },
    //封面设置
    uploadPicture(name){
      this.cropperName = name;
      this.cropperModel = true;
    },
    //头像图片上传成功后
    handleUploadSuccess (data){
      console.log(data)
      // switch(data.name){
      //   case 'flagImg':
      //     this.formValidate.mainImage = 'http://ydfblog.cn/dfs/'+data.url;
      //     console.log('最终输出'+data.name)
      //     break;
      // }
      this.formValidate.mainImage=data.url
      this.cropperModel = false;
	},

	/* 
	显示菜单样式
	*/
		show_menu(e){
			const a=this.$route.path
			this.$refs.publish.style.color='#333'
			if(a=='/personal_center/fans'){
				this.$refs.fans.style.color='#ff8200'
				this.$refs.follows.style.color='#333'
				this.$refs.self_message.style.color='#333'
			}
			else if(a=='/personal_center/concerns'){
				this.$refs.follows.style.color='#ff8200'
				this.$refs.fans.style.color='#333'
				this.$refs.self_message.style.color='#333'
			}else if(a=='/personal_center/self_message'){
				this.$refs.self_message.style.color='#ff8200'
				this.$refs.fans.style.color='#333'
				this.$refs.follows.style.color='#333'
			}
			else if(a=='/personal_center/dynamic_list'){
				// this.$refs.publish.style.backgroundColor='rgb(240, 240, 240)'
				this.$refs.publish.style.color='#ff8200'
				this.$refs.fans.style.color='#333'
				this.$refs.follows.style.color='#333'
				this.$refs.self_message.style.color='#333'
			}
			else{
				this.$refs.fans.style.color='#333'
				this.$refs.follows.style.color='#333'
				this.$refs.self_message.style.color='#333'
			}
		},

		

	/* 
    跳转关注和粉丝列表，0为关注列表，1为粉丝列表
    */
		go_follows_fans(action) {
			if(action==0){
				this.$router.replace('/personal_center/concerns')
			}
			else{
				this.$router.replace('/personal_center/fans')

			}
			
		},

	/* 
    回到顶部
    */
	goScrollTop(){
		window.scrollTo({
			top:0,
			left:0,
			behavior:'smooth'
		})
	},

    /* 
    控制回到顶部按钮展示
    */
	scrollHandle(e){
		let top = e.srcElement.scrollingElement.scrollTop;    // 获取页面滚动高度
		if(top>=1.5*(window.innerHeight)){
			this.$refs.go_scrolltop.style.display='block'
		}
		else{
			this.$refs.go_scrolltop.style.display='none'
		} 
	},
    
    /* 
      查询用户信息
    */
      user_info(){
        this.$axios.get('/api/userinfo',{
          headers:{
            access_token:window.localStorage.getItem('access_token')
          }
          })
          .then(resp => {
            var that=this;
            that.message_list=resp.data.data[0];
            this.imageUrl=that.message_list.avatar_image_url
			this.formValidate.mainImage=that.message_list.avatar_image_url
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
  },
  	 
}
</script>

<style>
@import url('../css/index.css');
</style>