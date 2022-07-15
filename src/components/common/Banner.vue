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
						<span v-if="register_display=='none'">登录</span>
						<span v-else>注册</span>
					</span>
					<span>
						<img @click="close_login_page($event)" style="width:18px;position:absolute;right:10px;top:10px;padding:4px;cursor: pointer;" src="../../assets/关闭.png" alt="">
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
								<a v-if="register_display=='none'" class="pswd-forget" @click="update_password" style="cursor:pointer">忘记密码？</a>
							</div>
							<div class="login_input" style="display: none;">
								<span>确认密码：</span>
								<input type="password" ref="confirm_password" placeholder="请再次输入密码" maxlength='12' @keyup.enter="user_register">
							</div>
							<div class="u-chk">
								<!-- <div class="u-chk-remenber-me">
                <span><input class="chk" type="checkbox" name="remember" id="poplogin-rem" value="" checked=""></span>
                <label for="poplogin-rem">记住我</label>
                </div> -->
							</div>
							<div class="abtn">
								<button type="submit" class="pg-loginbtn" @click="user_login" v-if="register_display=='none'">
									<u>登录</u>
								</button>
								<button type="submit" class="pg-loginbtn" @click="user_register" v-else>
									<u>提交注册</u>
								</button>
							</div>
						</div>
						<div id='web_image' style="width:205px">
							<img src="../../assets/qr_code.png" alt="" style="width:130px;position:relative;left:40px">
							<div style="color:black; width:100%;text-align: center;">扫码了解更多</div>
						</div>
						<div class="toreg">
							<span id="register" @click="register($event)" style="color:#5678a0 ;">
								<span v-if="register_display=='none'">还没有账号?立即注册</span>
								<span v-else>已有账户?去登录</span>
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
			register_display: 'none',
			account: '',
			password: '',
			mess: this.$route.query.search_word//获取路由携带的参数
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
    关闭登录页面
    */
		close_login_page(event) {
      this.$refs.blockUI1.style.display = 'none'
      this.$refs.blockUI2.style.display = 'none'
		},

    /* 
    打开登录页面
    */
		login_page(event) {
			this.$refs.account.value = ""
			this.$refs.password.value = ""
      this.$refs.confirm_password.value=""
			event.target.parentElement.parentElement.parentElement.nextElementSibling.style.display = 'block'
			event.target.parentElement.parentElement.parentElement.nextElementSibling.nextElementSibling.style.display = 'block'
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
            this.user_info().then(res=>{
              if(res==200 && this.$route.path=='/index'){//当user_info接口调用成功后且当前页面为index时，重新获取文章列表
                this.$nextTick(()=>{
		            this.$refs.child.get_article_list() 
	              })
              }
            })
            this.close_login_page()

					} else {
						this.open4(resp.data.message)
					}
				})
				.catch(err => {
					console.log("接口调用异常"+err)
				})
		},

    /* 
    用户注册
    */
		user_register() {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      const regMobile= /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
			let account = this.$refs.account.value
			let password = this.$refs.password.value
			let confirm_password = this.$refs.confirm_password.value
      if(account==""){
        this.open4("请输入邮箱或手机号")
        return
      }
      if(!regEmail.test(account)&&!regMobile.test(account)){
        this.open4("请输入正确的邮箱或手机号")
        return
      }
      if(password==""){
        this.open4("请输入密码")
        return
      }
      if(confirm_password==""){
        this.open4("请再次输入密码")
        return
      }
			// var that = this
			const param = {
				"account": account,
				"password": password,
				"Confirm_password": confirm_password
			}
			this.$axios.post("/api/register", param)
				.then(resp => {
					if(resp.data.code == 200) {
            location.reload()
						this.open2(resp.data.message)

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
			// this.$router.push('/index')
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
          resolve(resp.data.code)
          var that = this;
          that.user_message = resp.data.data;
          localStorage.setItem('user_id', resp.data.data.user_id)
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

    
		// overShow(event) {
		// 	event.currentTarget.firstElementChild.nextElementSibling.style.display = 'block'
		// },
		// outHide(event) {
		// 	event.currentTarget.firstElementChild.nextElementSibling.style.display = 'none'
		// },

    /* 
    登录和注册页面切换
    */
		register(event) {
			if(this.register_display == 'block') {
				event.target.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.style.display = 'none'
				this.register_display = 'none'
			} else {
				event.target.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.style.display = 'block'
				this.register_display = 'block'
			}

		},

     /* 
    获取文章列表
    */
		// get_article_list() {
		// 	this.$axios.get('/api/article_list', {
		// 			params: {
		// 				user_id: window.localStorage.getItem('user_id')
		// 			}
		// 		})
		// 		.then(resp => {
		// 			// console.log((that.article_list).length)
		// 		})
		// 		.catch(err => { //
		// 			console.log('请求失败：' + err.code + ',' + err.message);
		// 		})
		// },
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

    /* 
    跳转忘记密码和修改密码页面
    */
		update_password() {
			window.open('/update_pwd', '_blank')
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
	}
}
</script>

<style >
@import url('../../css/index.css');
@import url('../../dfsd/Myproject/src/css/index.css');
@import url('../../css/register_login.css');
</style>