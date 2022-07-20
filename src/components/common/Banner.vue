<template>
<div id="all" >
<!-- 顶部bannner -->
	<div id=top_tt>
		<div id='top'>
			<img id='logo_img' @click='goback_index' src="../../assets/logo.png" alt="" style=''>
			<div id="classifiy" style="transform: translateY(50%);">
				<span id="classifiy_text">分类<span id="icon"></span>
				</span>
				<div id="classifiy_content">
					<span>摄影</span>
					<span>摄影</span>
					<span>摄影</span>
					<span>摄影</span>
					<span>摄影</span>
					<span>摄影</span>
				</div>
			</div>
			<input style="" id="search" v-model="mess" type="text" placeholder="请输入感兴趣的内容" @keyup.enter="search">
			<button style="" id='tt' @click="search"></button>
			<img id='publish' src="../../assets/publish.png" title="发布我的动态" @click="control_login_publish_page(2,1)" >
			<span>
				<span v-show="!login_status" style="" class="register_login" @click="control_login_publish_page(1,1)">登录/注册</span>
				<span v-show="login_status" class="login_message">
					<router-link to="/personal_center/dynamic_list">
						<img  id="login_avatar" :src="user_message.avatar_image_url" alt="">
						<span class="login_func" style="">
							<span v-if="user_message.user_name!=null && user_message.user_name!=''">{{this.user_message.user_name}}</span>
							<span v-else style="font-size: 14px;">完善下个人资料吧！</span>
						</span>
					</router-link>
					<span id="login_out" @click="login_out">退出</span>
				</span>
			</span>
		</div>
	</div>

<!-- 页面蒙版 + 登录注册页面-->
	<div ref="blockUI1" class="blockUI blockOverlay" style="display:none;z-index: 9000; border: none; margin: 0px; padding: 0px; width: 100%; height: 100%; top: 0px; left: 0px; background-color: rgb(0, 0, 0); opacity: 0.6; cursor: default; position: fixed;"></div>
	<div ref="blockUI2" class="blockUI blockMsg blockPage" style="display:none;z-index: 9011;border-radius: 12px; position: fixed; padding: 0px; margin: -274.5px 0px 0px -330px; width: 660px; top: 50%; left: 50%; text-align: left; color: white; border: none; background: white; cursor: default; height: 450px;">
		<div class="mask-body" style="width: 660px;">
			<div class="tt-s">
				<span style="font-size:16px;font-weight:700;color:#606060">
					<span>登录</span>
				</span>
				<span>
					<img @click="control_login_publish_page()" style="width:18px;position:absolute;right:10px;top:10px;padding:4px;cursor: pointer;" src="../../assets/关闭.png" alt="">
				</span>
			</div>
			<div class="mask-cont">
				<div id="poplogin">
					<div id=login_message>
						<div class="login_input">
							<span>邮箱/手机号：</span>
							<input type="text" ref="account" placeholder="请输入邮箱或手机号">
						</div>
						<div class="login_input">
							<span>密码：</span>
							<input type="password" ref="password" placeholder="请输入密码" maxlength='12' @keyup.enter="user_login">
							<a class="pswd-forget" @click="register_or_updatepwd(2)" style="cursor:pointer">忘记密码？</a>
						</div>
						<div class="u-chk">
							<!-- <div class="u-chk-remenber-me">
							<span><input class="chk" type="checkbox" name="remember" id="poplogin-rem" value="" checked=""></span>
							<label for="poplogin-rem">记住我</label>
							</div> -->
						</div>
						<div class="abtn">
							<button type="submit" class="pg-loginbtn" @click="user_login">
								<u>登录</u>
							</button>
						</div>
					</div>
					<div id='web_image' style="width:205px">
						<img src="../../assets/qr_code.png" alt="" style="width:130px;position:relative;left:40px">
						<div style="color:black; width:100%;text-align: center;">扫码了解更多</div>
					</div>
					<div class="toreg">
						<span id="register" style="color:#5678a0 ;">
							<span   @click="register_or_updatepwd(1)">还没有账号?立即注册</span>
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div ref="blockUI3" class="blockUI blockMsg blockPage" style="display:none;z-index: 9011;border-radius: 12px; position: fixed; padding: 0px; margin: -274.5px 0px 0px -330px; top: 60%; left: 50%; text-align: left; color: black; border: none; background: white; cursor: default; ">
		<div id="dynamic_publish">
			<div id="dynamic_title">
				<span>随时动态</span>
				<span id="close" @click="control_login_publish_page()"><img src="../../assets/关闭.png" alt=""></span>
			</div>
			<el-input style="width: 94%; margin-left: 20px;margin-top: 10px;margin-bottom: 10px;"
			:class="{border_style:border_style}"
			type="textarea"
			placeholder="快来分享有趣的事吧~"
			v-model="dynamic_content"
			maxlength="1000"
			show-word-limit
			:rows="3"
			:autosize="{ minRows: 3, maxRows: 8}"
			
			>
			</el-input>
			<div style="position:relative">
			<el-upload
			:class="{is_display:is_display}"
			ref="upload"
			action=""
			class="article_img"   
			list-type="picture-card"
			:headers="headerMsg"
			:on-preview="handlePictureCardPreview"
			:on-remove="romove_show_upload"
			:auto-upload="false"
			:multiple="true"
			:on-change='change_hide_upload'
			:http-request="uploadFile"
			:limit='limit_count'
			:on-exceed='upload_limit'
			:before-upload="beforeimgUpload"
			>
			<!-- :http-request="uploadFile" -->
			<i class="el-icon-plus"></i>
			</el-upload>
			</div>
			<el-dialog :visible.sync="dialogVisible" >
			<img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>
			<div class="bottom">
				<span >是否公开：</span>
				<select name="" id="is_open" style="border: none;outline:none;margin:-2">
					<option value="1" style="border: none;outline:none;margin:-2">公开</option>
					<option value="0" style="border: none;outline:none;">仅自己</option>
				</select>
				<el-button style="margin-left: 410px;margin-bottom: 10px; background-color:#ff8200;border:none" size="small" type="primary" @click="submitUpload">发表</el-button>
			</div>
		</div>
	</div>
	<router-view ref='child' class="inter_page"  style="min-height: calc(100vh - 180px);">

	</router-view>

	<!-- 页脚 -->
	<div id='footer'>
		沪ICP备 13030189号 Copyright © 2014-2022 堆糖个人社区 | 地址：不知名地区44号 | 电话：021-6428945
	</div>
