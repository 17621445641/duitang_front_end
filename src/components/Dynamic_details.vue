<template>
<div id="Dynamic_details">
    <div id="details_message">
        <div id="dynamic_message">
            <div id="user_info" style="width:100%;">
                <img :src="authorinfo.avatar_image_url" alt="">
                <!-- <span ></span> -->
                <span id="user_date">
                    <div id="username">{{authorinfo.user_name}}</div>
                    <div id="date">{{article_details.create_time}}<span class="style_from">发布自网页客户端</span></div>
                </span>
                <span id="follow" @click='follow_other' style="" ><span v-if="follow_status!=1">+关注</span><span v-else>已关注</span></span>
            </div>
            <div >
                <div id="dynamic_content">{{article_details.article_content}}</div>
                <!-- css中有white-space: pre-wrap属性时，标签和内容不能有换行 -->
                <div id="dynamic_img">
                    <!-- <img v-bind:key="index" v-for="(site,index) in article_imgs" :src="site" alt="" > -->
                    <div  class="demo-image__preview">
                    <el-image  v-bind:key="index" v-for="(site,index) in article_imgs"
                        style="width: 100px; height: 100px"
                        :src="site" 
                        :preview-src-list="article_imgs">
                    </el-image>
                    </div>
                </div>
            </div>
            <div id="dynamic_bottom">
                <span  @click="dynamic_click" style="font-size: 8px;cursor: pointer;width: 60%;display: inline-block;text-align: center;"><img v-if="this.click_status!=1" :src="cancel_click_img" alt="" style="width:22px"><img v-else :src="click_img" alt="" style="width:22px"><span style="display: inline-block;margin-left:5px; transform: translateY(-35%);">{{this.click_count}}</span></span>
                <span  @click="dynamic_collect" style="font-size: 8px;cursor: pointer;width: 35%;display: inline-block;text-align: center;"><img v-if="this.collect_status!=1" :src="cancel_collect" alt="" style="width:22px"><img v-else :src="collect" alt="" style="width:22px"><span style="display: inline-block;margin-left:5px; transform: translateY(-25%);"></span></span>
            </div>
        </div>
        <div id="hot_people" style="">猜你喜欢</div>
    </div>
    <div></div>
</div>
</template>

<script>
import axios from 'axios'
import click from '../assets/click.png'//点赞图片
import cancel_click from "../assets/cancel_click.png"//取消点赞图片
import collect from "../assets/collect.png"
import cancel_collect from "../assets/cancel_collect.png"


