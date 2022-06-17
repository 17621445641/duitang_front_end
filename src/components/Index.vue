<template>
<div id='mid' style='padding-top: 100px;'>
    <div class="content_data">
        <span v-bind:key="index" v-for="(site,index) in article_list" class="ms" >
        <div v-if='(index)%5==0' class="content">
            <div class="image_shadow" @mouseenter ="overShow($event)"  @mouseleave="outHide($event)">
                <!-- <router-link to="/dynamic_details"> -->
                <img style="width: 100%" class="content_image" :src='site.article_imglist.split("\"")[1]' alt="" >
                <!-- </router-link> -->
                <div @click="dynamic_details(index)"  class="shadow" ></div>
                <!-- <div class="shadow" ><span class='tt1'> 点赞</span><span class='tt1'> 收藏</span></div> -->
            </div>
            <div class="txt_title">{{site.article_content}}</div>
            <div class="txt_author">
                <img class="author_headphoto" :src="site.avatar_image_url" alt="">
                <span class="author_name">{{site.name}} </span>
                <img class="txt_like" src="../dfsd/Myproject/static/image/like.png"><span class="click_num">{{site.click_count}}</span>
            </div>
        </div>
        
    </span>
    
    </div>
    
    <div class="content_data">
        <span v-bind:key="index" v-for="(site,index) in article_list"  class="ms" >
        
        <div v-if='(index)%5==1'  class="content">
            <div class="image_shadow" @mouseenter ="overShow($event)"  @mouseleave="outHide($event)">
                <!-- <router-link to="/dynamic_details"> -->
                <img style="width: 100%" class="content_image" :src='site.article_imglist.split("\"")[1]' alt="" >
                <!-- </router-link> -->
                <div @click="dynamic_details(index)"  class="shadow" ></div>
                <!-- <div class="shadow" ><span class='tt1'> 点赞</span><span class='tt1'> 收藏</span></div> -->
            </div>
            <div class="txt_title">{{site.article_content}}</div>
            <div class="txt_author">
                <img class="author_headphoto" :src="site.avatar_image_url" alt="">
                <span class="author_name">{{site.name}} </span>
                <img class="txt_like" src="../dfsd/Myproject/static/image/like.png"><span class="click_num">{{site.click_count}}</span>
            </div>
        </div>
    </span>
    </div>
    <div class="content_data">
        <span v-bind:key="index" v-for="(site,index) in article_list" class="ms" >
        
        <div v-if='(index)%5==2' class="content">
            <div class="image_shadow" @mouseenter ="overShow($event)"  @mouseleave="outHide($event)">
                <!-- <router-link to="/dynamic_details"> -->
                <img style="width: 100%" class="content_image" :src='site.article_imglist.split("\"")[1]' alt="" >
                <!-- </router-link> -->
                <div @click="dynamic_details(index)"  class="shadow" ></div>
                <!-- <div class="shadow" ><span class='tt1'> 点赞</span><span class='tt1'> 收藏</span></div> -->
            </div>
            <div class="txt_title">{{site.article_content}}</div>
            <div class="txt_author">
                <img class="author_headphoto" :src="site.avatar_image_url" alt="">
                <span class="author_name">{{site.name}} </span>
                <img class="txt_like" src="../dfsd/Myproject/static/image/like.png"><span class="click_num">{{site.click_count}}</span>
            </div>
        </div>
    </span>
    </div>
    <div class="content_data">

        <span v-bind:key="index" v-for="(site,index) in article_list" class="ms" >
        
        <div v-if='(index)%5==3' class="content">
            <div class="image_shadow" @mouseenter ="overShow($event)"  @mouseleave="outHide($event)">
                <!-- <router-link @click="dynamic_details" to="/dynamic_details"> -->
                <img style="width: 100%" class="content_image" :src='site.article_imglist.split("\"")[1]' alt="" >
                <!-- </router-link> -->
                <div @click="dynamic_details(index)"  class="shadow" ></div>
                <!-- <div class="shadow" ><span class='tt1'> 点赞</span><span class='tt1'> 收藏</span></div> -->
            </div>
            <div class="txt_title">{{site.article_content}}</div>
            <div class="txt_author">
                <img class="author_headphoto" :src="site.avatar_image_url" alt="">
                <span class="author_name">{{site.name}}</span>
                <img class="txt_like" src="../dfsd/Myproject/static/image/like.png"><span class="click_num">{{site.click_count}}</span>
            </div>
        </div>
    </span>

    </div>
    <div class="content_data">
        <span v-bind:key="index" v-for="(site,index) in article_list" class="ms" >
        
        <div v-if='(index)%5==4' class="content">
            <div class="image_shadow" @mouseenter ="overShow($event)"  @mouseleave="outHide($event)">
                <!-- <router-link to="/dynamic_details"> -->
                <img style="width: 100%" class="content_image" :src='site.article_imglist.split("\"")[1]' alt="" >
                <!-- </router-link> -->
                <div @click="dynamic_details(index)"  class="shadow" ></div>
                <!-- <div class="shadow" ><span class='tt1'> 点赞</span><span class='tt1'> 收藏</span></div> -->
            </div>
            <div class="txt_title">{{site.article_content}}</div>
            <div class="txt_author">
                <img class="author_headphoto" :src="site.avatar_image_url" alt="">
                <span class="author_name">{{site.name}}</span>
                <img class="txt_like" src="../dfsd/Myproject/static/image/like.png"><span class="click_num">{{site.click_count}}</span>
            </div>
        </div>
        </span>
    </div>
    
    
    
</div>
</template>
<script>
import axios from 'axios'
export default {
    data () {
    return {
      article_list:[],
      message_list:[]
    //   article_id:""

    }
},
created(){
    this.get_article_list()
    this.judge_login()
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
                user_id:this.message_list.user_id
                // user_id:this.article_list[index].user_id
            }
        })
    },
    judge_login(){//判断用户是否登录过
      if(window.sessionStorage.getItem("access_token")!=null){
          console.log(111)
        // this.login_status=true
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
    }
}
</script>
<style>
@import url('../dfsd/Myproject/src/css/index.css');
</style>