<template>
  <div>
  <div>
     <el-upload
     v-model:file-list="file"
    class="upload-demo"
    drag
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :limit="3"
    :on-exceed="handleExceed"
    :auto-upload="false"
    multiple
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      将文件拖拽 <em>或点击进行上传</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
      <div>
    <el-button type="success" @click="submit">提交上传</el-button>
  </div>
    </template>
  </el-upload>
  </div>
  <div>
  CRC32算法:<span v-text="result.crc32"></span><br>
  MD5算法:<span v-text="result.md5"></span><br>
  SHA_1算法:<span v-text="result.sha1"></span><br>
  SHA_512算法:<span v-text="result.sha512"></span><br>
  </div>

  </div>

  
 
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import type { UploadProps, UploadUserFile } from 'element-plus'

import { fileBatch } from '../../api/file';
const result = reactive({
      crc32:"",
      md5:"",
      sha1:"",
      sha512:""
    });
const file = ref<UploadUserFile[]>([]);
const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}
const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}
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
const submit = async() => {
  console.log(file.value);
  // 封装formData
  const data = new FormData();
  file.value.forEach(element => {
    data.append("file", element.raw);
  });
  const jsondata=await fileBatch(data)
  console.log(jsondata)
  Object.assign(result,jsondata)
};
</script>

  
  <style scoped>
  /* 在这里编写组件的样式 */
  .container {
  display: flex;
  justify-content: center; /* 水平居中 */
  height: 100vh; /* 设置容器高度为视口高度 */
 
}
  </style>
  