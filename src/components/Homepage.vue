<template>
    <div style="display:inline-block;width:100%;">
        <div id="user_background" style="margin:auto">
		<div id="background_image">
			<img v-if="message_list.background_img_url==''||message_list.background_img_url==null" src="http://127.0.0.1:8998/static/background_images/default_backgd_img.png" alt="">
			<img v-else :src="message_list.background_img_url" alt="">
		</div>
        <img class="img_style" :src="message_list.avatar_image_url" >


    	<div id="user_name">
			<span v-if="message_list.user_name!=''&& message_list.user_name!=null">{{message_list.user_name}}</span>
			<span style="" v-else>用户{{message_list.user_id}}</span>
			<span v-if="message_list.sex=='男'">
				<img style="width: 15px;margin-left: 5px;" src="../assets/男.png" alt="">
			</span>
			<span v-else-if="message_list.sex=='女'">
				<img style="width: 15px;margin-left: 5px;" src="../assets/女.png" alt="">
			</span>
			<span v-else style="font-size: 10px;color:gray">未知</span>
		</div>
		<!-- <div id="follow_fans">
			<span @click="go_follows_fans(0)"  class='follow_fans_count'>
				<span >关注</span>
				<span style="color:rgb(73, 73, 73)">{{message_list.follow_count}}</span>
			</span>
			<span class="split_symbol" >|</span>
			<span @click="go_follows_fans(1)"  class='follow_fans_count'>
				<span >粉丝</span>
				<span style="color:rgb(73, 73, 73)">{{message_list.fans_count}}</span>
			</span>	
		</div> -->
		<div id="self_descrip">简介：<span v-if="message_list.self_description!=null">{{message_list.self_description}}</span>
			<span v-else>暂无简介</span>
		</div>
		</div>
		<div id="message_navigation" >
		<div id="navigation_list">
				<div tabindex="1" ref='publish' @click="go_author_dynamic">
					<img style="width:32px;top:8px;transform:translateX(-10%)" src="../assets/dynamic (2).png">动态
        		</div>
		</div>
		<router-view id="message_content"> </router-view>
		</div>
	</div>
</template>
<script>
export default {
    data () {
      return {
		  message_list:[],
      }
    },
    created(){
        this.get_authorinfo()
    },
	mounted(){
		this.$refs.publish.style.color='#ff8200'
	},
    methods:{
		go_author_dynamic(){
			this.$router.replace({path: "/homepage/author_dynamic", query: {author_id:this.$route.query.author_id}})
		},
		
        /* 
    查询文章作者信息
    */
        get_authorinfo(){
				this.$axios.get('/api/author_info',{
                params:{
                    author_id:this.$route.query.author_id
                }
            })
            .then(resp => {
                var that=this;
                that.message_list=resp.data.data;
				
            }).catch(err => { //
                console.log('请求失败：'+ err.code + ',' + err.message);
            })
            
        },
    }
}
</script>
<style>
@import url('../css/index.css');
</style>