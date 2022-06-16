<template>
<div id="Dynamic_details">
    <div id="details_message">
        <div id="dynamic_message">
            <div id="user_info" style="width:100%;">
                <img src="../assets/爱心.png" alt="" style="border:1px solid red;margin-top:20px;width:50px;border-radius:50px;display:inline-block;margin-left:20px">
                <!-- <span ></span> -->
                <span id="user_date">
                    <div id="username">用户名</div>
                    <div id="date">发布日期</div>
                </span>
                <span id="follow">+关注</span>
            </div>
            <div id="dynamic_content">
                {{article_details.article_content}}

                <div id="dynamic_img">
                    <img v-bind:key="index" v-for="(site,index) in article_imgs" :src="site" alt="" ></div>
            </div>
            <div>
                底部
            </div>
        </div>
        <div id="hot_people" style="">热搜</div>
    </div>
    <div></div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data () {
    return {
        article_id:this.$route.query.article_id,
        article_details:[],
        article_imgs:[]
    }
},
created(){
    this.get_article_details()
},
methods:{
    get_article_details(){
    axios.get('/api/article_details',{
            params:{
                article_id:this.article_id
            }
        })
        .then(resp => {
            var that=this;
            that.article_details=resp.data.data;
            that.article_imgs=that.article_details.article_img.replace(/\"/g, '').replace(/\[/g, '').replace(/\]/g, '').split(',')
            //保存图片路径
            // console.log(that.article_imgs)
        }).catch(err => { //
            console.log('请求失败：'+ err.code + ',' + err.message);
        })
},
}
}
</script>

<style>
@import url('../css/Dynamic_details.css');
</style>
