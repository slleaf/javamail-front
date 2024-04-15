import request from "../utils/request.js"
//eml邮件上传的api
export const uploadBatch = (data: FormData) => {
    return request({
      method:"post",
      url:"file/analyze",
      headers:{
        "Content-Type": "multipart/form-data",
      },
      data,
    })
  }
//附件分析的api
  export const fileBatch = (data: FormData) => {
    return request({
      method:"post",
      url:"file/verification",
      headers:{
        "Content-Type": "multipart/form-data",
      },
      data,
    })
  }
  //邮件发送的api
  export const addMail = (data: FormData) => {
    return request({
      method:"post",
      url:"mail/send",
      headers:{
        "Content-Type": "multipart/form-data",
      },
      data,
    })
  }
  //查询邮件记录的api
  export const getfindNewsPageInfo = (info) => {
    return request.post("mail/mailload",info)
  }
        
  