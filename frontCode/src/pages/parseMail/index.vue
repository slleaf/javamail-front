<template>
  <div>
 <div>
  发件人:<span v-text="email.from"></span><br>
  收件人:<span v-text="email.to"></span><br>
  邮件主题:<span v-text="email.subject"></span><br>
  发送时间:<span v-text="email.dateTime"></span><br>
  抄送:<span v-text="email.cc"></span><br>
  密送:<span v-text="email.bcc"></span><br>
  邮件正文:<span v-text="email.textContent"></span><br>
  <ul>
    <li v-for="attachment in email.attachments" >
      附件名称：{{ attachment.left }}<br>
      附件大小：{{ attachment.middle }}kb
    </li>
  </ul>
  邮件ID:<span v-text="email.messageId"></span><br>
  </div>
  <div class="container">
 <el-row>
  <el-upload
    v-model:file-list="file"
    class="upload-demo"
    multiple
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :limit="3"
    :on-exceed="handleExceed"
    :auto-upload="false"
  >
    <el-button type="primary">选择上传的文件</el-button>
    <template #tip>
      <div class="el-upload__tip">
        请上传eml格式文件且大小不超过40MB.
      </div>
    </template>
  </el-upload>
<el-button type="success" @click="submit">上传文件</el-button>
  </el-row>
  </div>
  </div>
 
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import type { UploadProps, UploadUserFile } from 'element-plus'

import { uploadBatch } from '../../api/file';

const file = ref<UploadUserFile[]>([]);
  const email = reactive({
      attachments: null,
      bcc: null,
      cc: null,
      dateTime: "",
      from: "",
      messageId: "",
      subject: "",
      textContent:
        "",
      to:null
    });

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}
const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

 const submit = async() => {
  console.log(file.value);
  // 封装formData
  const data = new FormData();
  file.value.forEach(element => {
    data.append("file", element.raw);
  });
  // console.log(await uploadBatch(data))
  const jsondata=await uploadBatch(data)
  const eml=JSON.parse(jsondata.eml1);
  console.log(eml)
  Object.assign(email,eml)
  
  

  
  
};
const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning("仅仅支持同时上传最多三个文件"
  )
}
const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `确定要删除文件 ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}
</script>


  
  
  
  <style scoped>
  /* 在这里编写组件的样式 */
  .container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100vh; /* 设置容器高度为视口高度 */
  margin-top: 50px; /* 向下移动50像素 */
}
  </style>
  