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
				<span>
					<span v-show="!login_status" style="" class="register_login" @click="login_page($event)">登录/注册</span>
					<span v-show="login_status" class="login_message">
						<router-link to="/personal_center">
							<img  id="login_avatar" :src="user_message.avatar_image_url" alt="">
							<span class="login_func" style="">
								<span v-if="user_message.user_name!=null && user_message.user_name!=''">{{this.user_message.user_name}}</span>
								<span v-else style="font-size: 14px;">完善下个人资料吧！</span>
							</span>
						</router-link>
						<span id="logout" @click="logout">退出</span>
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
						<img @click="close_login_page()" style="width:18px;position:absolute;right:10px;top:10px;padding:4px;cursor: pointer;" src="../../assets/关闭.png" alt="">
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
								<input type="password" ref="password" placeholder="请输入密码" maxlength='12' >
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
  // mounted(){
    // window.onbeforeunload = function (e) {
    //   var storage = window.localStorage;
    //   storage.clear()
    // }
  // },
  
	methods: {

	/* 
    打开登录页面
    */
		login_page(event) {
			this.$refs.account.value = ""
			this.$refs.password.value = ""
			this.$refs.blockUI1.style.display = 'block'
			this.$refs.blockUI2.style.display = 'block'
		},

	/* 
	关闭登录页面
	*/
		close_login_page() {
			this.$refs.blockUI1.style.display = 'none'
			this.$refs.blockUI2.style.display = 'none'
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
						this.close_login_page()
						this.user_info().then(res=>{
							if(res==200 && this.$route.path=='/index'){//当user_info接口调用成功后且当前页面为index时，重新获取文章列表
								this.$nextTick(()=>{
								this.$refs.child.get_article_list() 
								})
							}
							if(res==200 && this.$route.path=='/dynamic_details'){//当user_info接口调用成功后且当前页面为index时，重新获取文章列表
								this.$nextTick(()=>{
								this.$refs.child.get_article_details() 
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
		logout() {
			window.sessionStorage.clear();
			window.localStorage.removeItem('user_id')
			this.login_status = false
			location.reload()
		},

    /* 
    查询用户登录信息
    */
		user_info() {
      		return new Promise((resolve) => {
				this.$axios.get('/api/userinfo', {
					headers: {
						access_token: window.sessionStorage.getItem('access_token')
					}
				})
				.then(resp => {
					if(resp.data.code==200){
						var that = this;
						that.user_message = resp.data.data;
						localStorage.setItem('user_id', resp.data.data.user_id)
						resolve(resp.data.code)
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
				path:'/update_pwd',
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
		open2(message_data) {
			this.$message({
				showClose: true,
				message: message_data,
				type: 'success',
				duration: 1500
			});
		},
		open4(message_content) {
			this.$message({
				showClose: true,
				message: message_content,
				type: 'error',
			});
		},
		handleAvatarSuccess(res, file) {
			this.open2("图片上传成功")
			this.imageUrl = URL.createObjectURL(file.raw);
		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg';
			const isLt2M = file.size / 1024 / 1024 < 2;

			if(!isJPG) {
				this.$message.error('上传头像图片只能是 JPG 格式!');
			}
			if(!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
			}
			return isJPG && isLt2M;
		},

    
	}
}
</script>

<style >
@import url('../../css/index.css');
@import url('../../dfsd/Myproject/src/css/index.css');
@import url('../../css/register_login.css');
</style>