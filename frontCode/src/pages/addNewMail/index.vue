<template>
  <div class="container">
    <h1 style="margin-left: 250px;">邮件发送</h1>
    <el-form
    :label-position="top"
    label-width="auto"
    :model="mail"
    style="max-width: 600px"
  >
    <el-form-item label="发件人">
      <el-input clearable v-model="mail.mailFrom" />
    </el-form-item>

    <el-form-item label="收件人">
      <el-input clearable v-model="mail.mailTo" />
    </el-form-item>

    <el-form-item label="发件方式">
      <el-select v-model="mailmethod" placeholder="选择发件方式" @change="handleChange(mailmethod)">
        <el-option label="默认发送" value="defaul" />
        <el-option label="添加抄送" value="cc" />
        <el-option label="添加密送" value="bcc" />
      </el-select>
    </el-form-item>

    <el-form-item v-if="mailmethod=='cc'" label="抄送地址">
      <el-input v-model="mail.mailCc" clearable placeholder="请输入内容"></el-input>
    </el-form-item>

    <el-form-item v-if="mailmethod=='bcc'" label="密送地址">
      <el-input  v-model="mail.mailBcc" clearable placeholder="请输入内容"></el-input>
    </el-form-item>

    <el-form-item label="邮件主题">
      <el-input cleearabl v-model="mail.mailSubject" />
    </el-form-item>

    <el-form-item label="邮件正文">
      <el-input 
      style="width: 20000px"
      :rows="6"
      show-word-limit="true"
      v-model="mail.mailText"
      type="textarea" />
    </el-form-item>
    
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
        jpg/docx文件最大不超过40MB
      </div>
    </template>
  </el-upload>
<el-button type="success" @click="submit">上传文件</el-button>
  </el-row>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">发送</el-button>
      <el-button @click="clear()">清空正文</el-button>
    </el-form-item>
  </el-form>
  

  </div>
  
</template>

<script lang="ts" setup>
import { reactive,ref } from 'vue'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'

// do not use same name with ref
const file = ref<UploadUserFile[]>([]);
const mailmethod=ref(null);
const mail = reactive({
  mailFrom:"",
  mailTo:"",
  mailCc:"",
  mailBcc:"",
  mailSubject:"",
  mailText:""
})
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

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}
const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const onSubmit = () => {
  console.log('submit!')
}

const handleChange=(mailmethod)=>{
  console.log(mailmethod)
}
const clear=()=>{
  mail.mailText=""
}

</script> 








<style scoped>
/* 在这里编写组件的样式 */
.container {
  
  margin-left: 450px; /* 向下移动50像素 */
  margin-top: 100px; /* 向下移动50像素 */
}
</style>

