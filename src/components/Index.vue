<template>
<div id='mid' style='padding-top: 100px;'>
    <div class="content_data" >
        <span v-bind:key="index" v-for="(site,index) in article_list" class="ms" >
        <div v-if='(index)%5==0 && site.article_id!=""' class="content" >
            <div class="image_shadow" @mouseenter ="overShow($event)"  @mouseleave="outHide($event)" >
                <!-- <router-link to="/dynamic_details"> -->
                <img style="width: 100%" class="content_image" :src='site.article_imglist.split("\"")[1]' alt="" >
                <!-- </router-link> -->
                <div @click="dynamic_details(index)"  class="shadow" ></div>
                <!-- <div class="shadow" ><span class='tt1'> 点赞</span><span class='tt1'> 收藏</span></div> -->
            </div>
            <div class="txt_content" >{{site.article_content}}</div>
            <div class="txt_author">
                <img class="author_headphoto" :src="site.avatar_image_url" alt="">
                <span class="author_name">{{site.name}} </span>
                <img class="txt_like" @click="dynamic_click(index)" v-if="site.click_status!=1" :src="cancel_click_img" alt="" ><img @click="dynamic_click(index)" class="txt_like" v-else :src="click_img" alt="" >
                <span class="click_num" v-if="site.click_count==null">0</span><span class="click_num" v-else>{{site.click_count}}</span>
            </div>
        </div>
        
    </span>
    
    </div>
    
    <div class="content_data">
        <span v-bind:key="index" v-for="(site,index) in article_list"  class="ms" >
        
        <div v-if='(index)%5==1&& site.article_id!=""'  class="content">
            <div class="image_shadow" @mouseenter ="overShow($event)"  @mouseleave="outHide($event)">
                <!-- <router-link to="/dynamic_details"> -->
                <img style="width: 100%" class="content_image" :src='site.article_imglist.split("\"")[1]' alt="" >
                <!-- </router-link> -->
                <div @click="dynamic_details(index)"  class="shadow" ></div>
                <!-- <div class="shadow" ><span class='tt1'> 点赞</span><span class='tt1'> 收藏</span></div> -->
            </div>
            <div class="txt_content">{{site.article_content}}</div>
            <div class="txt_author">
                <img class="author_headphoto" :src="site.avatar_image_url" alt="">
                <span class="author_name">{{site.name}} </span>
                <img class="txt_like" @click="dynamic_click(index)" v-if="site.click_status!=1" :src="cancel_click_img" alt="" ><img @click="dynamic_click(index)" class="txt_like" v-else :src="click_img" alt="" >
                <span class="click_num" v-if="site.click_count==null">0</span><span class="click_num" v-else>{{site.click_count}}</span>
            </div>
        </div>
    </span>
    </div>
    <div class="content_data">
        <span v-bind:key="index" v-for="(site,index) in article_list" class="ms" >
        
        <div v-if='(index)%5==2&& site.article_id!=""' class="content">
            <div class="image_shadow" @mouseenter ="overShow($event)"  @mouseleave="outHide($event)">
                <!-- <router-link to="/dynamic_details"> -->
                <img style="width: 100%" class="content_image" :src='site.article_imglist.split("\"")[1]' alt="" >
                <!-- </router-link> -->
                <div @click="dynamic_details(index)"  class="shadow" ></div>
                <!-- <div class="shadow" ><span class='tt1'> 点赞</span><span class='tt1'> 收藏</span></div> -->
            </div>
            <div class="txt_content">{{site.article_content}}</div>
            <div class="txt_author">
                <img class="author_headphoto" :src="site.avatar_image_url" alt="">
                <span class="author_name">{{site.name}} </span>
                <img class="txt_like" @click="dynamic_click(index)" v-if="site.click_status!=1" :src="cancel_click_img" alt="" ><img @click="dynamic_click(index)" class="txt_like" v-else :src="click_img" alt="" >
                <span class="click_num" v-if="site.click_count==null">0</span><span class="click_num" v-else>{{site.click_count}}</span>
            </div>
        </div>
    </span>
    </div>
    <div class="content_data">

        <span v-bind:key="index" v-for="(site,index) in article_list" class="ms" >
        
        <div v-if='(index)%5==3&& site.article_id!=""' class="content">
            <div class="image_shadow" @mouseenter ="overShow($event)"  @mouseleave="outHide($event)">
                <!-- <router-link @click="dynamic_details" to="/dynamic_details"> -->
                <img style="width: 100%" class="content_image" :src='site.article_imglist.split("\"")[1]' alt="" >
                <!-- </router-link> -->
                <div @click="dynamic_details(index)"  class="shadow" ></div>
                <!-- <div class="shadow" ><span class='tt1'> 点赞</span><span class='tt1'> 收藏</span></div> -->
            </div>
            <div class="txt_content">{{site.article_content}}</div>
            <div class="txt_author">
                <img class="author_headphoto" :src="site.avatar_image_url" alt="">
                <span class="author_name">{{site.name}}</span>
                <img class="txt_like" @click="dynamic_click(index)" v-if="site.click_status!=1" :src="cancel_click_img" alt="" ><img @click="dynamic_click(index)" class="txt_like" v-else :src="click_img" alt="" >
                <span class="click_num" v-if="site.click_count==null">0</span><span class="click_num" v-else>{{site.click_count}}</span>
            </div>
        </div>
    </span>

    </div>
    <div class="content_data">
        <span v-bind:key="index" v-for="(site,index) in article_list" class="ms" >
        
        <div v-if='(index)%5==4&& site.article_id!=""' class="content">
            <div class="image_shadow" @mouseenter ="overShow($event)"  @mouseleave="outHide($event)">
                <!-- <router-link to="/dynamic_details"> -->
                <img style="width: 100%" class="content_image" :src='site.article_imglist.split("\"")[1]' alt="" >
                <!-- </router-link> -->
                <div @click="dynamic_details(index)"  class="shadow" ></div>
                <!-- <div class="shadow" ><span class='tt1'> 点赞</span><span class='tt1'> 收藏</span></div> -->
            </div>
            <div class="txt_content">{{site.article_content}}</div>
            <div class="txt_author">
                <img class="author_headphoto" :src="site.avatar_image_url" alt="">
                <span class="author_name">{{site.name}}</span>
                <img class="txt_like" @click="dynamic_click(index)" v-if="site.click_status!=1" :src="cancel_click_img" alt="" ><img @click="dynamic_click(index)" class="txt_like" v-else :src="click_img" alt="" >
                <span class="click_num" v-if="site.click_count==null">0</span><span class="click_num" v-else>{{site.click_count}}</span>
            </div>
        </div>
        </span>
    </div>
    
    
    
