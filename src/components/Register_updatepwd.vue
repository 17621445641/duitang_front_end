<template>
    <div id='all'>
        <div id="update_title">
            <router-link to="/index">
            <img src="../assets/logo1.png" alt="">
            </router-link>
            <div style="margin-top:50px">
                <span class="option_action" @click="change_page(1)" v-if="option_action==1" style="color:red;text-decoration:underline">注册</span>
                <span class="option_action" v-else  @click="change_page(1)">注册</span>
                <span class="option_action" @click="change_page(2)" v-if="option_action==2" style="color:red;text-decoration:underline">忘记密码</span>
                <span class="option_action" v-else  @click="change_page(2)">忘记密码</span>
            </div>
        </div>
        <!-- option_action=1为注册页面 -->
        <div v-if="this.option_action==1">
            <div id='update_text'>
                <div id="tips"><img src="../assets/tip.png" alt="" style="width:22px">请输入注册的邮箱或手机号</div>
                <div class="login_input">
                    <span>邮箱或手机号：</span><input type="text" ref="account" placeholder="请输入邮箱或手机号" >
                </div><br/>
                <div class="login_input">
                    <span>验证码：</span><input type="text" ref="check_code" placeholder="请输入验证码" maxlength='6'>
                    <div id="get_code" href="" @click="get_code">获取验证码</div>
                </div>
                <div id='update_text'>
                    <div class="login_input">
                    <span>密码：</span><input type="password" ref="password" placeholder="请输入密码" autocomplete="off" maxlength='12' @keyup.enter="user_register">
                </div><br/>
                </div>
                <div class="abtn" ><button @click="user_register" type="submit" class="pg-loginbtn" ><u>注册</u></button><span @click="return_login" >已有账户?返回登录</span></div>
            </div>
        </div>
        <!-- option_action=2为修改密码页面 -->
        <div v-if="this.option_action==2">
            <div id='update_text' v-show="this.code_status==1">
                <div id="tips"><img src="../assets/tip.png" alt="" style="width:22px">请输入注册的邮箱或手机号</div>
                <div class="login_input">
                    <span>邮箱或手机号：</span><input type="text" ref="account" placeholder="请输入邮箱或手机号" >
                </div><br/>
                <div class="login_input">
                    <span>验证码：</span><input type="text" ref="check_code" placeholder="请输入验证码" maxlength='6' @keyup.enter="check_code">
                    <div id="get_code" href="" @click="get_code">获取验证码</div>
                </div>
                <div class="abtn" ><button @click="check_code" type="submit" class="pg-loginbtn" ><u>下一步</u></button><span @click="return_login">返回登录</span></div>
            </div>
            <div id='update_text' v-show="this.code_status==2">
                <div id="tips"><img src="../assets/tip.png" alt="" style="width:22px">请输入新密码</div>
                <div class="login_input">
                    <span>新密码：</span><input type="password" ref="password" placeholder="请输入新密码" autocomplete="off" maxlength='12'>
                </div><br/>
                <div class="login_input">
                    <span>确认密码：</span><input type="password" ref="confirm_password" placeholder="请再次输入密码" autocomplete="off" maxlength='12' @keyup.enter="confirm_update">  
                </div>
                <div class="abtn" ><button @click="confirm_update" type="submit" class="pg-loginbtn" ><u>确认修改</u></button><span @click="return_login" >返回登录</span></div>
            </div>
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
        option_action:this.$route.query.option_action,//根据option_action显示注册页面或修改密码页面
        update_account:"",

    }
    
  },
  
  methods:{
    /* 
    控制注册页面和忘记密码页面展示，acition=1显示注册页面，action=2显示忘记密码页面
    */
        change_page(action){
            if(action==1){
                this.option_action="1"
                this.$refs.account.value=''
                this.$refs.password.value=''
                this.$refs.check_code.value=''
            }
            if(action==2){
                this.option_action="2"
                this.code_status='1'
                this.$refs.account.value=''
                this.$refs.check_code.value=''
                this.$nextTick(() => {
                this.$refs.password.value=''
                this.$refs.confirm_password.value=''
                })
            }
            
        },

      /*
    获取验证码
    */
        get_code(){
            const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
            const regMobile= /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
            if(this.$refs.account.value==""){
            this.open4("请输入邮箱或手机号")
            return
            }
            if(!regEmail.test(this.$refs.account.value)&&!regMobile.test(this.$refs.account.value)){
            this.open4("请输入正确的邮箱或手机号")
            return
            }
            const param={
            "account": this.$refs.account.value,
            "option_action":this.option_action
            }
            axios.post('/api/send_code',param)
            .then(resp => {
                if(resp.data.code==200){
                    this.open2(resp.data.message)
                }
                else{
                    this.open4(resp.data.message)
                }
                
            }).catch(err => { //
                console.log("接口调用异常"+err);
            });
        },


    /*
    验证码校验
    */
        check_code(){
        return new Promise((resolve) => {
            const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
            const regMobile= /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
            var that=this
            const param={
            "account": this.$refs.account.value,
            "check_code": this.$refs.check_code.value,
            "option_action":this.option_action
        }
        if(this.$refs.account.value==""){
            this.open4("请输入邮箱或手机号")
        }
        else if(!regEmail.test(this.$refs.account.value)&&!regMobile.test(this.$refs.account.value)){
            this.open4("请输入正确的邮箱或手机号")
        }
        else if (this.$refs.check_code.value=="") {
            this.open4("请输入验证码")
        } else { 
            axios.post('/api/check_code',param)
            .then(resp => {
                if(resp.data.code==200){
                    resolve(resp.data.code)
                    that.code_status=2
                    that.update_account=this.$refs.account.value 
                }
                else{
                    // rej(resp.data.code)
                    that.code_status=1
                    this.open4(resp.data.message)
                }
                
            }).catch(err => { //
                console.log("接口调用异常"+err);
            });
        }
        })    
        },

    /* 
    用户注册
    */
        user_register() {
            this.check_code().then(res=>{
            if(res==200){
            let account = this.$refs.account.value
            let password = this.$refs.password.value
            if(password==""){
                this.open4("请输入密码")
                return
            }
            const param = {
                "account": account,
                "password": password,
            }
            this.$axios.post("/api/register", param)
                .then(resp => {
                    if(resp.data.code == 200) {
                        this.$router.push('/index')
                        this.open2(resp.data.message)
                    } else {
                        this.open4(resp.data.message)
                    }
                })
                .catch(err => {
                    console.log("接口调用异常"+err)
                })
                }
            })
        },


    /*
    确认修改密码
    */
        confirm_update(){
            const param={
            "account": this.update_account,
            "password":this.$refs.password.value,
            "Confirm_password":this.$refs.confirm_password.value,
        }
        if(this.$refs.password.value==""){
            this.open4("请输入新密码")
        }else if(this.$refs.confirm_password.value==""){
            this.open4("请再次输入密码")
        }
        else{
            axios.post('/api/update_pwd',param)
            .then(resp => {
                if(resp.data.code==200){
                    this.open2("修改密码成功，请重新登录")
                    this.$router.push('/index')
                }
                else{
                    this.open4(resp.data.message)
                }
                
            }).catch(err => { //
                console.log("接口调用异常"+err);
            });
        }  
        },


    /*
    返回首页
    */
        return_login(){
            this.$router.push('/index')
        },

    open2(message_data) {
        this.$message({
        showClose: true,
        message: message_data,
        type: 'success',
        duration:2500
        });
    },
    open4(message_content) {
        this.$message({
        showClose: true,
        message: message_content,
        type: 'error',
        });
    },
    
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
        width: 150px;
    }
    .option_action{
        color:rgb(86, 120, 160) ;
        font-size: 13px;
        padding: 2px 5px;
        cursor: pointer;
    }
    .option_action:hover{
        color: red;
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
        cursor: pointer;
        display: inline-block;
        position:absolute;
        width: 90px;
        border: 1px solid red;
        left: 320px;
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
        height: 100%;
        font-size: 14px;
        line-height: 31px;
        color: #f7f7f7;
        text-decoration: none!important;
    }           
    .abtn button {
        cursor: pointer;
        width: 100%;
        /* width: 100%; */
        height: 40px;
        line-height: 40px;
        border: 0 none;
        background: 0 none;
        margin: 0;
        padding: 0;
        cursor: pointer;
        vertical-align: middle;

    }
    .abtn span{
        display: inline-block;
        padding:2px 5px;
        /* position: absolute; */
        left: 100%;
        top: 50%;
        margin-top: 10px;
        /* transform: translateY(50%); */
        font-size: 14px;
        color: rgb(86, 120, 160);
        cursor: pointer;
    }
    .abtn span:hover{
        color: red;
    }
    
</style>