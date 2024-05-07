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
  //删除邮件记录的api
  export const removeById = (id) => {
    return request({
         method: "post",
            url: "mail/removeById",
            headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            data:`id=${id}`
  })
};
//发件记录详情的api
export const getNewMailDetail = (id) => {
  return request({
      method: "post",
      url: "mail/showMailDetail",
      headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
       data:`id=${id}`
});
};
//收件箱分页的api
export const getInboxPageInfo = (info) => {
  return request.post("receiveMail/inbox",info)
}
//收件箱详情的api
export const getReceiveMailDetail = (id) => {
  return request({
      method: "post",
      url: "receiveMail/showInboxDetail",
      headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
       data:`id=${id}`
});
};
//邮件时间校验的api
export const dataAnalyze = (data: FormData) => {
  return request({
    method:"post",
    url:"file/dataAnalyze",
    headers:{
      "Content-Type": "multipart/form-data",
    },
    data,
  })
}
        
  