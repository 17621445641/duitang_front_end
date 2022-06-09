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



    
    <span>{{message_list.user_name}}</span></div>
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
      placeholder="选择日期">
    </el-date-picker>
  </div>
  <!-- <span>{{message_list.birthday}}</span> -->
  </div>
    <div class="self_list"><span class="attr">所在地：</span>
    <div class="block" style="display: inline-block">
  <el-cascader
    v-model="value"
    placeholder="试试搜索：城市"
    :options="options"
    :clearable="true"
    filterable
    >
    </el-cascader>
    
    </div>
<!-- <span>{{message_list.province}}</span> -->
</div>
    <div class="self_list"><span class="attr">兴趣爱好：</span>
    <el-input style="width: 400px;"
    type="textarea"
    placeholder="请输入内容"
    v-model="textarea1"
    maxlength="20"
    show-word-limit
    :rows="1"
    >
    </el-input><span>{{message_list.hobby}}</span></div>
    <div class="self_list"><span class="attr">个人简介：</span>
    <el-input style="width: 400px;"
    type="textarea"
    placeholder="请输入内容"
    v-model="textarea2"
    maxlength="100"
    show-word-limit
    :rows="5"
    >
    </el-input><span>{{message_list.self_description}}</span></div>

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
      textarea1: "",
      textarea2: "",
      text: '',
      options:testImportJson,
      radio: 3,
      value1:"",
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
            console.log(that.message_list);
        }).catch(err => { //
            console.log('请求失败：'+ err.code + ',' + err.message);
        });
      },
      update_message(){
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      this.$axios.post('/api/upload_avatar', param, config)
        .then(res => {
          console.log(res)
          if (res.data.code === 200) {
            this.$message.success(res.data.object)
            this.AddGoodsForm = {}
          }
        })
        .catch(err => {
          console.log(err)
        })
    },


  }
  
}

</script>

<style>
/* @import url('../css/bootstrap-4.6.1-dist/css/bootstrap.min.css'); */
@import url('../css/Self_message.css');
</style>


