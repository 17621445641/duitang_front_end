<template>
<div id="Dynamic_details">
    <div id="details_message">
        <div id="dynamic_message">
            <div id="user_info" style="width:100%;">
                <img :src="authorinfo.avatar_image_url" alt="" style="margin-top:20px;width:50px;border-radius:50px;display:inline-block;margin-left:20px">
                <!-- <span ></span> -->
                <span id="user_date">
                    <div id="username">{{authorinfo.user_name}}</div>
                    <div id="date">{{article_details.create_time.split(' ')[0]}}<span class="style_from">发布自网页客户端</span></div>
                </span>
                <span id="follow">+关注</span>
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
                <span  @click="dynamic_click" style="font-size: 8px;cursor: pointer;width: 60%;display: inline-block;text-align: center;"><img v-if="this.click_status!=1" :src="cancel_click_img" alt="" style="width:18px"><img v-else :src="click_img" alt="" style="width:18px"><span style="display: inline-block;margin-left:2px; transform: translateY(-25%);">{{this.click_count}}</span></span>
                <span  @click="dynamic_click" style="font-size: 8px;cursor: pointer;width: 35%;display: inline-block;text-align: center;"><img v-if="this.click_status!=1" :src="cancel_click_img" alt="" style="width:18px"><img v-else :src="click_img" alt="" style="width:18px"><span style="display: inline-block;margin-left:2px; transform: translateY(-25%);">{{this.click_count}}</span></span>
            </div>
        </div>
        <div id="hot_people" style="">热搜</div>
    </div>
    <div></div>
</div>
</template>

<script>
import axios from 'axios'
import click from '../assets/click.png'//点赞图片
import cancel_click from "../assets/cancel_click.png"//取消点赞图片
export default {
    data () {
    return {
        article_id:this.$route.query.article_id,
        author_id:this.$route.query.author_id,
        user_id:this.$route.query.user_id,
        article_details:[],
        article_imgs:[],
        authorinfo:[],
        click_status:"",
        click_img:click,
        cancel_click_img:cancel_click,
        click_count:0
    }   
},
created(){
    this.get_article_details()
    this.get_authorinfo()
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
                   console.log("登录已失效，请重新登录")
                    window.sessionStorage.clear()
                }
                else{
                    console.log("操作失败")
                }
            }).catch((error) => {//catch对应rej
                if(error==1 ||error==2 ||error==3){
                this.open3("登录已失效，请重新登录")
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
                this.open3("登录已失效，请重新登录")
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
                return false
                console.log(err)
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
