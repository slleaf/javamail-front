<template>
  <div class="container" v-loading="loading" element-loading-text="正在访问邮箱服务器，请稍等">
    <div class="listItem">
      <!-- 每一项头条列表 -->
      <div class="containerItem" v-for="item in pageData" :key="item.id">
        <div>
          <span class="text">{{ item.subject }}</span>
        </div>
        <div class="detail">
          <span>发件人:{{ item.receive_mail_from }}</span><br>
          <span>发送时间:{{ item.sent_date }}</span><br>
          <span>是否已读：{{ item.is_seen }}</span>
        </div>
        <div>
          <el-button @click="toDetail(item.id)" size="small"
            style="background: #409EFF; margin-left: 15px; color: #FFFFFF">查看详情</el-button>
        </div>
      </div>
  
      <!-- 分页器 -->
      <div style="margin-top: 20px">
        <el-pagination 
          v-model:current-page="findInboxPageInfo.pageNum"
          v-model:page-size="findInboxPageInfo.pageSize" 
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
    name:'InboxPage'
  })
</script>
<script  setup>
import { ref, onMounted, getCurrentInstance } from "vue"
import { ElMessage } from 'element-plus'
import { useRoute,useRouter } from "vue-router";
import { getInboxPageInfo } from '../../api/file';
const route = useRoute()
const router = useRouter()
const loading = ref(true)

const findInboxPageInfo = ref(
  {
    protocol:"",
    mailDir:"",
    passWord:"",
    pageNum: 1,        // 页码数
    pageSize: 5,     // 页大小
  }
)
findInboxPageInfo.value.protocol=route.query.protocol
findInboxPageInfo.value.mailDir=route.query.mailDir
findInboxPageInfo.value.passWord=route.query.passWord
const totalSize = ref(0) //分页总数量
// 初始化列表数据
const pageData = ref([{
  id: null,
  subject:"",
  receive_mail_from:"",
  sent_date:"",
  is_seen:null
}])


// 初始化请求分页列表数据
const getPageList = async () => {
  let result = await getInboxPageInfo(findInboxPageInfo.value)
  pageData.value = result.pageInfo.pageData
 findInboxPageInfo.value.pageNum = result.pageInfo.pageNum
 findInboxPageInfo.value.pageSize = result.pageInfo.pageSize
 totalSize.value = +result.pageInfo
 loading.value=false
}
// 组件挂载的生命周期钩子
onMounted(() => {
  getPageList()
})
// 点击查看全文的回调
const toDetail = (id) => {
  router.push({ name: "receiveMailDetail" ,query:{ id }});
  console.log(findInboxPageInfo.value)
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
      height: 150px;

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
  