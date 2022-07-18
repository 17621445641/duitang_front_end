<template>
<div id='mid' style='padding-top: 100px;'>
	<div class="content_data">
		<span v-bind:key="index" v-for="(site,index) in article_list" class="ms">
			<div v-if='(index)%5==0 && site.article_id!=""' class="content">
				<div class="image_shadow" @mouseenter="overShow($event)" @mouseleave="outHide($event)">
					<img style="width: 100%" class="content_image" :src='site.article_imglist.split("\"")[1]' alt="">
					<div @click="dynamic_details(index)" class="shadow"></div>
					<!-- <div class="shadow" ><span class='tt1'> 点赞</span><span class='tt1'> 收藏</span></div> -->
				</div>
				<div class="txt_content">{{site.article_content}}</div>
				<div class="txt_author">
					<img class="author_headphoto" :src="site.avatar_image_url" alt="">
					<span class="author_name">{{site.name}} </span>
					<img class="txt_like" @click="dynamic_click(index,1)" v-if="site.click_status!=1" :src="cancel_click_img" alt="">
					<img @click="dynamic_click(index,0)" class="txt_like" v-else :src="click_img" alt="">
					<span class="click_num" v-if="site.click_count==null">0</span>
					<span class="click_num" v-else>{{site.click_count}}</span>
				</div>
			</div>
		</span>
	</div>
	<div class="content_data">
		<span v-bind:key="index" v-for="(site,index) in article_list" class="ms">
			<div v-if='(index)%5==1&& site.article_id!=""' class="content">
				<div class="image_shadow" @mouseenter="overShow($event)" @mouseleave="outHide($event)">
					<img style="width: 100%" class="content_image" :src='site.article_imglist.split("\"")[1]' alt="">
					<div @click="dynamic_details(index)" class="shadow"></div>
					<!-- <div class="shadow" ><span class='tt1'> 点赞</span><span class='tt1'> 收藏</span></div> -->
				</div>
				<div class="txt_content">{{site.article_content}}</div>
				<div class="txt_author">
					<img class="author_headphoto" :src="site.avatar_image_url" alt="">
					<span class="author_name">{{site.name}} </span>
					<img class="txt_like" @click="dynamic_click(index,1)" v-if="site.click_status!=1" :src="cancel_click_img" alt="">
					<img @click="dynamic_click(index,0)" class="txt_like" v-else :src="click_img" alt="">
					<span class="click_num" v-if="site.click_count==null">0</span>
					<span class="click_num" v-else>{{site.click_count}}</span>
				</div>
			</div>
		</span>
	</div>
	<div class="content_data">
		<span v-bind:key="index" v-for="(site,index) in article_list" class="ms">
			<div v-if='(index)%5==2&& site.article_id!=""' class="content">
				<div class="image_shadow" @mouseenter="overShow($event)" @mouseleave="outHide($event)">
					<img style="width: 100%" class="content_image" :src='site.article_imglist.split("\"")[1]' alt="">
					<div @click="dynamic_details(index)" class="shadow"></div>
					<!-- <div class="shadow" ><span class='tt1'> 点赞</span><span class='tt1'> 收藏</span></div> -->
				</div>
				<div class="txt_content">{{site.article_content}}</div>
				<div class="txt_author">
					<img class="author_headphoto" :src="site.avatar_image_url" alt="">
					<span class="author_name">{{site.name}} </span>
					<img class="txt_like" @click="dynamic_click(index,1)" v-if="site.click_status!=1" :src="cancel_click_img" alt="">
					<img @click="dynamic_click(index,0)" class="txt_like" v-else :src="click_img" alt="">
					<span class="click_num" v-if="site.click_count==null">0</span>
					<span class="click_num" v-else>{{site.click_count}}</span>
				</div>
			</div>
		</span>
	</div>
	<div class="content_data">
		<span v-bind:key="index" v-for="(site,index) in article_list" class="ms">
			<div v-if='(index)%5==3&& site.article_id!=""' class="content">
				<div class="image_shadow" @mouseenter="overShow($event)" @mouseleave="outHide($event)">
					<img style="width: 100%" class="content_image" :src='site.article_imglist.split("\"")[1]' alt="">
					<div @click="dynamic_details(index)" class="shadow"></div>
					<!-- <div class="shadow" ><span class='tt1'> 点赞</span><span class='tt1'> 收藏</span></div> -->
				</div>
				<div class="txt_content">{{site.article_content}}</div>
				<div class="txt_author">
					<img class="author_headphoto" :src="site.avatar_image_url" alt="">
					<span class="author_name">{{site.name}}</span>
					<img class="txt_like" @click="dynamic_click(index,1)" v-if="site.click_status!=1" :src="cancel_click_img" alt="">
					<img @click="dynamic_click(index,0)" class="txt_like" v-else :src="click_img" alt="">
					<span class="click_num" v-if="site.click_count==null">0</span>
					<span class="click_num" v-else>{{site.click_count}}</span>
				</div>
			</div>
		</span>
	</div>
	<div class="content_data">
		<span v-bind:key="index" v-for="(site,index) in article_list" class="ms">
			<div v-if='(index)%5==4&& site.article_id!=""' class="content">
				<div class="image_shadow" @mouseenter="overShow($event)" @mouseleave="outHide($event)">
					<img style="width: 100%" class="content_image" :src='site.article_imglist.split("\"")[1]' alt="">
					<div @click="dynamic_details(index)" class="shadow"></div>
					<!-- <div class="shadow" ><span class='tt1'> 点赞</span><span class='tt1'> 收藏</span></div> -->
				</div>
				<div class="txt_content">{{site.article_content}}</div>
				<div class="txt_author">
					<img class="author_headphoto" :src="site.avatar_image_url" alt="">
					<span class="author_name">{{site.name}}</span>
					<img class="txt_like" @click="dynamic_click(index,1)" v-if="site.click_status!=1" :src="cancel_click_img" alt="">
					<img @click="dynamic_click(index,0)" class="txt_like" v-else :src="click_img" alt="">
					<span class="click_num" v-if="site.click_count==null">0</span>
					<span class="click_num" v-else>{{site.click_count}}</span>
				</div>
			</div>
		</span>
	</div>
