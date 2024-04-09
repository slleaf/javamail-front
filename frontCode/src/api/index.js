import request from "../utils/request/"




//登录的接口
export const getLogin = (info) => {
  return request.post("user/login",info);
};
//获取用户信息的接口
export const getUserInfo = (info) => {
  return request.get("user/getUserInfo");
};

//注册校验的接口  user/checkUserName
export const registerValidateApi = (username) => {
    return request({
         method: "post",
            url: "user/checkUserName",
            headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            data:`username=${username}`
  })
};

// 注册的接口
export const registerApi = (userInfo) => {
  return request.post("user/regist",userInfo)
}
//判断用户登录过期的接口
export const isUserOverdue = () => {
  return request.get("user/checkLogin")
}


