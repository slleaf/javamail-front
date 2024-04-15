<template>
  <div class="container">
    <h1 style="margin-left: 250px;">邮件发送</h1>
    <el-form
    :label-position="top"
    label-width="auto"
    :model="mail"
    style="max-width: 600px"
    :rules="mailRules"
  >
    <el-form-item label="发件人">
      <el-input clearable disabled v-model="mail.mailFrom" />
    </el-form-item>

    <el-form-item label="收件人" prop="mailTo">
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

    <el-form-item label="邮件主题" prop="mailSubject">
      <el-input cleearabl v-model="mail.mailSubject" />
    </el-form-item>

    <el-form-item label="邮件正文" prop="mailText">
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
import { reactive,ref,onUpdated } from 'vue'
import type { UploadProps, UploadUserFile,FormInstance } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserInfoStore } from '../../stores/userInfo';
import pinia from '../../stores';
import { addMail } from '../../api/file';

// do not use same name with ref
const file = ref<UploadUserFile[]>([]);
const formRef = ref<FormInstance>()
const mailmethod=ref(null);
const username = ref("")
const mail = reactive({
  mailFrom:"3438357823@qq.com",
  mailTo:"",
  mailCc:"",
  mailBcc:"",
  mailSubject:"",
  mailText:""
})
const userInfoStore = useUserInfoStore(pinia)
username.value = userInfoStore.username

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
//校验规则
const validateMailTo = (rule: any, value: any, callback: any) => {
  if (value.length >= 2  && value.length  <= 6  ) {
    callback()
  } else {
    callback(new Error('姓名必须在2-6位'))
}
}
// 校验规则
const mailRules = {
  mailTo: [{ required: true, trigger: 'blur', type:'email',message: '请输入正确的邮件地址' }],
  mailSubject: [{ required: true, message: '请输入正确的邮件主题' }],
  mailText: [{ required: true, trigger: 'blur',message: '请输入正确的邮件内容',}],
}


const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}
const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const onSubmit = async () => {
  const data=new FormData();
  data.append("username",username.value);
  data.append("mailFrom",mail.mailFrom)
  data.append("mailTo",mail.mailTo)
  data.append("mailCc",mail.mailCc)
  data.append("mailBcc",mail.mailBcc)
  data.append("mailSubject",mail.mailSubject)
  data.append("mailText",mail.mailText)
  file.value.forEach(element => {
    data.append("file", element.raw);
  });
  const jsondata=await addMail(data)
  console.log(jsondata)
  ElMessage.success("邮件发送成功")
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

