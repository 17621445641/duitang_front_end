<template>
<div id="self_message">
    <div class="self_list"><span>昵称：</span><span>{{message_list.user_name}}</span></div>
    <div class="self_list"><span>性别：</span><span>{{message_list.sex}}</span>
    <!-- <input type="radio" name="sex" value="boy" /><span class="sex_option">男</span>
    <input type="radio" name="sex" value="gril" /><span class="sex_option">女</span>
    <input type="radio" name="sex" value="secret" /><span class="sex_option">保密</span> -->
    </div>
    <div class="self_list"><span>生日：</span><span>{{message_list.birthday}}</span></div>
    <div class="self_list"><span>所在地：</span><span>{{message_list.province}}</span></div>
    <div class="self_list"><span>兴趣爱好：</span><span>{{message_list.hobby}}</span></div>
    <div class="self_list"><span>个人简介：</span><span>{{message_list.self_description}}</span></div>
    <!-- <textarea rows="6" cols="40" required="true"></textarea> -->
</div>
</template>

<script>
import axios from 'axios'
// import bootstrap from '../css/bootstrap-4.6.1-dist/js/bootstrap'
export default {
  data(){
    return{
      message_list:{},
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
    }
  }
  
}

</script>

<style>
/* @import url('../css/bootstrap-4.6.1-dist/css/bootstrap.min.css'); */
@import url('../css/Self_message.css');
</style>


