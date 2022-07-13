<template >
<div>
<div v-bind:key="index" v-for="(site,index) in click_list">
    <div class="click_list " style="background-color:rgb(253, 253, 253);padding-left: 10px;" > 
    <div class="article_info" >
      <div class="article_author" >
        <img v-bind:src="site.avatar_image_url" alt="" >
        <div style="padding-top: 30px;font-size:16px;margin-left: 100px;">{{site.name}}</div>
        <div style="font-size:10px;color:gray;padding-top: 5px;margin-left: 100px">{{site.article_create_time}}<span style="padding-left: 5px;">发布自手机客户端</span></div>
      </div>
      <div class="article_content" >
        {{site.article_content}}
      </div>
      <div class="article_img" >
        <div ><img src="../assets/click.png" alt="" ></div>
        <div ><img src="../assets/like.png" alt="" ></div>
      </div>
    </div>
  </div>

</div>
</div>
  
</template>


<script>
import axios from 'axios'
export default {
  data(){
    return{
      from_path:"",
      click_list:[],
    }
    
  },
  
  created(){
    this.click_method()
  },
  methods:{
    
    click_method(){
        axios.get('/api/views_list',{
          headers:{
          access_token:window.sessionStorage.getItem('access_token')
        }
        })
        .then(resp => {
            var that=this;
            that.click_list=resp.data.data;
            console.log(that.click_list);
        }).catch(err => { //
            console.log('请求失败：'+ err.code + ',' + err.message);
        });
    }
    
  }
}

</script>

<style>
@import url('../css/Click_list.css');
</style>