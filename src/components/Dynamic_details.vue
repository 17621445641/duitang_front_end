<template>
<div id="Dynamic_details" >
    <div id="details_message" >
        <div id="dynamic_message" style="background-color:white">
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
                <span  @click="dynamic_click" style="font-size: 8px;cursor: pointer;width: 30%;display: inline-block;text-align: center;"><img v-if="this.click_status!=1" :src="cancel_click_img" alt="" style="width:22px"><img v-else :src="click_img" alt="" style="width:22px"><span style="display: inline-block;margin-left:5px; transform: translateY(-35%);">{{this.click_count}}</span></span>
                <span  style="font-size: 8px;cursor: pointer;width: 38%;display: inline-block;text-align: center;"><img  @click="comment_view($event)" v-if="this.comment_input!=1" :src="cancel_comment_img" alt="" style="width:22px"><img @click="comment_view($event)" v-else :src="comment_img" alt="" style="width:22px"><span style="display: inline-block;margin-left:5px; transform: translateY(-25%);"></span></span>
                <span  @click="dynamic_collect" style="font-size: 8px;cursor: pointer;width: 30%;display: inline-block;text-align: center;"><img v-if="this.collect_status!=1" :src="cancel_collect" alt="" style="width:22px"><img v-else :src="collect" alt="" style="width:22px"><span style="display: inline-block;margin-left:5px; transform: translateY(-25%);"></span></span>
                <div id="comment" style="display:none;">
                    <el-input style="width: 94%;margin-top: 10px;margin-bottom: 10px;"
                    type="textarea"
                    placeholder="发布你的评论~"
                    v-model="comment_publish"
                    maxlength="200"
                    show-word-limit
                    :rows="1"
                    :autosize="{ minRows: 1, maxRows: 18}"
                    >
                    </el-input> 
                    <div style="padding-bottom:10px;border-bottom:1px solid #f7f6f6;margin-bottom:10px"><u @click="publish_comment">评论</u></div>
                    <div id="comment_content" v-if="comment_data.length>0">
                        <span class="content_page" v-bind:key="index" v-for="(site,index) in comment_data">
                            <img class="comment_avatar" :src="authorinfo.avatar_image_url" alt="">
                            <span class="content_right">
                            <div class="comment_user">{{site.user_id}}：
                                <span class="user_content" style="color:red;display:inline-block;color:black;font-size:13px;">{{site.comment}}</span>
                                <div class="comment_time">{{site.create_time}}来自上海
                                    <img   @click="replay_control($event,index)" :src="cancel_comment_img" alt="" style="width:20px;position: relative;left:300px;cursor:pointer">
                                    
                                </div>
                            </div>
                            <div style="display:none" >
                               <el-input style="width: 94%;margin-top: 10px;margin-bottom: 10px;"
                                type="textarea"
                                placeholder="发布你的回复~"
                                v-model="comment_reply"
                                maxlength="200"
                                show-word-limit
                                :rows="1"
                                :autosize="{ minRows: 1, maxRows: 18}"
                                >
                                </el-input> 
                                <div style="padding-bottom:10px;border-bottom:1px solid #f7f6f6;margin-bottom:10px;font-size:14px"><u @click="publish_reply(site.comment_id,site.user_id,$event,index)">回复</u></div>
                            </div>
                            <!-- <div></div> -->
                            <div class="reply_comment" v-bind:key="index" v-for="(site,index) in site.data">
                                <div class="reply_user" >
                                    {{site.user_id}}：
                                    <span class="user_content" style="color:red;display:inline-block;color:black;font-size:13px;margin-bottom: 8px;">{{site.comment}}</span>
                                    <div class="comment_time">22-7-12 05:40 来自上海</div>
                                </div>
                                
                            </div>
                            </span>
                        </span>
                        
                    </div>
                    <div v-else style="text-align: center;color:gray">暂无评论，快来抢占热评吧~</div>
                </div>
            </div>
        </div>
        <div id="details_right" style="border:1px solid rgb(240, 240, 240);border-radius: 10px;background-color:white">
            <span class="hot_title">大家都在搜</span>
            <ul class="hot_search">
                <li v-for="(site,index) in hot_search_data" v-bind:key="index" @click="quick_search(index)">
                    <span>{{index+1}}</span><span ref='hot_content' class="hot_content">{{site.search_word}}</span>
                    <span>
                        <img v-if="lately_host_search_content.slice(0,1).indexOf(site.search_word) !== -1"  src="../assets/hot.png" alt="" style="width:20px;position:relative;bottom:10px">
                        <img v-if="lately_host_search_content.slice(1,3).indexOf(site.search_word) !== -1"  src="../assets/new.png" alt="" style="width:16px;position:relative;bottom:10px">
                    </span>
                    <!-- <img src="../assets/hot.png" alt="" style="width:20px"> -->
                </li>
            </ul>
        </div>
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
import comment from "../assets/comment.png"
import cancel_comment from "../assets/cancel_comment.png"


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
        follow_status:'',
        comment_publish:'',
        comment_img:comment,
        cancel_comment_img:cancel_comment,
        comment_status:0,
        comment_data:[],
        comment_input:0,//控制评论图标的展示
        comment_reply:'',
        hot_search_data:[],//热词原始数据
        lately_hot_search_data:[],//对热词原始数据按时间进行排序
        lately_host_search_content:[]//只保留search_word
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
    this.hot_search()
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
    comment_view(event){
        // console.log(event.target)
        if(event.target.parentElement.nextElementSibling.nextElementSibling.style.display=="block"){
            this.comment_input=0
            event.target.parentElement.nextElementSibling.nextElementSibling.style.display="none"
        }
        else{
            this.comment_input=1
            event.target.parentElement.nextElementSibling.nextElementSibling.style.display="block"
        }
        this.get_comment()
        
    },
    get_comment(){
        axios.get('/api/get_comment',{
            params:{
                article_id:this.article_id
            }
        })
        .then(resp => {
            var that=this
            that.comment_data=resp.data.data
            // console.log(resp.data.data.length)
        }).catch(err => { //
            console.log('请求失败：'+ err.code + ',' + err.message);
        })
    },
    publish_comment(){
        const param={
        "article_id":this.article_id,
        "reply_id":"",
        "user_id":this.user_id,
        "comment":this.comment_publish,
        "reply_user":""
        }
        axios({
                headers: {
                    'access_token': window.sessionStorage.getItem('access_token')
                },
                method: 'post',
                url: '/api/publish_comment',
                data: param
            })
        .then(resp => {
            if(resp.data.code==200){
                this.open2("发布评论成功")
                this.comment_publish=''
                this.get_comment()
                // this.$router.push('/index')
            }
            else{
                this.open3('登录已失效，请重新登录')
            }
            
        }).catch(err => { //
            console.log('请求失败：'+ err.code + ',' + err.message);
        });
    }
    ,
    publish_reply(reply_id,reply_user,event,index){
        const param={
            "article_id":this.article_id,
            "reply_id":reply_id,
            "user_id":this.user_id,
            "comment":this.comment_reply,
            "reply_user":reply_user
        }
        axios({
                headers: {
                    'access_token': window.sessionStorage.getItem('access_token')
                },
                method: 'post',
                url: '/api/publish_comment',
                data: param
            })
        .then(resp => {
            if(resp.data.code==200){
                this.open2("发布评论成功")
                event.target.parentElement.parentElement.style.display='none'
                this.$el.querySelectorAll('.comment_user img')[index].src=this.cancel_comment_img
                this.comment_reply=""
                this.get_comment()
            }
            else{
                this.open3('登录已失效，请重新登录')
            }
            
        }).catch(err => { //
            console.log('请求失败：'+ err.code + ',' + err.message);
        });
    },

    replay_control(event,index){
        if(event.target.parentElement.parentElement.nextElementSibling.style.display == 'block'){
            this.$el.querySelectorAll('.comment_user img')[index].src=this.cancel_comment_img
            event.target.parentElement.parentElement.nextElementSibling.style.display = 'none'
        }
        else{

            this.$el.querySelectorAll('.comment_user img')[index].src=this.comment_img
            event.target.parentElement.parentElement.nextElementSibling.style.display = 'block'
        }
        
        // console.log(event.target)
    },
    hot_search(){
        axios.get('/api/hot_search')
            .then(resp => {
                var that=this;
                that.hot_search_data=resp.data.data
                that.lately_hot_search_data=JSON.parse(JSON.stringify(that.hot_search_data))//深拷贝
                that.lately_hot_search_data.sort((a,b)=>{//按时间倒序排列
                    // console.log(new Date(b.lately_time))
                    return new Date(b.lately_time)-new Date(a.lately_time)
                })
                that.lately_hot_search_data=that.lately_hot_search_data.slice(0,3)
                
                for(var i=0;i<=that.lately_hot_search_data.length;i++){
                    console.log(that.lately_host_search_content)
                    console.log(that.lately_hot_search_data[i].search_word)
                    that.lately_host_search_content.push(that.lately_hot_search_data[i].search_word)
                }
            }).catch(err => { //
                console.log('请求失败：'+ err.code + ',' + err.message);
            })
    },
    quick_search(index){
        const search_word=this.$refs.hot_content[index].innerHTML
        let pathinfo=this.$router.resolve({
            path:'/index',
            query:{
                search_word:search_word
            }
        })
        window.open(pathinfo.href,'_blank')
            // console.log(this.$refs.hot_content[index].innerHTML)
        
    },
    open3(message_content) {
        this.$message({
          showClose: true,
          message: message_content,
          type: 'warning'
        });
    },
    open2(message_content){
        this.$message({
          showClose: true,
          message: message_content,
          type: 'success'
        });
    },
}
}
</script>

<style>
@import url('../css/Dynamic_details.css');
</style>
