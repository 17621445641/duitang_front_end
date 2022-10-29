<template>
<div>
    <div v-if="dynamic_list==''" style="color:gray;text-align:center;padding-top:100px">
        暂时没有内容哦，快去发布吧~
    </div>
    <div v-else>
    <el-dialog class="zhe" 
    :title="reply_title"
    :visible.sync="dialogVisible"
    width="40%"
    :lock-scroll='false'
    >
    <el-input style="width: 100%;margin-top: 10px;margin-bottom: 10px;" 
    type="textarea"
    placeholder="发布你的回复~"
    v-model="comment_reply"
    maxlength="200"
    show-word-limit
    :rows="3"
    :autosize="{ minRows: 3, maxRows: 18}">
    </el-input>
    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="publish_comment(reply_id,reply_user,reply_parent_index)">回复</el-button>
    </span>
    </el-dialog>
    <div v-bind:key="index" v-for="(site,index) in dynamic_list">
		<div class="article_info">
			<div class="article_author">
                <img v-bind:src="user_message.avatar_image_url" alt="" style="box-shadow-shadow:5px 5px 21px #ddd7d7, -5px -5px 21px #efe9e9">
                <div v-if="user_message.user_name==''" style="padding-top: 25px;font-size:16px;margin-left: 90px;">
                </div>
                <div v-else style="padding-top: 25px;font-size:16px;margin-left: 90px;">
                    {{user_message.user_name}}
                </div>
				<div style="font-size:10px;color:gray;padding-top: 5px;margin-left: 90px">
                    {{site.create_time}} 发布自网页客户端
				</div>
                <span class='is_show' @click="update_view_status(index)">
                    <img v-if="site.view_status==1" src="../assets/unlock.png" alt="" style="width:20px;position:absolute;top:-13px;left:-18px" >
                    <img v-else src="../assets/lock.png" alt="" style="width:20px;position:absolute;top:-13px;left:-18px" >
                    <span v-if="site.view_status==1" >设为私密</span>
                    <span v-else>设为公开</span>
                    
                </span>
                 <!-- @click="delete_dynamic(index)" -->
                <span class='delete_img' @click="open(index)" >删除<img  style="" src="../assets/delete.png" alt=""></span>
                <!-- <el-dialog type="text" @click="open" :lockScroll='false'>点击打开 Message Box</el-dialog> -->
            </div> 
            <div>  
			<div class="article_content">{{site.article_content}}</div>
                <div class="dynamic_img">
					<div class="demo-image__preview">
						<el-image v-bind:key="child_index" v-for="(child_site,child_index) in all_imglist[index]"
                            style="width: 100px; height: 100px"
                            :src="child_site"
                            :preview-src-list="all_imglist[index]">
						</el-image>
					</div>
				</div>
			
            </div>
            <div id="dynamic_bottom">
				<span style="font-size: 8px;cursor: pointer;width: 30%;display: inline-block;text-align: center;">
					<img @click="dynamic_like(1,index)" v-if="site.like_status!=1" :src="cancel_like_img" alt="" style="width:22px">
					<img @click="dynamic_like(0,index)" v-else :src="like_img" alt="" style="width:22px">
					<span style="display: inline-block;margin-left:5px; transform: translateY(-35%);">{{site.like_count}}</span>
				</span>
				<span style="font-size: 8px;cursor: pointer;width: 38%;display: inline-block;text-align: center;">
                    <img @click="comment_view($event,index)"  :src="comment_img_test[index]" alt="" style="width:22px">
					<span style="display: inline-block;margin-left:5px; transform: translateY(-25%);"></span>
				</span>
				<span  style="font-size: 8px;cursor: pointer;width: 30%;display: inline-block;text-align: center;">
					<img @click="dynamic_collect(0,index)" v-if="site.collect_status==1" :src="collect_img" alt="" style="width:22px">
					<img @click="dynamic_collect(1,index)" v-else :src="cancel_collect_img" alt="" style="width:22px">
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
					<div style="padding-bottom:10px;border-bottom:1px solid #f7f6f6;margin-bottom:10px;margin-right:56px;">
						<u @click="publish_comment(undefined,undefined,index)">评论</u>
					</div>
					<div id="comment_content" v-if="comment_data[index].length>0" >
						<span class="content_page" v-bind:key="comment_index" v-for="(comment_site,comment_index) in comment_data[index]">
							<img class="comment_avatar" :src="comment_site.avatar_image_url" alt="">
							<span class="content_right"  style="width:620px">
								<div class="comment_user">{{comment_site.user_name}}：
									<span class="user_content" style="display:inline-block;font-size:13px;color:black">{{comment_site.comment}}</span>
									<div class="comment_time">发布于 {{comment_site.create_time}}
                                        <img class='reply_img' @click="reply_control(comment_site.comment_id,comment_site.user_id,comment_site.user_name,comment_site.article_id,index)" :src="cancel_comment_img" alt="" style="width:20px;position: relative;left:370px;cursor:pointer;top:5px">
                                        <img @click="comment_click(1,index,comment_index)" v-if='comment_site.click_status!=1' :src="cancel_comment_click_img" alt="" style="width:20px;position: relative;left:380px;cursor:pointer;top:4px">
                                        <img @click="comment_click(0,index,comment_index)" v-else :src="comment_click_img" alt="" style="width:20px;position: relative;left:380px;cursor:pointer;top:4px">
                                        <span style="position: relative;left:380px;cursor:pointer;top:0px">{{comment_site.click_count}}</span>
									</div>
								</div>
								<div class="reply_comment" v-bind:key="index2" v-for="(reply_site,index2) in comment_site.data">
									<div class="reply_user">
										{{reply_site.user_name}}：
										<span class="user_content" style="color:red;display:inline-block;color:black;font-size:13px;margin-bottom: 8px;">{{reply_site.comment}}</span>
										<div class="comment_time">发布于 {{reply_site.create_time}} 
                                        </div>
									</div>
								</div>
							</span>
						</span>
					</div>
					<div  v-else style="text-align: center;color:gray;line-height:100px;">暂无评论，快来抢占热评吧~</div>
				</div>
			</div>
		</div>
	</div>
