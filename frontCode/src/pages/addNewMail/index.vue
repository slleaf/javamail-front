<template>
  <div>
    <h2>发送邮件</h2>
    <form @submit.prevent="sendEmail">
      <label for="from">发件人：</label>
      <input type="email" id="from" v-model="formData.mailFrom" value="3438357823@qq.com" disabled required><br>
      <label for="to">收件人：</label>
      <input type="email" id="to" v-model="formData.mailTo" required><br>
      <label for="ccOrBcc">抄送或密送：</label>
      <select id="ccOrBcc" v-model="ccOrBcc">
        <option value="cc">抄送</option>
        <option value="bcc">密送</option>
      </select><br>
      <label for="ccOrBccAddress">抄送或密送地址：</label>
      <input type="email" id="ccOrBccAddress" v-model="formData.ccOrBccAddress" required><br>
      <label for="subject">主题：</label>
      <input type="text" id="subject" v-model="formData.mailSubject" required><br>
      <label for="message">正文：</label>
      <textarea id="message" v-model="formData.mailText" required></textarea><br>
      <label for="files">附件：</label>
      <input type="file" id="files" ref="files" multiple><br>
      <button type="submit">发送</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        mailFrom: '3438357823@qq.com',
        mailTo: '',
        ccOrBcc: 'cc', // 默认为抄送
        ccOrBccAddress: '', // 抄送或密送地址
        mailSubject: '',
        mailText: ''
      }
    };
  },
  computed: {
    fixedMailFrom() {
      return this.formData.mailFrom;
    }
  },
  methods: {
    sendEmail() {
      // 邮箱地址格式校验
      if (!this.validateEmail(this.formData.mailTo)) {
        alert('收件人邮箱地址格式不正确！');
        return;
      }
      if (!this.validateEmail(this.formData.ccOrBccAddress)) {
        alert('抄送或密送地址格式不正确！');
        return;
      }

      let formData = new FormData();
      let files = this.$refs.files.files;
      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
      }
      formData.append('mailFrom', this.formData.mailFrom);
      formData.append('mailTo', this.formData.mailTo);
      formData.append(this.formData.ccOrBcc, this.formData.ccOrBccAddress); // 动态添加抄送或密送
      formData.append('mailSubject', this.formData.mailSubject);
      formData.append('mailText', this.formData.mailText);

      axios.post('Http://localhost:8080/mail/send', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        console.log(response.data);
        alert('邮件发送成功！');
      })
      .catch((error) => {
        console.error(error);
        alert('邮件发送失败！');
      });
    },
    validateEmail(email) {
      // 简单的邮箱格式校验
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    }
  }
};
</script>

