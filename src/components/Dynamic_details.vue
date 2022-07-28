<template>
<div id="Dynamic_details">
	<div id="details_message">
		<div id="dynamic_message" style="background-color:white">
			<div id="user_info" style="width:100%;">
				<img :src="authorinfo.avatar_image_url" alt="">
				<span id="user_date">
					<div id="username">{{authorinfo.user_name}}</div>
					<div id="date">{{article_details.create_time}}
					<span class="style_from">发布自网页客户端</span>
					</div>
				</span>
				<span style="" v-if="authorinfo.user_id!=this.user_id">
					<span id="follow"  v-if="follow_status!=1" @click='follow_author(1)'>+关注</span>
					<span id="follow"  v-else @click='follow_author(0)'>已关注</span>
				</span>
			</div>
			<div>
				<div id="dynamic_content">{{article_details.article_content}}</div>
				<!-- css中有white-space: pre-wrap属性时，标签和内容不能有换行 -->
				<div id="dynamic_img" >
					<!-- <img v-bind:key="index" v-for="(site,index) in article_imgs" :src="site" alt="" > -->
					<div class="demo-image__preview">
						<el-image v-bind:key="index" v-for="(site,index) in article_imgs"
                            style="width: 100px; height: 100px"
                            :src="site"
                            :preview-src-list="article_imgs">
						</el-image>
					</div>
				</div>
			</div>
			<div id="dynamic_bottom">
				<span style="font-size: 8px;cursor: pointer;width: 30%;display: inline-block;text-align: center;">
					<img @click="dynamic_like(1)" v-if="this.like_status!=1" :src="cancel_like_img" alt="" style="width:22px">
					<img @click="dynamic_like(0)" v-else :src="like_img" alt="" style="width:22px">
					<span style="display: inline-block;margin-left:5px; transform: translateY(-35%);">{{this.like_count}}</span>
				</span>
				<span style="font-size: 8px;cursor: pointer;width: 38%;display: inline-block;text-align: center;">
					<img @click="comment_view($event)" v-if="this.comment_input!=1" :src="cancel_comment_img" alt="" style="width:22px">
					<img @click="comment_view($event)" v-else :src="comment_img" alt="" style="width:22px">
					<span style="display: inline-block;margin-left:5px; transform: translateY(-25%);"></span>
				</span>
				<span  style="font-size: 8px;cursor: pointer;width: 30%;display: inline-block;text-align: center;">
					<img @click="dynamic_collect(1)" v-if="this.collect_status!=1" :src="cancel_collect" alt="" style="width:22px">
					<img @click="dynamic_collect(0)" v-else :src="collect" alt="" style="width:22px">
					<span style="display: inline-block;margin-left:5px; transform: translateY(-25%);"></span>
				</span>
				<div id="comment" style="display:none;">
					<el-input style="width: 80%;margin-top: 10px;margin-bottom: 10px;"
                        type="textarea"
                        placeholder="发布你的评论~"
                        v-model="comment_publish"
                        maxlength="200"
                        show-word-limit
                        :rows="1"
                        :autosize="{ minRows: 1, maxRows: 18}">
					</el-input>
					<div style="padding-bottom:10px;border-bottom:1px solid #f7f6f6;margin-bottom:10px;margin-right:48px">
						<u @click="publish_comment()">评论</u>
					</div>
					<div id="comment_content" v-if="comment_data.length>0">
						<span class="content_page" v-bind:key="index" v-for="(site,index) in comment_data">
							<img class="comment_avatar" :src="site.avatar_image_url" alt="">
							<span class="content_right">
								<div class="comment_user">{{site.user_name}}：
									<span class="user_content" style="color:red;display:inline-block;color:black;font-size:13px;">{{site.comment}}</span>
									<div class="comment_time">发布于 {{site.create_time}}
										<img class='reply_img' @click="replay_control($event,index)" :src="cancel_comment_img" alt="" style="width:20px;position: relative;left:290px;cursor:pointer;top:5px">
                                        <img @click="comment_click(1,index)" v-if='site.click_status!=1' :src="cancel_comment_click_img" alt="" style="width:20px;position: relative;left:300px;cursor:pointer;top:4px">
                                        <img @click="comment_click(0,index)" v-else :src="comment_click_img" alt="" style="width:20px;position: relative;left:300px;cursor:pointer;top:4px">
                                        <span style="position: relative;left:300px;cursor:pointer;top:0px">{{site.click_count}}</span>
									</div>
								</div>
								<div  ref="comment_reply" style="display:none" class="what">
									<el-input style="width: 94%;margin-top: 10px;margin-bottom: 10px;" 
                                        type="textarea"
                                        placeholder="发布你的回复~"
                                        v-model="comment_reply"
                                        maxlength="200"
                                        show-word-limit
                                        :rows="1"
                                        :autosize="{ minRows: 1, maxRows: 18}">
									</el-input>
									<div style="padding-bottom:10px;border-bottom:1px solid #f7f6f6;margin-bottom:10px;font-size:14px">
										<u @click="publish_comment(site.comment_id,site.user_id,$event,index)">回复</u>
									</div>
								</div>
                                <!-- 第二层评论 -->
								<div class="reply_comment" v-bind:key="index2" v-for="(site,index2) in site.data">
									<div class="reply_user">
										{{site.user_name}}：
										<span class="user_content" style="color:red;display:inline-block;color:black;font-size:13px;margin-bottom: 8px;">{{site.comment}}</span>
										<div class="comment_time">发布于 {{site.create_time}} 
                                        </div>
									</div>
								</div>
							</span>
						</span>
					</div>
					<div v-else style="text-align: center;color:gray;line-height:100px;">暂无评论，快来抢占热评吧~</div>
				</div>
			</div>
		</div>
		<div id="details_right" style="border:1px solid rgb(240, 240, 240);border-radius: 10px;background-color:white">
			<span class="hot_title">大家都在搜</span>
			<ul class="hot_search">
				<li v-for="(site,index) in hot_search_data" v-bind:key="index" @click="quick_search(index)">
					<span>{{index+1}}</span>
					<span ref='hot_content' class="hot_content">{{site.search_word}}</span>
					<span>
						<img v-if="lately_host_search_content.slice(0,1).indexOf(site.search_word) !== -1" src="../assets/hot.png" alt="" style="width:20px;position:relative;bottom:10px">
						<img v-if="lately_host_search_content.slice(1,3).indexOf(site.search_word) !== -1" src="../assets/new.png" alt="" style="width:16px;position:relative;bottom:10px">
					</span>
				</li>
			</ul>
		</div>
	</div>
	<div></div>
