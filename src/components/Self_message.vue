<template>
  <div id="self_message">
      <div class="self_list"><span class="attr">昵称：</span>
      <el-input style="width: 220px;"
      type="text"
      placeholder="请输入内容"
      v-model="text"
      maxlength="10"
      show-word-limit
      :rows="1"
      size="small"
      :disabled="is_disabled"
      >
      </el-input>
      
      </div>
      <div class="self_list"><span class="attr">性别：</span>
      <el-radio-group v-model="radio" :disabled="is_disabled">
      <el-radio :label="3">男</el-radio>
      <el-radio :label="6">女</el-radio>
      <el-radio :label="9">保密</el-radio>
      </el-radio-group>
      </div>
      <div class="self_list"><span class="attr">生日：</span>
      <div class="block" style="display: inline-block">
      <el-date-picker
        v-model="value1"
        type="date"
        @input="$forceUpdate()"
        placeholder="选择日期"
        size="small"
        :disabled="is_disabled"
        >
      </el-date-picker>
    </div>
    <!-- <span>{{message_list.birthday}}</span> -->
    </div>
      <div class="self_list"><span class="attr">所在地：</span>
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
      >
      </el-cascader>
      
      </div>
  <!-- <span>{{message_list.province}}</span> -->
  </div>
      <div class="self_list"><span class="attr">兴趣爱好：</span>
      <el-input style="width: 400px;"
      type="textarea"
      placeholder="请输入内容"
      v-model="hobby"
      maxlength="20"
      show-word-limit
      :rows="1"
      size="small"
      :disabled="is_disabled"
      >
      </el-input>
      <!-- <span>{{message_list.hobby}}</span> -->
      </div>
      <div class="self_list"><span class="attr">个人简介：</span>
      <el-input style="width: 400px;"
      type="textarea"
      placeholder="请输入内容"
      v-model="self_description"
      maxlength="15"
      show-word-limit
      :rows="1"
      size="small"
      :disabled="is_disabled"
      >
      </el-input>
      <!-- <span>{{message_list.self_description}}</span> -->
      </div>
      <span id='update_btn'>
        <span v-if="update_code==0" @click="change_btn">编辑资料</span>
        <span v-else  @click="update_message">保存</span>
      </span>
      

      <!-- <textarea rows="6" cols="40" required="true"></textarea> -->
  </div>
</template>

<script>
import testImportJson from '../../static/中华人民共和国.json'
// import bootstrap from '../css/bootstrap-4.6.1-dist/js/bootstrap'
export default {
  data(){
    return{
      message_list:{},
      hobby: "",
      self_description: "",
      text: '',
      options:testImportJson,
      radio: 3,
      value1:"",
      city:[],
      update_code:0,
      is_disabled:true,
      // provice_id:"",
      // city_id:'',
      props:{
        value:'code'
      }

    }
    
    
  },
  created(){
    this.get_usermessage()
  },
  methods:{
      get_usermessage(){
        this.$axios.get('/api/userinfo',{
        headers:{
          access_token:window.sessionStorage.getItem('access_token')
        }
        })
        .then(resp => {
            var that=this;
            that.message_list=resp.data.data[0];
            if(that.message_list.user_name!=null || that.message_list.user_name!=""){
                that.text=that.message_list.user_name
            }
            if(that.message_list.sex=='男' ){
                that.radio=3
            }
            else if(that.message_list.sex=='女'){
                that.radio=6
            }
            else{
                that.radio=9
            }
            if(that.message_list.birthday!=null || that.message_list.user_name!=""){
                that.value1=that.message_list.birthday
            }
            if(that.message_list.hobby!=null || that.message_list.hobby!=""){
                that.hobby=that.message_list.hobby
            }
            if(that.message_list.self_description!=null || that.message_list.self_description!=""){
                that.self_description=that.message_list.self_description
            }
            that.city=[that.message_list.province,that.message_list.city]
        }).catch(err => { //
            console.log('请求失败：'+ err.code + ',' + err.message);
        });
      },
      
      change_btn(){
        if(this.update_code==0){
          this.update_code=1
          this.is_disabled=false
        }
      },

      update_message(){
        const config = {
        headers: {
          'Content-Type': 'application/json',
          'access_token':window.sessionStorage.getItem('access_token')
        }
      }
      const sex=""
        if(this.radio==3 ){
                this.sex='男'
            }
            else if(this.radio==6){
                this.sex='女'
            }
            else{
                this.sex='保密'
            }
        const birthday=""
        if(typeof(this.value1)!="string"){
            this.birthday=this.value1.getFullYear() + '-' + (this.value1.getMonth() + 1) + '-' + this.value1.getDate()
        }
        else{
          this.birthday=this.value1
        }
        const param={
        "user_name":this.text,
        "sex":this.sex,
        "birthday":this.birthday,
        "hobby":this.hobby,
        "province":this.city[0],
        "city":this.city[1],
        "self_description":this.self_description
}
      this.$axios.post('/api/update_userinfo', param, config)
        .then(res => {
          if (res.data.code === 200) {
            this.open2('修改资料成功')
            this.update_code=0
            this.is_disabled=true
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handlechange(value){
      if(value!=""){
        const birthday_data=this.$refs['get_datedata'].getCheckedNodes()
        console.log(birthday_data)
        this.city[0]=birthday_data[0].path[0]
        this.city[1]=birthday_data[0].path[1]
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
@import url('../css/Self_message.css');
</style>