</div>
</template>
<script>
import click from '../assets/click.png'//点赞图片
import cancel_click from "../assets/cancel_click.png"//取消点赞图片
export default {
    data () {
        return {
            article_list:[],
            article_id:9999,
            message_list:[],
            click_img:click,
            cancel_click_img:cancel_click,

        }
    },

    created(){
        this.get_article_list(this.$route.query.search_word)
    },

    methods: {

    /* 
    控制蒙版的显示
    */
        overShow(event){
            event.target.firstElementChild.nextElementSibling.style.display = 'block'
        },
        outHide(event){
            event.target.firstElementChild.nextElementSibling.style.display = 'none'
        },

    /* 
    获取文章列表
    */
        get_article_list(search_word){
            this.$axios.get('/api/article_list',{
                params:{
                    user_id:window.localStorage.getItem('user_id'),
                    search_word:search_word
                }
                })
                .then(resp => {
                    var that=this;
                    that.article_list=resp.data.data;
                }).catch(err => { //
                    console.log("接口调用异常"+err);
                })
        },

    /* 
    跳转文章详情页面
    */    
        dynamic_details(index){
            this.$router.push({
                path:'/dynamic_details',
                query:{
                    article_id:this.article_list[index].article_id,
                    author_id:this.article_list[index].author_id,
                }
            })
        },

    /* 
    文章点赞/取消点赞,click_action=1为点赞,click_action=0为取消点赞
    */  
        dynamic_click(index,click_action){ //点赞和取消点赞
            var that=this
            const param={
                "article_id":this.article_list[index].article_id,
                "status":click_action
            }
            this.$axios({
                headers: {
                    'access_token': window.sessionStorage.getItem('access_token')
                },
                method: 'post',
                url: '/api/article_click',
                data: param
            }).then(resp => {
            if (resp.data.code == 200) {
                if(click_action==1){
                    that.article_list[index].click_status=1
                    this.article_list[index].click_count=this.article_list[index].click_count+1
                }
                else{
                    that.article_list[index].click_status=0
                    this.article_list[index].click_count=this.article_list[index].click_count-1
                }
            
            }
            else{
                if(resp.data.code==1){
                    window.sessionStorage.clear()
                    window.localStorage.clear()
                    this.open3("登录已失效，请重新登录")
                }else if(resp.data.code==2 ||resp.data.code==3){
                    window.sessionStorage.clear()
                    window.localStorage.clear()
                    this.open3("账户未登录，请先登录")
                }else{
                    this.open3(resp.data.message)
                }
            }
            })
            .catch(err => {
                console.log("接口调用异常"+err)
                return false
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
@import url('../css/index.css');
</style>