<template>
  <div class="headerContainer">
    <!-- 头部左侧区域 -->
    <div class="left">
    <el-menu
    :default-active="activeIndex2"
    
    class="el-menu-demo"
    :unique-opened="true"
    router="true"
    close-on-click-outside="true"
    background-color="#212529"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleSelect"
    
  >
    
    <el-sub-menu index="1" >
      <template #title >邮件发送</template>
      <el-menu-item index="/addnewmail" @click="goAddMails">发送邮件</el-menu-item>
      <el-menu-item index="/newmailpage" @click="goNewMailPages">发件记录</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/receivemaillogin" @click="goinbox">收件箱</el-menu-item>
    <el-menu-item index="/parsemail" @click="goToEmailAnalysis">邮件分析</el-menu-item>
    <el-menu-item index="/fileverification" @click="goToAttachmentValidation">附件校验</el-menu-item>
  </el-menu>
    </div>
    <!-- 头部右侧区域 -->
    <div class="right">
      <!-- 用户登录以后的展示 -->
      <div class="btn-dropdown">
      <div v-if="nickName" style="display: flex; justify-content: center; align-items: center;">
             <el-dropdown>
          <el-button type="primary">
          您好:{{ nickName }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="Logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
       <div v-else class="containerButton">
          <el-button size="small" style="background: #212529; color: #aea7a2" @click="toLogin">登录</el-button>
          <el-button size="small" style="background: #ffc107; color: #684802" @click="toRegister">注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Header'
})
</script>

<script setup>
import {  isUserOverdue } from '../api/index'
import { ref, onMounted , getCurrentInstance ,watch, onUpdated} from "vue"
import { useRouter } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'
import { removeToken } from '../utils/token-utils' 
import pinia from '../stores/index';
import { useUserInfoStore } from '../stores/userInfo'
const userInfoStore = useUserInfoStore(pinia)
const nickName = ref("")
// 获取到 全局事件总线
const { Bus } = getCurrentInstance().appContext.config.globalProperties
const router = useRouter()

const toLogin = () => {
router.push({ name: "Login" });
}
//点击去注册页面
const toRegister = () => {
  router.push({ name: "Register" });
}

// 页面挂载的生命周期回调
onUpdated(() => {
  nickName.value = userInfoStore.nickName
})





// 点击退出登录的回调
const Logout = () => {
  removeToken()
  userInfoStore.initUserInfo()
  nickName.value = ""
  router.go({ name: "HeadlineNews" });
}

//点击发布新闻的回调

</script>
<style lang="less" scoped>
.headerContainer {
  width: 100%;
  height: 60px;
  background: #212529;
  display: flex;
  justify-content: space-around;
  .left {
    ul {
      display: flex;
    margin-left: -100px; /* 将整个菜单向左移动 20px */
      li {
        list-style: none;
      margin-left: 10px; /* 调整菜单项之间的间距 */
        a:-webkit-any-link {
          text-decoration: none;
          color: #59646b;
          &.active {
            color: #c0adab;
          }
        }
      white-space: nowrap; /* 禁止菜单项换行 */
    }
    }
  }
  .right {
    .containerButton {
      display: flex;
      align-items: center;
    }
    line-height: 60px;
    display: flex;
    flex-wrap: nowrap;
    .rightInput {
  display: flex;
  align-items: center;
}

.btn-dropdown {
  display: flex;
  align-items: center;
}

:deep(.el-button) {
  display: flex;
  justify-content: center;
  align-items: center;
}

  }
}
.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>


