</div>
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
            dynamic_list:[], //文章列表信息
            user_message:{},//用户信息
            all_imglist:{},//文章的图片信息
            reply_title:"",
            reply_id:'',
            reply_user:'',
            article_id:'',
            reply_parent_index:'',

            dialogVisible: false,
            last_index:"",
            user_id:window.localStorage.getItem('user_id'),
            article_details:[],
            article_imgs:[],
            authorinfo:[],
            like_img:like,
            cancel_like_img:cancel_like,
            collect_img:collect,
            cancel_collect_img:cancel_collect,
            article_data:[],
            follow_status:'',
            comment_publish:'',
            comment_img:comment,
            cancel_comment_img:cancel_comment,
            comment_data:[],
            comment_reply:'',//二级评论输入框
            hot_search_data:[],//热词原始数据
            lately_hot_search_data:[],//对热词原始数据按时间进行排序
            lately_host_search_content:[],//只保留search_word
            comment_click_img:comment_click,
            cancel_comment_click_img:cancel_comment_click,
            comment_img_test:[],
        }
    },
    created(){
        this.get_dynamic_list()
        this.user_info()
        

    },
    methods: {
    /* 
		获取我的动态
	*/
		get_dynamic_list(){
			this.$axios.get('/api/my_dynamic', {
					headers: {
						access_token: window.localStorage.getItem('access_token')
					}
            })
            .then(resp => {
                if(resp.data.code==200){
                    var that = this;
                    that.dynamic_list=resp.data.data
                    for(let i=0;i<that.dynamic_list.length;i++){
                        this.all_imglist[i]=that.dynamic_list[i].article_img.replace(/\"/g, '').replace(/\[/g, '').replace(/\]/g, '').split(',')
                        this.comment_data[i]=[]
                        this.comment_img_test[i]=cancel_comment
                    }
                }
                else{
                    rej(resp.data.code)
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
            .catch(err => { //
                console.log("接口调用异常"+err);
            });
		},
    /* 
    二次确认是否删除动态
    */
        open(index) {
        this.$confirm('删除后无法找回，确定删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          lockScroll:false
        }).then(() => {
          this.delete_dynamic(index)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
    /* 
    删除我的动态
    */
        delete_dynamic(index){
            const config={
                headers: {
                    'access_token': window.localStorage.getItem('access_token')
                },
            }
            const param = {
				"article_id": this.dynamic_list[index].article_id,
			}
			return new Promise((resolve,rej) => {
            this.$axios.post("/api/dynamic_delete", param,config)
            .then(resp=>{
                if(resp.data.code==200){
                    this.get_dynamic_list()
                    this.open2("删除动态成功")
                    resolve(resp.data.code)
                }
                else{
                    this.$message.error('删除动态失败')
                    rej(resp.data.code)
                }
            }).catch(err=>{
                console.log("接口调用异常"+err);
            })
            })
        },

    /* 
      查询用户信息
    */
      user_info(){
        this.$axios.get('/api/userinfo',{
          headers:{
            access_token:window.localStorage.getItem('access_token')
          }
          })
          .then(resp => {
            var that=this;
            that.user_message=resp.data.data[0];
          }).catch(err => { //
              console.log("接口调用异常"+err);
          });
      },


      /* 
      更新动态可见状态
      */
        update_view_status(index){
            let article_id=this.dynamic_list[index].article_id
            let view_status_code
            if(this.dynamic_list[index].view_status==1){
               
                view_status_code=0
            }
            else{
                view_status_code=1
            }
            const config={
                headers: {
                    'access_token': window.localStorage.getItem('access_token')
                },
            }
            const param = {
				"article_id": article_id,
				"view_status": view_status_code
			}
			this.$axios.post("/api/update_view_status", param,config)
            .then(resp=>{
                if(resp.data.code==200){
                    this.dynamic_list[index].view_status=view_status_code
                    this.open2("更新状态成功")
                }
            }).catch(err=>{
                console.log("接口调用异常"+err);
            })
        },

    
    /* 
    文章喜欢/取消喜欢,like_action=1为喜欢,like_action=0为取消喜欢
    */
        dynamic_like(like_action,index){
            var that=this
            const param={
                "article_id":this.dynamic_list[index].article_id,
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
                    this.dynamic_list[index].like_status=1
                    this.dynamic_list[index].like_count=this.dynamic_list[index].like_count+1
                }
                else{
                    this.dynamic_list[index].like_status=0
                    this.dynamic_list[index].like_count=this.dynamic_list[index].like_count-1
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
    文章收藏/取消收藏,collect_action=1为收藏,collect_action=0为取消收藏
    */

        dynamic_collect(collect_action,index){
            const param={
                "article_id":this.dynamic_list[index].article_id,
                "status":collect_action
            }
            this.$axios({
                headers: {
                    'access_token': window.localStorage.getItem('access_token')
                },
                method: 'post',
                url: '/api/article_collect',
                data: param
            }).then(resp => {
            if (resp.data.code == 200) {
                if(collect_action==1){
                    this.dynamic_list[index].collect_status=1
                    
                }
                else{
                    this.dynamic_list[index].collect_status=0
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
    控制评论区的展示
    */
        comment_view(event,index){
            this.comment_publish="" 
            if(event.target.parentElement.nextElementSibling.nextElementSibling.style.display=="block"){
                this.$set(this.comment_img_test,index,cancel_comment)
                event.target.parentElement.nextElementSibling.nextElementSibling.style.display="none"
            }
            else{
                this.$set(this.comment_img_test,index,comment)
                event.target.parentElement.nextElementSibling.nextElementSibling.style.display="block"
                this.$nextTick(function(){
                this.get_comment(index) 
            })
            }  
        },

    /* 
    查询文章的评论信息
    */
        get_comment(index){
            this.$axios.get('/api/get_comment',{
                params:{
                    article_id:this.dynamic_list[index].article_id,
                    user_id:window.localStorage.getItem('user_id')
                }
            })
            .then(resp => {
                if(resp.data.code==200){
                    this.$nextTick(() => {
                    // this.comment_data.splice(index,1,resp.data.data)
                    this.$set(this.comment_data,index,resp.data.data)
                    })
                }       
            }).catch(err => { //
                console.log("接口调用异常"+err);
            })
        },
    
    /* 
    控制回复评论区的展示
    */
        reply_control(comment_id,user_id,user_name,article_id,index){
            
            this.comment_reply=''
            this.dialogVisible = true
            this.reply_title="回复给@"+user_name
            this.reply_id=comment_id,
            this.reply_user=user_id
            this.article_id=article_id
            this.reply_parent_index=index
        },

    /* 
    发布文章评论
    */
        publish_comment(reply_id,reply_user,index){
            let comment
            let article_id
            if(reply_id==undefined){//发布评论无需传reply_id，replay_id==undefined
                comment=this.comment_publish
                article_id=this.dynamic_list[index].article_id
            }
            else{//发布回复评论需传reply_id，replay_id
                comment=this.comment_reply
                article_id=this.article_id
            }
            const param={
                "article_id":article_id,
                "reply_id":reply_id,
                "user_id":this.user_id,
                "comment":comment,
                "reply_user":reply_user
            }
            this.$axios({
                    headers: {
                        'access_token': window.localStorage.getItem('access_token')
                    },
                    method: 'post',
                    url: '/api/publish_comment',
                    data: param
                })
            .then(resp => {
                if (resp.data.code == 200) {
                    this.open2("发布评论成功")
                    this.get_comment(index)
                    if(reply_id==undefined){//发布评论
                        this.comment_publish=''
                    }
                    else{
                        this.dialogVisible = false
                        this.comment_reply=""
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
            }).catch(err => { //
                console.log("接口调用异常"+err);
            });
        },


    /* 
    评论点赞/取消点赞,click_action=1为点赞,click_action=0为取消点赞
    */

        comment_click(click_action,index,comment_index){
            const param={
                "comment_id":this.comment_data[index][comment_index].comment_id,
                "status":click_action
            }
            this.$axios({
                headers: {
                    'access_token': window.localStorage.getItem('access_token')
                },
                method: 'post',
                url: '/api/comment_click',
                data: param
            }).then(resp => {
            if (resp.data.code == 200) {
                if(click_action==1){
                    this.comment_data[index][comment_index].click_status=1
                    this.comment_data[index][comment_index].click_count=this.comment_data[index][comment_index].click_count+1
                    
                }
                else{
                    this.comment_data[index][comment_index].click_status=0
                    this.comment_data[index][comment_index].click_count=this.comment_data[index][comment_index].click_count-1
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



        open3(message_content) {
        this.$message({
          showClose: true,
          message: message_content,
          type: 'warning'
            });
        },

        open2(message_content) {
			this.$message({
				showClose: true,
				message: message_content,
				type: 'success',
				duration: 1500
			});
		},
}
}
</script>


<style>
@import url('../css/Click_list.css');
@import url('../css/Dynamic_details.css');
</style>