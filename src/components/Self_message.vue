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
    >
    </el-input>
    <!-- <span>{{message_list.user_name}}</span> -->
    </div>
    <div class="self_list"><span class="attr">性别：</span>
    <el-radio-group v-model="radio" >
    <el-radio :label="3">男</el-radio>
    <el-radio :label="6">女</el-radio>
    <el-radio :label="9">保密</el-radio>
    </el-radio-group>
    <!-- <span>{{message_list.sex}}</span> -->
    <!-- <input type="radio" name="sex" value="boy" /><span class="sex_option">男</span>
    <input type="radio" name="sex" value="gril" /><span class="sex_option">女</span>
    <input type="radio" name="sex" value="secret" /><span class="sex_option">保密</span> -->
    </div>
    <div class="self_list"><span class="attr">生日：</span>
    <div class="block" style="display: inline-block">
    <el-date-picker
      v-model="value1"
      type="date"
      @input="$forceUpdate()"
      placeholder="选择日期"
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
    >
    </el-input>
    <!-- <span>{{message_list.self_description}}</span> -->
    </div>
    <el-button type="primary" @click="update_message">保存更改</el-button>

    <!-- <textarea rows="6" cols="40" required="true"></textarea> -->
</div>
</template>

<script>
import axios from 'axios'
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
          axios.get('/api/userinfo',{
        })
        .then(resp => {
            var that=this;
            that.message_list=resp.data.data;
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
            console.log(that.message_list);
        }).catch(err => { //
            console.log('请求失败：'+ err.code + ',' + err.message);
        });
      },
      open2() {
        this.$message({
          showClose: true,
          message: '更新信息成功',
          type: 'success',
          duration:2000
        });
      },
      open4() {
        this.$message.error('更改信息失败');
      },
      update_message(){
        // console.log(typeof(this.value1))
        // console.log(this.value.data)
        // console.log(this.value1.getFullYear() + '-' + (this.value1.getMonth() + 1) + '-' + this.value1.getDate())
        const config = {
        headers: {
          'Content-Type': 'application/json'
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
      axios.post('/api/update_userinfo', param, config)
        .then(res => {
          console.log(res.data.success)
          if (res.data.code === 200) {
            this.open2()
          }
        })
        .catch(err => {
          this.open4()
          console.log(err)
        })
    },
    handlechange(value){
      if(value!=""){
        const birthday_data=this.$refs['get_datedata'].getCheckedNodes()
        console.log(birthday_data)
        this.city[0]=birthday_data[0].path[0]
        this.city[1]=birthday_data[0].path[1]
      //  console.log(birthday_data[0].path[0])
      // console.log(birthday_data)
      }
    }

  }
  
}

</script>

<style>
/* @import url('../css/bootstrap-4.6.1-dist/css/bootstrap.min.css'); */
@import url('../css/Self_message.css');
</style>


