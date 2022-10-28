<template>
	<div id="self_message">
		<div class="self_list">
			<span class="attr">昵称：</span>
			<el-input style="width: 220px;"
					  type="text"
					  placeholder="请输入内容"
					  v-model="message_list.user_name"
					  maxlength="10"
					  show-word-limit
					  :rows="1"
					  size="small"
					  :disabled="is_disabled">
			</el-input>

		</div>
		<div class="self_list">
			<span class="attr">性别：</span>
			<el-radio-group v-model="radio" :disabled="is_disabled">
				<el-radio :label="3">男</el-radio>
				<el-radio :label="6">女</el-radio>
				<el-radio :label="9">保密</el-radio>
			</el-radio-group>
		</div>
		<div class="self_list">
			<span class="attr">生日：</span>
			<div class="block" style="display: inline-block">
				<el-date-picker
								v-model="message_list.birthday"
								type="date"
								@input="$forceUpdate()"
								placeholder="选择日期"
								size="small"
								:disabled="is_disabled">
				</el-date-picker>
			</div>
		</div>
		<div class="self_list">
			<span class="attr">所在地：</span>
			<div class="block" style="display: inline-block">
				<el-cascader
							 ref='get_datedata'
							 @change="handlechange"
							 v-model="city"
							 placeholder="试试搜索：城市"
							 :options="options"
							 :clearable="true"
							 :props="props"
							 size="small"
							 :disabled="is_disabled"
							 filterable>
				</el-cascader>

			</div>
		</div>
		<div class="self_list">
			<span class="attr">兴趣爱好：</span>
			<el-input style="width: 400px;font-size:14px"
					  type="textarea"
					  placeholder="请输入内容"
					  v-model="message_list.hobby"
					  maxlength="20"
					  show-word-limit
					  :rows="1"
					  size="small"
					  :disabled="is_disabled">
			</el-input>
		</div>
		<div class="self_list">
			<span class="attr">个人简介：</span>
			<el-input style="width: 400px;;font-size:14px"
					  type="textarea"
					  placeholder="请输入内容"
					  v-model="message_list.self_description"
					  maxlength="15"
					  show-word-limit
					  :rows="1"
					  size="small"
					  :disabled="is_disabled">
			</el-input>
		</div>
		<span id='update_btn'>
			<span v-if="update_code==0" @click="change_btn">编辑资料</span>
			<span v-else @click="save_message">保存</span>
		</span>
	</div>
</template>

<script>
import testImportJson from '../../static/中华人民共和国.json'
export default {
	data() {
		return {
			message_list: {},
			options: testImportJson,
			radio: 3,
			city: [],
			update_code: 0,
			is_disabled: true,
			props: {
				value: 'code'
			}

		}


	},
	created() {
		this.get_usermessage()
	},
	methods: {
		/* 
		  获取用户个人信息
		*/
		get_usermessage() {
			this.$axios.get('/api/userinfo', {
					headers: {
						access_token: window.localStorage.getItem('access_token')
					}
				})
				.then(resp => {
					var that = this;
					that.message_list = resp.data.data[0];
					if (that.message_list.sex == '男') {
						that.radio = 3
					} else if (that.message_list.sex == '女') {
						that.radio = 6
					} else {
						that.radio = 9
					}
					that.city = [that.message_list.province, that.message_list.city]
				})
				.catch(err => { //
					console.log('请求失败：' + err.code + ',' + err.message);
				});
		},
		/* 
		  更改按钮控制
		*/
		change_btn() {
			if (this.update_code == 0) {
				this.update_code = 1
				this.is_disabled = false
			}
		},
		/* 
    更改用户信息
  */
		save_message() {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					'access_token': window.localStorage.getItem('access_token')
				}
			}
			const sex = ""
			if (this.radio == 3) {
				this.sex = '男'
			} else if (this.radio == 6) {
				this.sex = '女'
			} else {
				this.sex = '保密'
			}
			const birthday = ""
			if (this.message_list.user_name == "") {
				this.open4('请输入用户名')
				return
			}
			if (this.message_list.birthday == "" || this.message_list.birthday == null) {
				this.open4('请选择出生日期')
				return
			}
			if (this.city[1] == 'None' || this.city[1] == '') {
				this.open4('请选择所在地')
				return
			} else {
				if (typeof(this.message_list.birthday) != "string") {
					this.birthday = this.message_list.birthday.getFullYear() + '-' + (this.message_list.birthday.getMonth() + 1) + '-' + this.message_list.birthday.getDate()
				} else {
					this.birthday = this.message_list.birthday
				}
				const param = {
					"user_name": this.message_list.user_name,
					"sex": this.sex,
					"birthday": this.birthday,
					"hobby": this.message_list.hobby,
					"province": this.city[0],
					"city": this.city[1],
					"self_description": this.message_list.self_description
				}
				this.$axios.post('/api/update_userinfo', param, config)
					.then(res => {
						if (res.data.code === 200) {
							this.open2('修改资料成功')
							this.update_code = 0
							this.is_disabled = true
						}
					})
					.catch(err => {
						console.log(err)
					})
			}

		},
		/* 
    控制省市级联选择器
  */
		handlechange(value) {
			if (value == "") {
				this.city[0] = "",
					this.city[1] = ""
			}
		},

		open2(message_content) {
			this.$message({
				showClose: true,
				message: message_content,
				type: 'success',
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
@import url('../css/Self_message.css');
</style>


