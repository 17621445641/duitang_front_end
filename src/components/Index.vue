<template>
<div id='mid' style='padding-top: 100px;'>
    <div class="content_data">
        <span v-bind:key="index" v-for="(site,index) in article_list" class="ms" >
        <div v-if='(index)%5==0' class="content">
            <div class="image_shadow">
                <img style="width: 100%" class="content_image" src="../dfsd/Myproject/static/image/20220416194019_6d39a.jpg" alt="">
                <div class="shadow" ><span class='tt1'> 点赞</span><span class='tt1'> 收藏</span></div>
            </div>
            <div class="txt_title">{{site.article_title}}</div>
            <div class="txt_author">
                <img class="author_headphoto" src="../dfsd/Myproject/static/image/like.png" alt="">
                <span class="author_name">平方的人ddd </span>
                <img class="txt_like" src="../dfsd/Myproject/static/image/like.png"><span class="click_num">500</span>
            </div>
        </div>
        
    </span>
    </div>
    <div class="content_data">
        <span v-bind:key="index" v-for="(site,index) in article_list"  class="ms" >
        
        <div v-if='(index)%5==1'  class="content">
            <div class="image_shadow">
                <img style="width: 100%" class="content_image" src="../dfsd/Myproject/static/image/20220416194019_6d39a.jpg" alt="">
                <div class="shadow" ><span class='tt1'> 点赞</span><span class='tt1'> 收藏</span></div>
            </div>
            <div class="txt_title">{{site.article_title}}</div>
            <div class="txt_author">
                <img class="author_headphoto" src="../dfsd/Myproject/static/image/like.png" alt="">
                <span class="author_name">平方的人ddd </span>
                <img class="txt_like" src="../dfsd/Myproject/static/image/like.png"><span class="click_num">500</span>
            </div>
        </div>
    </span>
    </div>
    <div class="content_data">
        <span v-bind:key="index" v-for="(site,index) in article_list" class="ms" >
        
        <div v-if='(index)%5==2' class="content">
            <div class="image_shadow">
                <img style="width: 100%" class="content_image" src="../dfsd/Myproject/static/image/20220416194019_6d39a.jpg" alt="">
                <div class="shadow" ><span class='tt1'> 点赞</span><span class='tt1'> 收藏</span></div>
            </div>
            <div class="txt_title">{{site.article_title}}</div>
            <div class="txt_author">
                <img class="author_headphoto" src="../dfsd/Myproject/static/image/like.png" alt="">
                <span class="author_name">平方的人ddd </span>
                <img class="txt_like" src="../dfsd/Myproject/static/image/like.png"><span class="click_num">500</span>
            </div>
        </div>
    </span>
    </div>
    <div class="content_data">
        <span v-bind:key="index" v-for="(site,index) in article_list" class="ms" >
        
        <div v-if='(index)%5==3' class="content">
            <div class="image_shadow">
                <img style="width: 100%" class="content_image" src="../dfsd/Myproject/static/image/20220416194019_6d39a.jpg" alt="">
                <div class="shadow" ><span class='tt1'> 点赞</span><span class='tt1'> 收藏</span></div>
            </div>
            <div class="txt_title">{{site.article_title}}</div>
            <div class="txt_author">
                <img class="author_headphoto" src="../dfsd/Myproject/static/image/like.png" alt="">
                <span class="author_name">平方的人ddd </span>
                <img class="txt_like" src="../dfsd/Myproject/static/image/like.png"><span class="click_num">500</span>
            </div>
        </div>
    </span>
    </div>
    <div class="content_data">
        <span v-bind:key="index" v-for="(site,index) in article_list" class="ms" >
        
        <div v-if='(index)%5==4' class="content">
            <div class="image_shadow">
                <img style="width: 100%" class="content_image" src="../dfsd/Myproject/static/image/20220416194019_6d39a.jpg" alt="">
                <div class="shadow" ><span class='tt1'> 点赞</span><span class='tt1'> 收藏</span></div>
            </div>
            <div class="txt_title">{{site.article_title}}</div>
            <div class="txt_author">
                <img class="author_headphoto" src="../dfsd/Myproject/static/image/like.png" alt="">
                <span class="author_name">平方的人ddd </span>
                <img class="txt_like" src="../dfsd/Myproject/static/image/like.png"><span class="click_num">500</span>
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
      dd:[{"id":1},{"id":2},{"id":3},{"id":4},{"id":5},{"id":6}]

    }
},
created(){
    this.get_article_list()
},
computed:{
    article_list(){
        return this.list.filter(val=>{
            console.log(val)
        })
    }
},
methods: {
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
}
}
}
</script>
<style>
@import url('../dfsd/Myproject/src/css/index.css');
</style>