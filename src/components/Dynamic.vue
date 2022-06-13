<template>
<div id="dynamic_publish">
    <div id="dynamic_title">
        <span>随时动态</span>
        <span id="close"><img src="../assets/关闭.png" alt=""></span>
    </div>
    <!-- <div class="self_listdd"> -->
    <el-input style="width: 94%; margin-left: 20px;margin-top: 10px;margin-bottom: 10px;"
    type="textarea"
    placeholder="随时随地记录下有趣时光吧~"
    v-model="dynamic_content"
    maxlength="1000"
    show-word-limit
    :rows="3"
    :autosize="{ minRows: 3, maxRows: 8}"
    
    >
    </el-input>
    <el-upload 
    ref="upload"
    class="article_img"
    action="http://127.0.0.1:8998/upload_avatar"
    list-type="picture-card"
    :headers="headerMsg"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :auto-upload="false"
    :multiple="true"
    >
    <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
    <img width="" :src="dialogImageUrl" alt="">
    </el-dialog>
    <div>
        <span><img src="../assets/图片.png" style="width:25px ;" alt=""></span>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">发表</el-button>
    </div>
    
</div>

</template>

<script>
// import axios from 'axios'
export default {
//   name: 'App',
  data () {
    return {
        dynamic_content:'',
        dialogImageUrl: '',
        headerMsg:{access_token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTY3MjY0OTgsImlhdCI6MTY1NDEzNDQ5OCwiaXNzIjoia3hwIiwiZGF0YSI6eyJ1c2VyaWQiOjF9fQ.PH3FndpDOuOCbmPq-cRFRtg_3HwPc6j7LOXCze9VH-A"},
        dialogVisible: false
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
      submitUpload() {
        this.$refs.upload.submit();
      },
}
}
</script>


<style>

@import url('../css/dynamic_publish.css');
</style>