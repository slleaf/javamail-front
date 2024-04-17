<template>
    <div class="img">
      <h1>为什么</h1>
        <el-image style="width: 1200px; height: " :src="url" :fit="contain" />
      </div>
  </template>
  <script lang="ts" setup>
  const url =
    'http://localhost:8080/soyo.png'
  </script>
  
  <style scoped>
  .img{
    margin-left: 155px;
  }
  
  </style>