</div>
</template>

<script>
import like from '../assets/like.png'//喜欢图片
import cancel_like from "../assets/cancel_like.png"//取消喜欢图片
import collect from "../assets/collect.png"//收藏图片
import cancel_collect from "../assets/cancel_collect.png"//取消收藏图片
import comment from "../assets/comment.png"//评论图片
import cancel_comment from "../assets/cancel_comment.png"//取消评论图片
import comment_click from '../assets/click.png'
import cancel_comment_click from '../assets/cancel_click.png'


export default {
    data () {
        return {
            last_index:"",
            article_id:this.$route.query.article_id,
            author_id:this.$route.query.author_id,
            user_id:window.localStorage.getItem('user_id'),
            article_details:[],
            article_imgs:[],
            authorinfo:[],
            like_status:"",
            collect_status:"",
            like_img:like,
            cancel_like_img:cancel_like,
            like_count:0,
            collect:collect,
            cancel_collect:cancel_collect,
            article_data:[],
            follow_status:'',
            comment_publish:'',
            comment_img:comment,
            cancel_comment_img:cancel_comment,
            comment_data:[],
            comment_input:0,//控制评论图标的展示
            comment_reply:'',//二级评论输入框
            hot_search_data:[],//热词原始数据
            lately_hot_search_data:[],//对热词原始数据按时间进行排序
            lately_host_search_content:[],//只保留search_word
            comment_click_img:comment_click,
            cancel_comment_click_img:cancel_comment_click,
        }   
},

    created(){
    this.article_id=this.$route.query.article_id
    this.author_id=this.$route.query.author_id
    this.get_article_details()
    this.get_authorinfo()
    this.is_fllow()
    this.hot_search()
    },

    methods:{

    /* 
    查询文章详细信息
    */
        get_article_details(){
        this.$axios.get('/api/article_details',
            {
                params:{
                    article_id:this.article_id,
                    user_id:this.user_id
                }
            })
            .then(resp => {
                var that=this;
                that.article_details=resp.data.data[0];
                that.article_imgs=that.article_details.article_img.replace(/\"/g, '').replace(/\[/g, '').replace(/\]/g, '').split(',')
                that.like_status=that.article_details.like_status;
                that.like_count=that.article_details.like_count;
                that.collect_status=that.article_details.collect_status;
            }).catch(err => { //
                console.log('请求失败：'+ err.code + ',' + err.message);
            })
        },

    /* 
    查询文章作者信息
    */
        get_authorinfo(){
            this.$axios.get('/api/author_info',{
                params:{
                    author_id:this.author_id
                }
            })
            .then(resp => {
                var that=this;
                that.authorinfo=resp.data.data;
            }).catch(err => { //
                console.log('请求失败：'+ err.code + ',' + err.message);
            })
        },

    /* 
    查询文章作者是否被关注
    */
        is_fllow(){
            this.$axios.get('/api/is_follow',{
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
            }).catch(err => { //
                console.log('请求失败：'+ err.code + ',' + err.message);
            })
        },
    /* 
    用户关注/取消关注,follow_action=1为关注,follow_action=0为取消关注
    */
        follow_author(follow_action){
            var that=this
            const param={
                "be_follow":this.author_id,
                "follow_status":follow_action
            }
            this.$axios({
                headers: {
                    'access_token': window.sessionStorage.getItem('access_token')
                },
                method: 'post',
                url: '/api/add_follow',
                data: param
            }).then(resp => {
            if (resp.data.code == 200) {
                if(follow_action==1){
                    that.follow_status=1
                }
                else{
                    that.follow_status=0
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

    
    /* 
    文章喜欢/取消喜欢,like_action=1为喜欢,like_action=0为取消喜欢
    */
        dynamic_like(like_action){
            var that=this
            const param={
                "article_id":this.article_id,
                "status":like_action
            }
            this.$axios({
                headers: {
                    'access_token': window.sessionStorage.getItem('access_token')
                },
                method: 'post',
                url: '/api/article_like',
                data: param
            }).then(resp => {
            if (resp.data.code == 200) {
                if(like_action==1){
                    that.like_status=1
                    this.like_count=this.like_count+1
                }
                else{
                    that.like_status=0
                    this.like_count=this.like_count-1
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

    /* 
    文章收藏/取消收藏,collect_action=1为收藏,collect_action=0为取消收藏
    */

        dynamic_collect(collect_action){
            var that=this
            const param={
                "article_id":this.article_id,
                "status":collect_action
            }
            this.$axios({
                headers: {
                    'access_token': window.sessionStorage.getItem('access_token')
                },
                method: 'post',
                url: '/api/article_collect',
                data: param
            }).then(resp => {
            if (resp.data.code == 200) {
                if(collect_action==1){
                    that.collect_status=1
                }
                else{
                    that.collect_status=0
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



    /* 
    控制评论区的展示
    */
        comment_view(event){
            this.comment_publish=""
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

    /* 
    查询文章的评论信息
    */
        get_comment(){
            this.$axios.get('/api/get_comment',{
                params:{
                    article_id:this.article_id,
                    user_id:window.localStorage.getItem('user_id')
                }
            })
            .then(resp => {
                var that=this
                that.comment_data=resp.data.data
            }).catch(err => { //
                console.log("接口调用异常"+err);
            })
        },

    /* 
    发布文章评论
    */
        publish_comment(reply_id,reply_user,event,index){
            let comment
            if(reply_id==undefined){//发布评论无需传reply_id，replay_id==undefined
                comment=this.comment_publish
            }
            else{//发布回复评论需传reply_id，replay_id
                comment=this.comment_reply
            }
            const param={
                "article_id":this.article_id,
                "reply_id":reply_id,
                "user_id":this.user_id,
                "comment":comment,
                "reply_user":reply_user
            }
            this.$axios({
                    headers: {
                        'access_token': window.sessionStorage.getItem('access_token')
                    },
                    method: 'post',
                    url: '/api/publish_comment',
                    data: param
                })
            .then(resp => {
                if (resp.data.code == 200) {
                    this.open2("发布评论成功")
                    this.get_comment()
                    if(reply_id==undefined){//发布评论
                        this.comment_publish=''
                    }
                    else{//发布回复评论
                        event.target.parentElement.parentElement.style.display='none'
                        this.$el.querySelectorAll('.comment_user img')[index].src=this.cancel_comment_img
                        this.comment_reply=""
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
            }).catch(err => { //
                console.log("接口调用异常"+err);
            });
        },


    /* 
    控制回复评论区的展示
    */
        replay_control(event,index){
            this.comment_reply=""
            if(event.target.parentElement.parentElement.nextElementSibling.style.display == 'block'){
                this.$nextTick(()=>{
                this.$el.querySelectorAll('.comment_user .reply_img')[index].src=this.cancel_comment_img
                event.target.parentElement.parentElement.nextElementSibling.style.display = 'none'
                }) 
            }
            else{   
                if(this.last_index===""){
                }
                else{
                    this.$el.querySelectorAll('.what')[this.last_index].style.display='none'
                    this.$el.querySelectorAll('.comment_user .reply_img')[this.last_index].src=this.cancel_comment_img
                }
                    this.$el.querySelectorAll('.what')[index].style.display='block'
                    this.$el.querySelectorAll('.comment_user .reply_img')[index].src=this.comment_img
                    this.last_index=index
            }
        },


    /* 
    评论点赞/取消点赞,click_action=1为点赞,click_action=0为取消点赞
    */

        comment_click(click_action,index){
            var that=this
            const param={
                "comment_id":this.comment_data[index].comment_id,
                "status":click_action
            }
            this.$axios({
                headers: {
                    'access_token': window.sessionStorage.getItem('access_token')
                },
                method: 'post',
                url: '/api/comment_click',
                data: param
            }).then(resp => {
            if (resp.data.code == 200) {
                if(click_action==1){
                    // console.log(that.comment_data[index].click_status)
                    // that.article_list[index].like_status=1
                    that.comment_data[index].click_status=1
                    that.comment_data[index].click_count=that.comment_data[index].click_count+1
                }
                else{
                    that.comment_data[index].click_status=0
                    that.comment_data[index].click_count=that.comment_data[index].click_count-1
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

    /* 
    查询热搜推荐信息
    */
        hot_search(){
            this.$axios.get('/api/hot_search')
                .then(resp => {
                    var that=this;
                    that.hot_search_data=resp.data.data
                    that.lately_hot_search_data=JSON.parse(JSON.stringify(that.hot_search_data))//深拷贝
                    that.lately_hot_search_data.sort((a,b)=>{//按时间倒序排列,最新的为热词
                        return new Date(b.lately_time)-new Date(a.lately_time)
                    })
                    that.lately_hot_search_data=that.lately_hot_search_data.slice(0,3)
                    for(var i=0;i<=that.lately_hot_search_data.length;i++){
                        that.lately_host_search_content.push(that.lately_hot_search_data[i].search_word)//只保留search_word字段
                    }
                }).catch(err => { //
                    console.log("接口调用异常"+err);
                })
        },

    /* 
    热搜词快捷查询
    */
        quick_search(index){
            const search_word=this.$refs.hot_content[index].innerHTML
            let pathinfo=this.$router.resolve({
                path:'/index',
                query:{
                    search_word:search_word
                }
            })
            window.open(pathinfo.href,'_blank')
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
    
},
}
</script>

<style scoped>
@import url('../css/Dynamic_details.css');
</style>
