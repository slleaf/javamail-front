
export const staticRoutes = [
  {
    path: "/",
    redirect: "/parseMail",
  },
  {
    // 发邮件
    path: "/addnewmail",
    component: () => import("../pages/addNewMail/index.vue"),
    name: "addNewMail",
  },
  {
    //发件历史
    path: "/detail",
    component: () => import("../pages/newMailPage/index.vue"),
    name: "newMailPage",
  },
  {
    // 登录
    path: "/login",
    component: () => import("../pages/Login/index.vue"),
    name: "Login",
  },
  {
    //注册
    path: "/register",
    component: () => import("../pages/Register/index.vue"),
    name: "Register",
  },
   {
    //发件详情
    path: "/newmaildetail",
    component: () => import("../pages/newMailDetail/index.vue"),
    name: "newMailDetail",
  },
  {
    //收件登录
    path: "/receivemaillogin",
    component: () => import("../pages/ReceiveMailLogin/index.vue"),
    name: "ReceiveMailLogin",
  },
  {
    //收件历史
    path: "/receivemailpage",
    component: () => import("../pages/ReceiveMailPage/index.vue"),
    name: "ReceiveMailPage",
  },
  {
    //收件详情
    path: "/receivemaildetail",
    component: () => import("../pages/receiveMailDetail/index.vue"),
    name: "receiveMailDetail",
  },
  {
    //邮件分析
    path: "/parsemail",
    component: () => import("../pages/parseMail/index.vue"),
    name: "parseMail",
  },
  {
    //文件校验
    path: "/fileverification",
    component: () => import("../pages/fileVerification/index.vue"),
    name: "fileverification",
  },
];
