<template>
<div id="dynamic_publish">
    <div id="dynamic_title">
        <span>随时动态</span>
        <span id="close" @click="close_tab"><img src="../assets/关闭.png" alt=""></span>
    </div>
    <!-- <div class="self_listdd"> -->
    <el-input style="width: 94%; margin-left: 20px;margin-top: 10px;margin-bottom: 10px;"
    type="textarea"
    placeholder="分享下有趣的事吧~"
    v-model="dynamic_content"
    maxlength="1000"
    show-word-limit
    :rows="3"
    :autosize="{ minRows: 3, maxRows: 8}"
    
    >
    </el-input>
    <div style="position:relative">
    <el-upload 
    ref="upload"
    action=""
    class="article_img"   
    list-type="picture-card"
    :headers="headerMsg"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :auto-upload="false"
    :multiple="true"
    :http-request="uploadFile"
    >
    <i class="el-icon-plus"></i>
    </el-upload>
    </div>
    <el-dialog :visible.sync="dialogVisible">
    <img width="" :src="dialogImageUrl" alt="">
    </el-dialog>
    <div class="bottom">
        <!-- <span><img src="../assets/图片.png" style="width:25px ;position: absolute;" alt=""></span> -->
        <span >是否公开：</span>
        <select name="" id="is_open" style="border: none;outline:none;margin:-2">
            <option value="1" style="border: none;outline:none;margin:-2">公开</option>
            <option value="0" style="border: none;outline:none;">仅自己</option>
        </select>
        <el-button style="margin-left: 400px;margin-bottom: 10px;" size="small" type="primary" @click="submitUpload">发表</el-button>
        <!-- <el-button style="margin-right: 10px;" size="small" type="primary" @click="submitUpload">发表</el-button> -->
    </div>
    
</div>

</template>

<script>
import axios from 'axios'
export default {
//   name: 'App',
  data () {
    return {
        dynamic_content:'',
        dialogImageUrl: '',
        headerMsg:{access_token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTY3MjY0OTgsImlhdCI6MTY1NDEzNDQ5OCwiaXNzIjoia3hwIiwiZGF0YSI6eyJ1c2VyaWQiOjF9fQ.PH3FndpDOuOCbmPq-cRFRtg_3HwPc6j7LOXCze9VH-A"},
        dialogVisible: false,
        file_list:[],
        formDate:"",
        view_status:"",
        article_id:"",
    }
  },
  methods: {
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
    handlePictureCardPreview(file) {
    this.dialogImageUrl = file.url;
    this.dialogVisible = true;
    },
    uploadFile(file){//获取多个文件
    this.formDate.append('file', file.file);
    console.log(this.formDate)
    },
    submitUpload(){
        this.view_status=document.getElementById('is_open').value
        const param={
        "article_type":1,
        "article_content":this.dynamic_content,
        "view_status":this.view_status
        }
        const config = {
        headers: {
          'Content-Type': 'application/json',
          'access_token':window.sessionStorage.getItem('access_token')
        }
      }
        axios.post("/api/dynamic_add",param,config).then(res => {
        var that=this
        // console.log(res.data.article_id)
        if (res.data.code === 200) {
            that.article_id=res.data.article_id
            this.upload_img()//创建文章完成调用上传图片方法
        }
        })
        .catch(err => {
        //   this.open4()
          console.log(err)
        })
    },
    upload_img(){//上传图片方法
        this.formDate = new FormData()
        this.$refs.upload.submit();
        // console.log(this.formDate)
        this.formDate.append('article_id', this.article_id);//追加其他字段
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'access_token':window.sessionStorage.getItem('access_token')
            }
        }
        axios.post("/api/article_img", this.formDate,config).then( res => {
            if (res.data.code == 200) {
                this.open2()
            document.getElementById('dynamic_publish').style.display='none'
        }
            // console.log(this.formDate)
            console.log(res)
        }).catch( res => {
            console.log(res)
        })
    },
    open2() {
        this.$message({
          showClose: true,
          message: '发表动态成功',
          type: 'success',
          duration:1000
        });
      },
    close_tab(){
        document.getElementById('dynamic_publish').style.display='none'
    }

}
}
</script>


<style>

@import url('../css/dynamic_publish.css');
</style>