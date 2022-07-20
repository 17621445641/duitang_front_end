<template>
<div id="dynamic_list">
    <div v-bind:key="index" v-for="(site,index) in dynamic_list">
	<div class="click_list " style="background-color:rgb(253, 253, 253);padding-left: 10px;">
		<div class="article_info">
			<div class="article_author">
				<img v-bind:src="message_list.avatar_image_url" alt="">
				<div style="padding-top: 30px;font-size:16px;margin-left: 100px;">{{message_list.name}}</div>
				<div style="font-size:10px;color:gray;padding-top: 5px;margin-left: 100px">{{dynamic_list.create_time}}
					<span style="padding-left: 5px;">发布自手机客户端</span>
				</div>
			</div>
			<div class="article_content">
				{{site.article_content}}
			</div>
			<div class="article_img">
				<!-- <div ><img src="../assets/click.png" alt="" ></div> -->
				<div>
					<img src="../assets/like.png" alt="">
				</div>
			</div>
		</div>
	</div>
</div>
</div>

</template>

<script>
export default {
    data () {
        return {
            dynamic_list:[],
            message_list:[]
            
        }
    },

    mounted(){
        this.message_list=this.$parent.message_list

        console.log(this.message_list)
        this.get_dynamic_list()
    },

    methods: {
    /* 
		发布动态
	*/
		get_dynamic_list(){
			this.$axios.get('/api/my_dynamic', {
					headers: {
						access_token: window.sessionStorage.getItem('access_token')
					}
            })
            .then(resp => {
                if(resp.data.code==200){
                    var that = this;
                    that.dynamic_list=resp.data.data
                }
                else{
                    rej(resp.data.code)
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
            .catch(err => { //
                console.log("接口调用异常"+err);
            });
		},

}
}
</script>


<style>
@import url('../css/Click_list.css');
</style>