<template>
  <div class="seeDetails">
    <div>
      <h4>{{ detailList.subject }}</h4>
    </div>
    <div style="margin-right: 250px">
      <span>发件人：{{ detailList.receiveMailFrom }}<{{detailList.mailFrom  }}></span><br>
      <span>时间：{{ detailList.sentDate }}</span><br>
      <span>收件人:<{{ detailList.receiveMailTo }}></span><br>
      <span>抄送:<{{ detailList.mailCc }}></span><br>
      <span>邮件大小:<{{ detailList.size }}></span><br>
      <span>附件：{{ detailList.fileDir }}</span><br>
      <span>是否已读:<{{ detailList.seen }}></span>
    </div>
    <div style="width: 500px; margin: 20px 0px 0px 70px">
      <p>
        {{ detailList.text }}
      </p>
    </div>
  </div>
</template>

<script >
 import { defineComponent } from 'vue'
  export default  defineComponent({
    name:'ReceiveMailDetail'
  })
</script>
<script  setup>
import { getReceiveMailDetail } from '../../api/file';
import { ref , onMounted } from "vue"
import { useRoute } from 'vue-router'
const route = useRoute() // 路由信息对象

const detailList = ref({}) //详情数据
//获取详情初始化数据
const getDetailList = async () => {
  let result = await getReceiveMailDetail(route.query.id)
  // console.log(result.mail)
  detailList.value = result.mail
  console.log(detailList.value)
}
// 页面初始化钩子
onMounted(() => {
  getDetailList()
})

  
</script>

<style lang="less" scoped>
.seeDetails {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    span {
      padding-right: 15px;
      font-size: 14px;
      color: #1472c9;
    }
    p {
      font-size: 14px;
      color: #2b2e30;
    }
  }
}
</style>
  