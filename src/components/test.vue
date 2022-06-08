<!-- <template>
<el-upload
  class="avatar-uploader"
  action="http://127.0.0.1:8998/upload_avatar"
  :headers="headerMsg"
  :auto-upload="true"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
</template> -->

<!-- <style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 100PX;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  /* .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  } */
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    border-radius: 100PX;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
    border-radius: 100PX;
  }
</style> -->

<!-- <script>
  export default {
    data() {
      return {
        headerMsg:{access_token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTY3MjY0OTgsImlhdCI6MTY1NDEzNDQ5OCwiaXNzIjoia3hwIiwiZGF0YSI6eyJ1c2VyaWQiOjF9fQ.PH3FndpDOuOCbmPq-cRFRtg_3HwPc6j7LOXCze9VH-A"},
        imageUrl: ''
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script> -->