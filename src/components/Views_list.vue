<template>
  <div class="cropper-app">
    <el-form :model="formValidate" :rules="ruleValidate" ref="formValidate" label-width="100px" class="demo-ruleForm">
        <div class="list-img-box">
          <div v-if="formValidate.mainImage !== ''">
            <img :src="formValidate.mainImage" style='width:100px;height:100px;border-radius:100px' alt="头像">
          </div>
          <div v-else class="upload-btn" style="height: 100px;width:100px;border-radius:100px" @click="uploadPicture('flagImg')">
            +
          </div>
           <!-- <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:8998/upload_avatar"
          :headers="headerMsg"
          :show-file-list="false"
          :auto-upload="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="formValidate.mainImage" :src="formValidate.mainImage" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" @click="uploadPicture('flagImg')"></i>
			    </el-upload> -->
        </div>
        <input type="hidden" v-model="formValidate.mainImage" pl封面设置eholder="请添加封面">
    </el-form>
    <!-- 剪裁组件弹窗 -->
    <el-dialog
        title="裁剪图片"
        :visible.sync="cropperModel"
        width="750px"
        center
       >
     <upload-cropper
         :Name="cropperName"
         @uploadImgSuccess = "handleUploadSuccess"
         ref="child">
     </upload-cropper>
    </el-dialog>
    <!--查看大封面-->
    <el-dialog
        title="查看大封面"
        :visible.sync="imgVisible"
        center>
      <img :src="imgName" v-if="imgVisible" style="width: 100%" alt="查看">
    </el-dialog>
  </div>
</template>
 
<script>
import uploadCropper from "@/components/common/upload-cropper";
export default {
  name: "Tailoring",
  components: {uploadCropper},
  data () {
    return {
      formValidate: {
        mainImage: '',
      },
      ruleValidate: {
        mainImage: [
          {required: true, message: '请上传封面', trigger: 'blur'}
        ],
      },
      //裁切图片参数
      cropperModel:false,
      cropperName:'',
      imgName: '',
      imgVisible: false
    }
  },

  methods: {
      middleAdFinish(){
 
      },
    //封面设置
    uploadPicture(name){
      this.cropperName = name;
      this.cropperModel = true;
    },
    //图片上传成功后
    handleUploadSuccess (data){
      console.log(data)
      // switch(data.name){
      //   case 'flagImg':
      //     this.formValidate.mainImage = 'http://ydfblog.cn/dfs/'+data.url;
      //     console.log('最终输出'+data.name)
      //     break;
      // }
      this.formValidate.mainImage=data.url
      this.cropperModel = false;
    }
  }
}
</script>
<style scoped>
  .upload-list-cover{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0 40px;
      align-items: center;
      background: rgba(0,0,0,.6);
      opacity: 0;
      transition: opacity 1s;
  }
  .cover_icon {
    font-size: 30px;
  }
  .upload-btn{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border: 1px solid #cccccc;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0 1px #cccccc;
  }
  .upload-btn:hover {
    border: 1px solid #69b7ed;
  }
  .upload-btn i{
    margin: 5px;
  }
</style>
