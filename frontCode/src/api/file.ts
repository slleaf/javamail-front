import request from "../utils/request.js"

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
        
  