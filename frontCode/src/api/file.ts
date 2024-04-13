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
        
  