<template>
    <div id='all'>
        <div id="update_title">
            <img src="../assets/logo.png" alt="">
        </div>
        <div id='update_text' v-if="this.code_status==1">
            <div id="tips"><img src="../assets/tip.png" alt="" style="width:22px">请输入注册的邮箱账户/手机号</div>
            <div class="login_input">
                <span>邮箱或手机号：</span><input type="text" ref="account" placeholder="请输入邮箱或手机号">
            </div><br/>
            <div class="login_input">
                <span>验证码：</span><input type="text" ref="check_code" placeholder="请输入验证码" ><div id="get_code" href="" @click="get_code">获取验证码</div>
                
            </div>
            <div class="abtn"><button type="submit" class="pg-loginbtn" @click="check_code"><u>下一步</u></button></div>
            
        </div>
        <div id='update_text' v-if="this.code_status==2">
            <div id="tips"><img src="../assets/tip.png" alt="" style="width:22px">请输入新密码</div>
            <div class="login_input">
                <span>新密码：</span><input type="password" ref="password" placeholder="请输入新密码" autocomplete="off">
            </div><br/>
            <div class="login_input">
                <span>确认密码：</span><input  type="text" ref="confirm_password" placeholder="请再次输入密码" autocomplete="off">  
            </div>
            <div class="abtn"><button type="submit" class="pg-loginbtn" @click="confirm_update"><u>确认修改</u></button></div>
            
        </div>
    </div>
</template>
<script>
import axios from 'axios'
// import tips from '../components/common/tips.vue'
export default {
  data(){
    return{
        code_status:1,
        update_account:""
    }
    
  },
  
  methods:{
    //获取验证码
    get_code(){
        const param={
        "account": this.$refs.account.value,
      }
        axios.post('/api/check_account',param)
        .then(resp => {
            if(resp.data.code==200){
                alert(resp.data.message)
            }
            else{
                alert(resp.data.message)
            }
            
        }).catch(err => { //
            console.log('请求失败：'+ err.code + ',' + err.message);
        });
    },
    //验证码校验
    check_code(){
        var that=this
        const param={
        "account": this.$refs.account.value,
        "check_code": this.$refs.check_code.value,
      }
        axios.post('/api/check_code',param)
        .then(resp => {
            
            if(resp.data.code==200){
                that.code_status=2
                that.update_account=this.$refs.account.value,
                alert(resp.data.message)
                
            }
            else{
                that.code_status=1
                alert(resp.data.message)
            }
            
        }).catch(err => { //
            console.log('请求失败：'+ err.code + ',' + err.message);
        });
    },
    //确认修改密码
    confirm_update(){
        var that=this
        const param={
        "account": this.update_account,
        "password":this.$refs.password.value,
        "Confirm_password":this.$refs.confirm_password.value,
      }
        axios.post('/api/update_pwd',param)
        .then(resp => {
            if(resp.data.code==200){
                alert(resp.data.message)
                this.$router.push('/index')
                
            }
            else{
                alert(resp.data.message)
            }
            
        }).catch(err => { //
            console.log('请求失败：'+ err.code + ',' + err.message);
        });
    }
    
  },
   open2(message_data) {
        this.$message({
          showClose: true,
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
      },
    // open2(message_data) {
    //     this.$message({
    //     showClose: true,
    //     message: message_data,
    //     type: 'success',
    //     duration:1000
    //     });
    // },
    open4(message_content) {
        this.$message({
        showClose: true,
        message: message_content,
        type: 'error',
        });
    },
}
</script>

<style scoped>
    #update_title{
        text-align: center;
        width:100%;
        background-color: #f6f6f6;
        height: 200px;
    }
    #update_title img{
        display: inline-block;
        position: relative;
        transform: translateY(-50%);
        top:50%;
        width: 100px;
    }
    #tips{
        color: #888;
        font-size: 16px;
        width: 50%;
        text-align: right;
        vertical-align: middle;
        margin: 50px 0;
    }
    #update_text{
        width: 100%;
    }
    .login_input{
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        display: inline-block;

    }
    .login_input input{
    padding: 9px 8px;
    height: 16px;
    width: 170px;
    border: none;
    line-height: 16px;
    background-color: #fff;
    border: 1px solid #e5e4e3;
    font-size: 14px;
}
.login_input span{
    display: inline-block;
    font-size: 16px;
    width: 120px;
    color: #666;
    text-align: right;
    line-height: 35px;
    margin-bottom: 20px;
}
#get_code{
    display: inline-block;
    position:absolute;
    width: 90px;
    border: 1px solid red;
    left: 320px;
    /* margin-left: 0px; */
    right: -20px;
    padding:5px 0px 5px 18px;
    margin-top: 3px;
    background-color: #f54e6a;
    color: white;
    border-radius: 3px;
    font-size: 14px;
}
    .abtn{
    position: relative;
    left: 50%;
    transform: translateX(-80%);
    text-align: center;
    margin-left: 110px;
    width: 220px;
    height: 40px;
    margin-top: 20px;
    background-color: #ff7e7e;
    border-radius: 6px;
    }
    .abtn u {
    display: inline-block;
    padding: 0 16px 0 16px;
    height: 100%;
    font-size: 14px;
    line-height: 31px;
    color: #f7f7f7;
    cursor: pointer;
    text-decoration: none!important;
    }           
    .abtn button {
    width: 100%;
    height: 40px;
    line-height: 40px;
    border: 0 none;
    background: 0 none;
    margin: 0;
    padding: 0;
    cursor: pointer;
    vertical-align: middle;

    }
</style>