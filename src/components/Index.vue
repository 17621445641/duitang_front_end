<template>
<div id='mid' style='padding-top: 100px;'>
    <img @click="goScrollTop" ref="go_scrolltop"  src="../assets/scrolltop.png" alt="" id='go_scrolltop' >
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
					<img class="author_headphoto" :src="site.avatar_image_url" alt="" @click='go_homepage(index)'>
					<span class="author_name">{{site.name}} </span>
					<img class="txt_like" @click="dynamic_like(index,1)" v-if="site.like_status!=1" :src="cancel_like_img" alt="">
					<img @click="dynamic_like(index,0)" class="txt_like" v-else :src="like_img" alt="">
					<span class="click_num" v-if="site.like_count==null">0</span>
					<span class="click_num" v-else>{{site.like_count}}</span>
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
					<img class="author_headphoto" :src="site.avatar_image_url" alt="" @click='go_homepage(index)'>
					<span class="author_name">{{site.name}} </span>
					<img class="txt_like" @click="dynamic_like(index,1)" v-if="site.like_status!=1" :src="cancel_like_img" alt="">
					<img @click="dynamic_like(index,0)" class="txt_like" v-else :src="like_img" alt="">
					<span class="click_num" v-if="site.like_count==null">0</span>
					<span class="click_num" v-else>{{site.like_count}}</span>
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
					<img class="author_headphoto" :src="site.avatar_image_url" alt="" @click='go_homepage(index)'>
					<span class="author_name">{{site.name}} </span>
					<img class="txt_like" @click="dynamic_like(index,1)" v-if="site.like_status!=1" :src="cancel_like_img" alt="">
					<img @click="dynamic_like(index,0)" class="txt_like" v-else :src="like_img" alt="">
					<span class="click_num" v-if="site.like_count==null">0</span>
					<span class="click_num" v-else>{{site.like_count}}</span>
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
					<img class="author_headphoto" :src="site.avatar_image_url" alt="" @click='go_homepage(index)'>
					<span class="author_name">{{site.name}}</span>
					<img class="txt_like" @click="dynamic_like(index,1)" v-if="site.like_status!=1" :src="cancel_like_img" alt="">
					<img @click="dynamic_like(index,0)" class="txt_like" v-else :src="like_img" alt="">
					<span class="click_num" v-if="site.like_count==null">0</span>
					<span class="click_num" v-else>{{site.like_count}}</span>
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
					<img class="author_headphoto" :src="site.avatar_image_url" alt="" @click='go_homepage(index)'>
					<span class="author_name">{{site.name}}</span>
					<img class="txt_like" @click="dynamic_like(index,1)" v-if="site.like_status!=1" :src="cancel_like_img" alt="">
					<img @click="dynamic_like(index,0)" class="txt_like" v-else :src="like_img" alt="">
					<span class="click_num" v-if="site.like_count==null">0</span>
					<span class="click_num" v-else>{{site.like_count}}</span>
				</div>
			</div>
		</span>
	</div>
</div>
</template>
<script>
import like from '../assets/like.png'//点赞图片
import cancel_like from "../assets/cancel_like.png"//取消点赞图片
export default {
    data () {
        return {
            article_list:[],
            // article_id:9999,
            message_list:[],
            like_img:like,
            cancel_like_img:cancel_like,

        }
    },

    created(){
        window.addEventListener("scroll", this.scrollHandle);
        this.get_article_list(this.$route.query.search_word)
    },
    destroyed(){
        window.removeEventListener("scroll", this.scrollHandle);
    },
    methods: {

    /* 
    回到顶部
    */
        goScrollTop(){
            window.scrollTo({
                top:0,
                left:0,
                behavior:'smooth'
            })
        },

    /* 
    控制回到顶部按钮展示
    */
        scrollHandle(e){
            let top = e.srcElement.scrollingElement.scrollTop;    // 获取页面滚动高度
            if(top>=1*(window.innerHeight)){
                this.$refs.go_scrolltop.style.display='block'
            }
            else{
                this.$refs.go_scrolltop.style.display='none'
            } 
        },


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
    文章喜欢/取消喜欢,like_action=1为喜欢,like_action=0为取消喜欢
    */  
        dynamic_like(index,like_action){ //喜欢和取消喜欢
            var that=this
            const param={
                "article_id":this.article_list[index].article_id,
                "status":like_action
            }
            this.$axios({
                headers: {
                    'access_token': window.localStorage.getItem('access_token')
                },
                method: 'post',
                url: '/api/article_like',
                data: param
            }).then(resp => {
            if (resp.data.code == 200) {
                if(like_action==1){
                    that.article_list[index].like_status=1
                    this.article_list[index].like_count=this.article_list[index].like_count+1
                }
                else{
                    that.article_list[index].like_status=0
                    this.article_list[index].like_count=this.article_list[index].like_count-1
                }
            
            }
            else{
                if(resp.data.code==1){
                    window.localStorage.clear()
                    window.localStorage.clear()
                    this.open3("登录已失效，请重新登录")
                }else if(resp.data.code==2 ||resp.data.code==3){
                    window.localStorage.clear()
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

    /* 
    跳转作者主页
    */    
        go_homepage(index){
            if(this.article_list[index].author_id==window.localStorage.getItem('user_id')){
                this.$router.push('/personal_center/dynamic_list')
            }
            else{
                let new_window=this.$router.resolve({
				path:'/homepage/author_dynamic',
				query:{
					author_id:this.article_list[index].author_id
				}
			    })
			    window.open(new_window.href, '_blank')
            }
            
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