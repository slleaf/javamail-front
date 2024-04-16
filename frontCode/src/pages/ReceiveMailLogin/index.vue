<template>
  <div>
     <h2 class="container2">查看收件箱</h2>
  <div class="container1">
    <el-form
    :label-position="top"
    label-width="auto"
    :model="inbox"
    style="max-width: 600px"
    :rules="mailRules"
  >
    <el-form-item label="邮箱地址" prop="mailDir">
      <el-input clearable  v-model="inbox.mailDir" />
    </el-form-item>

    <el-form-item label="授权码" prop="passWord">
      <el-input clearable v-model="inbox.passWord" />
    </el-form-item>

    <el-form-item label="邮箱协议" prop="protocol">
      <el-select v-model="inbox.protocol" placeholder="选择收件协议">
        <el-option label="IMAP" value="imap" />
        <el-option label="POP3" value="pop3" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onlogin(inbox.mailDir,inbox.passWord,inbox.protocol)">登录</el-button>
      <el-button @click="clear()">清空</el-button>
    </el-form-item>
  </el-form>
  </div>
  </div>
 
  
</template>

<script lang="ts" setup>
import { reactive,ref,onUpdated } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserInfoStore } from '../../stores/userInfo';
import pinia from '../../stores';
import { addMail } from '../../api/file';

// do not use same name with ref
const router = useRouter()
const inbox = reactive({
 mailDir:"1438797980@qq.com",
 passWord:"txizzaenswmohice",
 protocol:""
})

// 校验规则
const mailRules = {
  mailDir: [{ required: true, trigger: 'blur', type:'email',message: '请输入正确的邮件地址' }],
  passWord: [{ required: true, message: '请输入正确的授权码' }],
  protocol: [{ required: true, message: '请输入正确的协议',trigger: 'change' }]
}


const onlogin = async (mailDir,passWord,protocol) => {
  router.push({ name: "ReceiveMailPage" ,query:{ mailDir,passWord,protocol }});
}

const clear=()=>{
  inbox.mailDir="",
 inbox.passWord="",
 inbox.protocol=""
}

</script> 

<style scoped>
/* 在这里编写组件的样式 */
.container1 {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
.container2 {
  margin-left: 700px;
  margin-top: 50px; /* 向下移动50像素 */
}
</style>
  