</div>
</template>
<script>
import axios from 'axios'
import click from '../assets/click.png'//点赞图片
import cancel_click from "../assets/cancel_click.png"//取消点赞图片
export default {
    data () {
    return {
        article_list:[],
        message_list:[],
        click_img:click,
        cancel_click_img:cancel_click,
    //   article_id:""

    }
},
created(){
    this.get_article_list()
    // this.judge_login()
    // console.log(this.article_list)
},
methods: {
    overShow(event){
        // console.log(this)
        event.target.firstElementChild.nextElementSibling.style.display = 'block'
    },
    outHide(event){
        //  console.log(this)
        event.target.firstElementChild.nextElementSibling.style.display = 'none'
    },
    get_article_list(){
        axios.get('/api/article_list',{
            params:{
                user_id:window.localStorage.getItem('user_id')
            }
            })
            .then(resp => {
                var that=this;
                that.article_list=resp.data.data;
                // console.log((that.article_list).length)
            }).catch(err => { //
                console.log('请求失败：'+ err.code + ',' + err.message);
            })
    },
    dynamic_details(index){
        //console.log(index)//获取当前点击的index
        // this.article_list[index].article_id)
        this.$router.push({
            path:'/dynamic_details',
            query:{
                article_id:this.article_list[index].article_id,
                author_id:this.article_list[index].author_id,
                // user_id:this.article_list[index].user_id
            }
        })
    },
    judge_login(){//判断用户是否登录过
      if(window.sessionStorage.getItem("access_token")!=null){
        this.login_status=true
        this.user_info()
      }

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
        }).catch(err => { //
            console.log('请求失败：'+ err.code + ',' + err.message);
        });
    },
    dynamic_click(index){ //点赞和取消点赞
    // console.log(this.article_list[index].click_status)
        if(this.article_list[index].click_status!=1){//点赞
            this.click_action(1,this.article_list[index].article_id).then(res => {//then对应resolve
                // console.log('res', res)
                if (res == 200) {
                    console.log(this.article_list[index].click_status)
                    this.article_list[index].click_status=1
                    this.article_list[index].click_count=this.article_list[index].click_count+1
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
            this.click_action(0,this.article_list[index].article_id).then(res => {//then对应resolve
                // console.log('res', res)
                if (res == 200) {
                    this.article_list[index].click_status=0
                    this.article_list[index].click_count=this.article_list[index].click_count-1
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
    click_action(status_code,article_id){
        return new Promise((resolve, rej) => {
            const param={
                "article_id":article_id,
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
@import url('../dfsd/Myproject/src/css/index.css');
</style>