export default {
    data () {
    return {
        article_id:this.$route.query.article_id,
        author_id:this.$route.query.author_id,
        user_id:"",
        article_details:[],
        article_imgs:[],
        authorinfo:[],
        click_status:"",
        collect_status:"",
        click_img:click,
        cancel_click_img:cancel_click,
        click_count:0,
        collect:collect,
        cancel_collect:cancel_collect,
        article_data:[],
        follow_status:''
    }   
},

created(){
    // const user_id = localStorage.getItem('user_id')
    // if (user_id) {
    //   this.user_id = user_id
    // } else {
    //   this.user_id = this.$route.params.user_id
    //   window.localStorage.setItem('user_id',this.$route.params.user_id)
    //   window.localStorage.setItem('author_id',this.$route.params.author_id)
    //   window.localStorage.setItem('article_id',this.$route.params.article_id)
    // }
    this.article_id=this.$route.query.article_id
    this.author_id=this.$route.query.author_id
    this.user_id=window.localStorage.getItem('user_id')
    this.get_article_details()
    this.get_authorinfo()
    this.is_fllow()
},
methods:{
    
    dynamic_click(){ //点赞和取消点赞
        if(this.click_status!=1){//点赞
            this.click_action(1).then(res => {//then对应resolve
                // console.log('res', res)
                if (res == 200) {
                    this.click_status=1
                    this.click_count=this.click_count+1
                }
                else if(res==1 ||res==2 ||res==3){
                   console.log("账户未登录，请先登录")
                    window.sessionStorage.clear()
                }
                else{
                    console.log("操作失败")
                }
            }).catch((error) => {//catch对应rej
                if(error==1 ||error==2 ||error==3){
                this.open3("账户未登录，请先登录")
                // alert("登录已失效，请重新登录")
                window.sessionStorage.clear()
            }
            })
        }
        else{//取消点赞
            this.click_action(0).then(res => {//then对应resolve
                // console.log('res', res)
                if (res == 200) {
                    this.click_status=0
                    this.click_count=this.click_count-1
                }
                else{
                    console.log("操作失败")
                }
        }).catch((error) => {//catch对应rej
            if(error==1 ||error==2 ||error==3){
                this.open3("账户未登录，请先登录")
                // console.log("登录已失效，请重新登录")
                // alert("登录已失效，请重新登录")
                window.sessionStorage.clear()
            }
        })
        }
    },
    click_action(status_code){
        return new Promise((resolve, rej) => {
            const param={
                "article_id":this.article_id,
                "status":status_code
            }
            axios({
                headers: {
                    'access_token': window.sessionStorage.getItem('access_token')
                },
                method: 'post',
                url: '/api/article_click',
                data: param
            }).then(res => {
            if (res.data.code == 200) {
                resolve(res.data.code)
            
            }
            else{
                rej(res.data.code)
            }
            })
            .catch(err => {
                console.log(err)
                return false
                
            })
        })
        
    },

dynamic_collect(){ //点赞和取消点赞
console.log(this.collect_status)
        if(this.collect_status!=1){//点赞
        
            this.collect_action(1).then(res => {//then对应resolve
                // console.log('res', res)
                if (res == 200) {
                    this.collect_status=1
                    // this.collect_count=this.collect_count+1
                }
                else if(res==1 ||res==2 ||res==3){
                   console.log("账户未登录，请先登录")
                    window.sessionStorage.clear()
                }
                else{
                    console.log("操作失败")
                }
            }).catch((error) => {//catch对应rej
                if(error==1 ||error==2 ||error==3){
                this.open3("账户未登录，请先登录")
                // alert("登录已失效，请重新登录")
                window.sessionStorage.clear()
            }
            })
        }
        else{//取消点赞
            this.collect_action(0).then(res => {//then对应resolve
                // console.log('res', res)
                if (res == 200) {
                    this.collect_status=0
                    // this.collect_count=this.collect_count-1
                }
                else{
                    console.log("操作失败")
                }
        }).catch((error) => {//catch对应rej
            if(error==1 ||error==2 ||error==3){
                this.open3("账户未登录，请先登录")
                // console.log("登录已失效，请重新登录")
                // alert("登录已失效，请重新登录")
                window.sessionStorage.clear()
            }
        })
        }
    },
    collect_action(status_code){
        return new Promise((resolve, rej) => {
            const param={
                "article_id":this.article_id,
                "status":status_code
            }
            axios({
                headers: {
                    'access_token': window.sessionStorage.getItem('access_token')
                },
                method: 'post',
                url: '/api/article_collect',
                data: param
            }).then(res => {
            if (res.data.code == 200) {
                resolve(res.data.code)
            
            }
            else{
                rej(res.data.code)
            }
            })
            .catch(err => {
                console.log(err)
                return false
                
            })
        })
        
    },

    get_article_details(){//查询文章信息
    axios.get('/api/article_details',{
            params:{
                article_id:this.article_id,
                user_id:this.user_id
            }
        })
        .then(resp => {
            var that=this;
            that.article_details=resp.data.data[0];
            // console.log(that.article_details)
            that.article_imgs=that.article_details.article_img.replace(/\"/g, '').replace(/\[/g, '').replace(/\]/g, '').split(',')
            that.click_status=that.article_details.click_status;
            that.click_count=that.article_details.click_count;
            that.collect_status=that.article_details.collect_status;
            
            //保存图片路径
            // console.log(that.article_imgs)
        }).catch(err => { //
            console.log('请求失败：'+ err.code + ',' + err.message);
        })
    },
    get_authorinfo(){//查询作者信息
        axios.get('/api/author_info',{
            params:{
                author_id:this.author_id
            }
        })
        .then(resp => {
            var that=this;
            that.authorinfo=resp.data.data;
            console.log(that.authorinfo)
        }).catch(err => { //
            console.log('请求失败：'+ err.code + ',' + err.message);
        })
    },
    follow_other(){ //点赞和取消点赞
    console.log(this.follow_status)
        if(this.follow_status!=1){//关注
            this.follow_action(1).then(res => {//then对应resolve
                // console.log('res', res)
                if (res == 200) {
                    this.follow_status=1
                }
                else if(res==1 ||res==2 ||res==3){
                   console.log("账户未登录，请先登录")
                    window.sessionStorage.clear()
                }
                else{
                    console.log("操作失败")
                }
            }).catch((error) => {//catch对应rej
                if(error==1 ||error==2 ||error==3){
                    // console.log(error)
                this.open3(1)
                // alert("登录已失效，请重新登录")
                window.sessionStorage.clear()
            }else{
                this.open3(error)
            }
            })
        }
        else{//取消点赞
            this.follow_action(0).then(res => {//then对应resolve
                // console.log('res', res)
                if (res == 200) {
                    this.follow_status=0
                }
                else{
                    console.log("操作失败")
                }
        }).catch((error) => {//catch对应rej
            if(error==1 ||error==2 ||error==3){
                this.open3("账户未登录，请先登录")
                // console.log("登录已失效，请重新登录")
                // alert("登录已失效，请重新登录")
                window.sessionStorage.clear()
            }
            else{
                this.open3(error)
            }
        })
        }
    },
    follow_action(status_code){
        return new Promise((resolve, rej) => {
            const param={
                "be_follow":this.author_id,
                "follow_status":status_code
            }
            axios({
                headers: {
                    'access_token': window.sessionStorage.getItem('access_token')
                },
                method: 'post',
                url: '/api/add_follow',
                data: param
            }).then(res => {
            if (res.data.code == 200) {
                resolve(res.data.code)
            
            }
            else{
                rej(res.data.message)
            }
            })
            .catch(err => {
                console.log(err)
                return false
                
            })
        })
    },
    is_fllow(){
         axios.get('/api/is_follow',{
            headers:{
          access_token:window.sessionStorage.getItem('access_token')
        },
            params:{
                be_follow:this.author_id
            }
        })
        .then(resp => {
            var that=this;
            that.follow_status=resp.data.data[0].follow_status;
            // console.log(that.follow_status)
        }).catch(err => { //
            console.log('请求失败：'+ err.code + ',' + err.message);
        })
    },
    open3(message_content) {
        this.$message({
          showClose: true,
          message: message_content,
          type: 'warning'
        });
      },
}
}
</script>

<style>
@import url('../css/Dynamic_details.css');
</style>
