<template>
  <router-view>
    
  </router-view>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  data () {
    return {
      message_list:[],
      imageUrl: '',
      login_status:false,
      register_display:'none',
      account:'',
      password:''
      // this_event:'click'
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

  created(){//判断用户是否已登录过
  this.judge_login()
  },
  methods: {
    close_login_page(event){
      event.target.parentElement.parentElement.parentElement.parentElement.style.display = 'none'
      event.target.parentElement.parentElement.parentElement.parentElement.previousElementSibling.style.display = 'none'
    },
    login_page(event){
      this.$refs.account.value=""
      this.$refs.password.value=""
      // console.log(event,  event.target.parentElement)
      event.target.parentElement.parentElement.nextElementSibling.style.display = 'block'
      event.target.parentElement.parentElement.nextElementSibling.nextElementSibling.style.display = 'block'
    },
    user_login(){
      this.account=this.$refs.account.value
      this.password=this.$refs.password.value
      var that=this
      const param={
        "account": this.account,
        "password": this.password
      }
        axios.post("/api/login",param).then(res => {
        console.log(res.data)
        if (res.data.code == 200) {
          sessionStorage.setItem("access_token",res.data.access_token) 
          that.login_status=true
          this.user_info()
          // this.get_article_list()
          location.reload()
          
        }
        else{
          this.open4(res.data.message)
        }
        })
        .catch(err => {
        //   this.open4()
          console.log(err)
        })
    },
    user_register(){
      let account=this.$refs.account.value
      let password=this.$refs.password.value
      let confirm_password=this.$refs.confirm_password.value
      var that=this
      const param={
        "account": account,
        "password": password,
        "Confirm_password":confirm_password
      }
      axios.post("/api/register",param).then(res => {
        console.log(res.data)
        if (res.data.code == 200) {
          this.account=account
          this.password=password
          this.open2(res.data.message)
          
          this.user_login()
          
        }
        else{
          this.open4(res.data.message)
        }
        })
        .catch(err => {
        //   this.open4()
          console.log(err)
        })
    },
    logout(){
      window.sessionStorage.clear();
      window.localStorage.removeItem('user_id')
      this.login_status=false
      this.$router.push('/index')
      location.reload()  
      
    },
    user_info(){
      axios.get('/api/userinfo',{
        headers:{
          access_token:window.sessionStorage.getItem('access_token')
        }
        })
        .then(resp => {
            var that=this;
            that.message_list=resp.data.data;
            localStorage.setItem('user_id',resp.data.data.user_id)
            // location.reload()
            // console.log(that.message_list.user_id)
        }).catch(err => { //
            console.log('请求失败：'+ err.code + ',' + err.message);
        });
    },

    judge_login(){//判断用户是否登录过
      if(window.sessionStorage.getItem("access_token")!=null){
        this.login_status=true
        this.user_info()
      }

    },
    goback_index(){//返回首页
      this.$router.push('/index')
    },
    overShow(event){
      event.currentTarget.firstElementChild.nextElementSibling.style.display = 'block'
    },
    outHide(event){
      event.currentTarget.firstElementChild.nextElementSibling.style.display = 'none'
    },
    register(event){
      if(this.register_display=='block'){
        event.target.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.style.display = 'none'
        this.register_display='none'
      }
      else{
        event.target.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.style.display = 'block'
        this.register_display='block'
      }
      
    },
    get_article_list(){
        axios.get('/api/article_list',{
            params:{
                user_id:window.localStorage.getItem('user_id')
            }
            })
            .then(resp => {
                // console.log((that.article_list).length)
            }).catch(err => { //
                console.log('请求失败：'+ err.code + ',' + err.message);
            })
    },
    open2(message_data) {
        this.$message({
          showClose: true,
          message: message_data,
          type: 'success',
          duration:1000
        });
      },
      open4(message_content) {
        this.$message({
          showClose: true,
          message: message_content,
          type: 'error',
        });
      },
    handleAvatarSuccess( res, file) {
        this.open2("图片上传成功")
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      update_password(){
        window.open('/son', '_blank')
      }
      
    // update_avatar(){
    //   // this.$refs.upload.
    //   this.$refs.fileRef.dispatchEvent(new MouseEvent('click'))
    //   const file = this.$refs.img.files[0]
    //   console.log(file)
    //   const param = new FormData()
    //   param.append('file', file)
    //   const config = {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   }
    //   this.$axios.post('/api/upload_avatar', param, config)
    //     .then(res => {
    //       console.log(res)
    //       if (res.data.code === 200) {
    //         this.$message.success(res.data.object)
    //         this.AddGoodsForm = {}
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // },
    // fileChange(){
    //   // const file = this.$refs.files[0].name
    //   const file = document.getElementById('up_file').value
    //   // console.log(file)
    //   const files="E:\/商品图片\/b1c2f157a769f21ca146648c26cc9f5a.jpeg"
    //   console.log(files)
    //   const param = new FormData()
    //   param.append('file', files)
    //   const config = {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   }
    //   axios.post('/api/upload_avatar', param, config)
    //     .then(res => {
    //       console.log(res)
    //       if (res.data.code === 200) {
    //         this.$message.success(res.data.object)
    //         this.AddGoodsForm = {}
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // },
    
    // click_method(){
    // if(this.from_path=='/like'){
    //   axios.get('/api/click_list',{
    //     })
    //     .then(resp => {
    //         var that=this
    //         that.click_list=resp.data.data;
    //         console.log(2)
    //         console.log(that.click_list)
    //     }).catch(err => { //
    //         console.log('请求失败：'+ err.code + ',' + err.message);
    //     });
    // }
      
    // }
    // click_history(){
    //   axios.get('/api/click_list',{
    //     })
    //     .then(resp => {
    //         var that=this;
    //         that.click_list=resp.data.data;
    //         // console.log(that.message_list);
    //     }).catch(err => { //
    //         console.log('请求失败：'+ err.code + ',' + err.message);
    //     });
    // }
  }
}
</script>

<style >
body,html{
    border: 0;
    padding: 0;
    margin: 0;
}
</style>
