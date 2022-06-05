<template >
<div>
<div v-bind:key="index" v-for="(site,index) in click_list">
  <span>{{ site.article_title }}</span>

</div>
</div>
  
</template>

<script>
import axios from 'axios'
export default {
  data: {
    return:{
      from_path:"",
      click_list:{},
    }
    
  },
  
  created(){
    console.log(1)
    this.click_method()
  },
  methods:{
    
    click_method(){
      
      console.log(2)
        axios.get('/api/click_list',{
        })
        .then(resp => {
            var that=this;
            that.click_list=resp.data.data;
            console.log(click_list);
        }).catch(err => { //
            console.log('请求失败：'+ err.code + ',' + err.message);
        });
    }
    
  }
  // beforeRouteEnter(to, from, next){
  //   next((vm)=>{
  //     vm.from_path=from.path
  //     vm.click_method()
  //     console.log(1)
  //     // console.log("vm:",from)
  //   })
  // },
  // methods: {
  //   click_method(){
  //   if(this.from_path=='/like'){
  //     axios.get('/api/click_list',{
  //       })
  //       .then(resp => {
  //           var that=this
  //           that.click_list=resp.data.data;
  //           console.log(2)
  //           console.log(that.click_list)
  //       }).catch(err => { //
  //           console.log('请求失败：'+ err.code + ',' + err.message);
  //       });
  //   }
      
  //   }
  // }
}

</script>

<style>
@import url('../css/Click_list.css');
</style>