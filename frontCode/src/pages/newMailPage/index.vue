<template>
  <div class="container">
    <div class="listItem">
      <!-- 每一项头条列表 -->
      <div class="containerItem" v-for="item in pageData" :key="item.id">
        <div>
          <span class="text">{{ item.mail_subject }}</span>
        </div>
        <div class="detail">
          <span>发件人:{{ item.mail_from }}</span>
          <span>收件人:{{ item.mail_to }}</span><br>
          <span>发送时间:{{ item.sent_date }}</span>
        </div>
        <div>
          <el-button @click="toDetail(item.id)" size="small"
            style="background: #198754; margin-left: 15px; color: #bbd3dc">查看详情</el-button>
          <el-popconfirm  @confirm="handlerDelete(item.hid)" :title="`您确定要删除${item.title}吗?`">
            <template #reference>
              <el-button  size="small" style="background: #dc3545; color: #bbd3dc">删除</el-button>
            </template>
          </el-popconfirm>
        </div>
      </div>
  
      <!-- 分页器 -->
      <div style="margin-top: 20px">
        <el-pagination 
          v-model:current-page="findNewsPageInfo.pageNum"
          v-model:page-size="findNewsPageInfo.pageSize" 
          @size-change="getPageList"
          @current-change="getPageList"
          :page-sizes="[5,7,10]" 
          background
          layout="prev, pager, next , ->, sizes, total" 
          :total="totalSize" />
      </div>
    </div>
  </div>
</template>
  
<script >

 import { defineComponent } from 'vue'
  export default  defineComponent({
    name:'HeadlineNews'
  })
</script>
<script  setup>
import { ref, onMounted, getCurrentInstance } from "vue"
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import pinia from '../../stores/index';
import { useUserInfoStore } from '../../stores/userInfo'
import { getfindNewsPageInfo } from '../../api/file';
const userInfoStore = useUserInfoStore(pinia)
const router = useRouter()

const findNewsPageInfo = ref(
  {
    username:"",
    pageNum: 1,        // 页码数
    pageSize: 5,     // 页大小
  }
)
findNewsPageInfo.value.username = userInfoStore.username
const totalSize = ref(0) //分页总数量
// 初始化列表数据
const pageData = ref([{
  id: null,
  mail_to:"",
  mail_subject:"",
  mail_from:"",
  sent_date:""
}])


// 初始化请求分页列表数据
const getPageList = async () => {
  let result = await getfindNewsPageInfo(findNewsPageInfo.value)
  pageData.value = result.pageInfo.pageData
 findNewsPageInfo.value.pageNum = result.pageInfo.pageNum
 findNewsPageInfo.value.pageSize = result.pageInfo.pageSize
 totalSize.value = +result.pageInfo.totalSize
}
// 组件挂载的生命周期钩子
onMounted(() => {
  getPageList()
})
// 点击查看全文的回调
const toDetail = (hid) => {
  // router.push({ name: "Detail" ,query:{ hid }});
  console.log(findNewsPageInfo.value)
}

// 点击删除的回调
const handlerDelete = async (id) => {
  await removeByHid(id)
  ElMessage.success('删除成功!')
  //重新获取列表请求
  getPageList()
}
</script>

<style lang="less" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  // 列表样式
  .listItem {
    .containerItem {
      margin-top: 20px;
      border-radius: 10px;
      border: 2px solid #ebebeb;
      width: 600px;
      height: 140px;

      div {
        margin-top: 10px;
      }

      .text {
        margin-left: 15px;
        color: #353a3f;
      }

      .detail {
        span {
          margin-left: 15px;
          color: #8b778a;
          font-size: 14px;
        }
      }
    }
  }
}
</style>