</div>
</template>

<script>
export default {
	data() {
		return {
			user_message: [],
			imageUrl: '',
			login_status: false,
			account: '',
			password: '',
			mess: this.$route.query.search_word,//获取路由携带的参数
			dynamic_content:'',
			dialogImageUrl: '',
			headerMsg:{access_token:window.sessionStorage.getItem('access_token')},
			dialogVisible: false,
			file_list:[],
			formDate:"",
			view_status:"",
			article_id:"",
			is_display:false,
			limit_count:10,//图片上传张数上限
			border_style:false
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

	created() { 
		this.judge_login()//判断用户是否已登录过
	},
  
	methods: {

	/* 
    控制登录页面展示,option_action=1为打开页面，其他为关闭页面，what_page=1为打开登录页面，其他为打开动态发布页面
    */
		control_login_publish_page(what_page,option_action) {
			
			if(option_action==1){
				this.$refs.blockUI1.style.display = 'block'
				if(what_page==1){
					this.$refs.account.value = ""
					this.$refs.password.value = ""
					this.$refs.blockUI2.style.display = 'block'
				}
				else{
					this.dynamic_content=''
					this.$refs.upload.clearFiles()
					this.$refs.blockUI3.style.display = 'block'
				}

			}
			else{
				this.$refs.blockUI1.style.display = 'none'
				this.$refs.blockUI2.style.display = 'none'
				this.$refs.blockUI3.style.display = 'none'
				this.file_list=[]
			}		
		},

    /* 
    用户登录
    */
		user_login() {
			this.account = this.$refs.account.value
			this.password = this.$refs.password.value
			if(this.account==""){
				this.open4("请输入注册的邮箱或手机号")
				return
			}
			if(this.password==""){
				this.open4("请输入密码")
				return
			}
			var that = this
			const param = {
				"account": this.account,
				"password": this.password
			}
			this.$axios.post("/api/login", param)
				.then(resp => {
					if(resp.data.code == 200) {
						sessionStorage.setItem("access_token", resp.data.access_token)
						that.login_status = true
						this.control_login_publish_page()
						this.user_info().then(resolve=>{
							if(resolve==200 && this.$route.path=='/index'){//当user_info接口调用成功后且当前页面为index时，重新获取文章列表
								this.$nextTick(()=>{
								this.$refs.child.get_article_list() 
								})
							}
							if(resolve==200 && this.$route.path=='/dynamic_details'){//当user_info接口调用成功后且当前页面为index时，重新获取文章列表
								this.$nextTick(()=>{
								// this.$refs.child.get_article_details() 
								location.reload()
								})
							}
						})
					} else {
						this.open4(resp.data.message)
					}
				})
				.catch(err => {
					console.log("接口调用异常"+err)
				})
			},

    /* 
    退出登录
    */
		login_out() {
			window.sessionStorage.clear();
			window.localStorage.removeItem('user_id')
			this.login_status = false
			if(this.$route.path.indexOf('personal_center')!=-1){
				this.$router.replace('/index')
			}
			location.reload()
		},

    /* 
    查询用户登录信息
    */
		user_info() {
      		return new Promise((resolve,rej) => {
				this.$axios.get('/api/userinfo', {
					headers: {
						access_token: window.sessionStorage.getItem('access_token')
					}
				})
				.then(resp => {
					if(resp.data.code==200){
						var that = this;
						that.user_message = resp.data.data[0];
						localStorage.setItem('user_id', that.user_message.user_id)
						resolve(resp.data.code)
					}
					else{
						rej(resp.data.code)
						if(resp.data.code==1){
							window.sessionStorage.clear()
							window.localStorage.clear()
							this.open3("登录已失效，请重新登录")
						}else if(resp.data.code==2 ||resp.data.code==3){
							window.sessionStorage.clear()
							window.localStorage.clear()
							this.open3("账户未登录，请先登录")
						}else{
							this.open3(resp.data.message)
						}
					}
					
				})
				.catch(err => { //
					console.log("接口调用异常"+err);
				});
			})
		},

    /* 
    自动登录
    */
		judge_login() { //判断用户是否登录过
			if(window.sessionStorage.getItem("access_token") != null) {
				this.login_status = true
				this.user_info()
			}

		},

    /* 
    返回首页
    */
		goback_index() { //返回首页
			this.$router.push('/index')
		},

	/* 
    跳转注册或忘记密码页面
    */
		register_or_updatepwd(option_action) {
			let new_window=this.$router.resolve({
				path:'/register',
				query:{
					option_action:option_action
				}
			})
			window.open(new_window.href, '_blank')
		},

    /* 
    页面搜索功能
    */
		search() {
			this.$router.push('/index')
			this.$nextTick(function() { //跳转页面后等待dom加载完成再执行搜索
				this.$refs.child.get_article_list(document.getElementById('search').value)
			})

		},


	/* 
	删除图片时，控制上传图片按钮重新展示
	*/
		romove_show_upload(file, fileList) {
			if(fileList.length<this.limit_count){
				this.is_display=false
			}
		},

	/* 
	上传图片时，控制上传图片按钮隐藏
	*/
		change_hide_upload(file,file_list){
			this.file_list=file_list
			if(file_list.length>=this.limit_count){
				this.is_display=true
			}
		},

	/* 
	上传图片预览
	*/
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},

	/* 
	获取多个上传的文件
	*/
		uploadFile(file){
			this.formDate.append('file', file.file);
		},

	/* 
	图片上限提醒
	*/
		upload_limit(){
			this.open3('图片上传张数已达上限')
		},

	/* 
		发布动态
	*/
		submitUpload(){
			this.formDate = new FormData()
			this.$refs.upload.submit();
			this.formDate.append('article_type', 1);//1为动态，2为文章，目前只有动态发布
			this.formDate.append('author_id', window.localStorage.getItem('user_id'));
			this.formDate.append('article_content',this.dynamic_content );
			this.formDate.append('view_status', 1);
			this.view_status=document.getElementById('is_open').value
			const config = {
				headers: {
				'Content-Type': 'application/json',
				'access_token':window.sessionStorage.getItem('access_token')
				}
			}
			if(this.dynamic_content==''){
				this.open3("输入想分享的内容吧")
				return
			}
			if(this.file_list.length==0){
				this.open3("请至少上传一张图片哦")
				return
			}
			this.$axios.post("/api/dynamic_publish",this.formDate,config)
			.then(resp => {
			if (resp.data.code == 200) {
				this.open2('动态发布成功')
				this.$refs.blockUI1.style.display = 'none'
				this.$refs.blockUI3.style.display = 'none'
				this.file_list=[]
			}
			else{
				if(resp.data.code==1){
					window.sessionStorage.clear()
					window.localStorage.clear()
					this.open3("登录已失效，请重新登录")
				}else if(resp.data.code==2 ||resp.data.code==3){
					window.sessionStorage.clear()
					window.localStorage.clear()
					this.open3("账户未登录，请先登录")
				}else{
					this.open3(resp.data.message)
				}
			}
			})
			.catch(err => {
				console.log("接口调用异常"+err)
				return false
			})
		},

	/* 
    图片格式和大小限制
    */
		beforeimgUpload(file) {
			const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
			const isLt2M = file.size / 1024 / 1024 < 5;

			if (!isJPG) {
			this.$message.error('上传头像图片只能是jpg,png格式!');
			}
			if (!isLt2M) {
			this.$message.error('上传头像图片大小不能超过5MB!');
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

<style >
@import url('../../css/index.css');
@import url('../../css/login.css');
@import url('../../css/dynamic_publish.css');
</style>