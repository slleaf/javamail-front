<template>
  <div class="headerContainer">
    <!-- 头部左侧区域 -->
    <div class="left">
      <div class="my-div">
      <router-link to="/addnewmail" class="nav-link">发邮件</router-link>
      <router-link to="/receivemaillogin"  class="nav-link">收件箱</router-link>
      <router-link to="/parsemail"  class="nav-link">邮件分析</router-link>
      <router-link to="/fileverification"  class="nav-link">附件校验</router-link>
    </div>
  
    </div>
    <!-- 头部右侧区域 -->
    <div class="right">
      
      <!-- 用户登录以后的展示 -->
      <div class="btn-dropdown">
      <!-- 用户没有登录的时候的展示 -->
     
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

<style>
.el-dropdown {
  vertical-align: top;
  width: 100px;
}

.el-dropdown+.el-dropdown {
  margin-left: 15px;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>

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
      li {
        list-style: none;
        margin-left: 20px;
        a:-webkit-any-link {
          text-decoration: none;
          color: #59646b;
          &.active {
            color: #c0adab;
          }
        }
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
      :deep(.el-input__inner) {
        height: 30px;
        width: 150px;
      }
    }
    .btn-dropdown{
      display: flex;
      align-items: center;
    }
    :deep(.el-button) {
      margin: 0 0 0 10px;
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
.nav-link {
  margin-bottom: 10px; // 调整下方间距
  padding: 8px 12px;
  border-radius: 4px;
  background-color: #fff;
  color: #000;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: #f0f0f0;
}
.my-div {
    margin-top: 20px; /* 增加上方间距 */
  }
</style>


















