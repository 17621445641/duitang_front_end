<template>
    <div style="position:relative"> 
        <div v-if="concerns_message.length<=0" style="width:520px;padding-top:100px;color:gray;text-align:center">
            还没有粉丝哦！快发表动态吧~
        </div>
        <div v-else>
            <div style="width:520px;border-top-left-radius:12px;border-top-right-radius:12px;padding:12px 0 12px 24px;background:white">全部粉丝（{{concerns_message.length}}）</div>
            <div  v-bind:key="index" v-for="(site,index) in concerns_message">
                <div class="concerns_fans_message" >
                    <img class="concerns_fans_avatar" :src="site.avatar_image_url" alt=""  @click='go_homepage(index,1)'>
                    <div class="concerns_fans_username" >
                        <span v-if='site.name!=""'>{{site.name}}</span>
                        <span v-else>{{site.user_id}}</span> 
                    </div>
                    <div class="concerns_fans_selfdescribe" >个人介绍：
                        <span v-if="site.self_description==''||site.self_description==null">暂无介绍</span>
                        <span v-else>{{site.self_description}}</span>
                        </div>
                    <span v-if="site.follow_status!=1" class="action" @click='follow_author(1,index,1)'>+关注</span>
                    <span v-else-if="site.follow_status=site.be_follow_status" class="action"  @click='follow_author(0,index,1)'>已互关</span>
                    <span v-else class="action"  @click='follow_author(0,index,1)'>已关注</span>
                </div>
            </div>
        </div>
        <span class="recommend_list" >
            <div style="padding:8px 12px;">推荐关注<span class="change_recommend" @click="get_recommend">换一批</span></div>
            <div v-if="recommend_user.length==0" style="color:gray;line-height:240px;text-align:center;border-top:1px solid rgb(241, 241, 241)">暂无推荐关注~</div>
            <div v-else :key="index" v-for="(site,index) in recommend_user" class="recommend" >
                <img class="recommend_img"  :src="site.avatar_image_url" alt=""  @click='go_homepage(index,0)'>
                <div class="recommend_username" style="font-size:14px;"><span v-if="site.name!=''">{{site.name}}</span><span v-else>{{site.id}}</span></div>
                <div class="recommend_self_description" style="font-size:12px;color:gray">介绍：{{site.self_description}}</div>
                <span class="recommend_btn" v-if="site.follow_status!=1" @click="follow_author(1,index,0,)">+关注</span>
                <span class="recommend_btn" v-else @click="follow_author(0,index,0)">已关注</span>
            </div>
        </span>
    </div>
</template>
<script>
export default {
    data () {
        return {
            concerns_message:[],
            recommend_user:[]
        }
    },

    created(){
        this.get_fans(),
        this.get_recommend()
        
    },

    methods:{
    /* 
    跳转作者主页
    */    
        go_homepage(index,action){
            let go_homepage_action
            if(action==1){
                go_homepage_action=this.concerns_message[index].user_id
            }
            else{
                go_homepage_action=this.recommend_user[index].id
            }
            if(go_homepage_action==window.localStorage.getItem('user_id')){
                this.$router.push('/personal_center/dynamic_list')
            }
            else{
                let new_window=this.$router.resolve({
				path:'/homepage/author_dynamic',
				query:{
					author_id:go_homepage_action
				}
			    })
			    window.open(new_window.href, '_blank')
            }
            
        },

    /* 
    获取用户关注列表
    */
        get_fans(){
            this.$axios.get('/api/fans_list',{
                headers: {
                    'access_token': window.localStorage.getItem('access_token')
                },
                })
                .then(resp => {
                    var that=this;
                    that.concerns_message=resp.data.data;
                }).catch(err => { //
                    console.log("接口调用异常"+err);
                })
        },

    /* 
    获取推荐关注列表
    */
        get_recommend(){
            this.$axios.get('/api/recommend_user',{
                headers: {
                    'access_token': window.localStorage.getItem('access_token')
                },
                })
                .then(resp => {
                    var that=this;
                    that.recommend_user=resp.data.data;
                }).catch(err => { //
                    console.log("接口调用异常"+err);
                })
        },

    /* 
    用户关注/取消关注,follow_action=1为关注,follow_action=0为取消关注,action=0为推荐列表，1为关注和粉丝列表
    */
        follow_author(follow_action,index,action){
            let param
            if(action==1){
                param={
                "be_follow":this.concerns_message[index].user_id,
                "follow_status":follow_action
                }
            }else{
                param={
                "be_follow":this.recommend_user[index].id,
                "follow_status":follow_action
                }
            }
            
            this.$axios({
                headers: {
                    'access_token': window.localStorage.getItem('access_token')
                },
                method: 'post',
                url: '/api/add_follow',
                data: param
            }).then(resp => {
            if (resp.data.code == 200) {
                if(follow_action==1){
                    if(action==1){
                        this.concerns_message[index].follow_status=1
                    }
                    else{
                        this.recommend_user[index].follow_status=1
                    }
                    this.open2('关注用户成功')
                }
                else{
                    if(action==1){
                        this.concerns_message[index].follow_status=0
                    }
                    else{
                        this.recommend_user[index].follow_status=0
                    }
                    this.open2('取消关注成功')
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

