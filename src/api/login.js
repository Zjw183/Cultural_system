// 存储接口封装，用户相关的请求模块
import request from "@/utils/request.js";
 
// export const login = (user) => {
//   return request({
//     url: '', // 接口地址
//     method: 'POST', 'GET', // 请求方式
//     // 如果参数通过请求体来发(post)，用data是请求体参数
//     // 如果参数通过请求行来发(get)，用params是路径参数
//     data: user
//   })
// }
 
// 用户登录
export const login = (data) => {
  return request({
    method: "POST",
    url: "/admin/login",
    data,
  });
};
 
// 需要携带 token 获取数据时，携带登陆成功后存储在本地的token值
// 查询所有使用记录
export const listRecord = () => {
  return request({
    method: "GET",
    url: "/admin/record/listRecord",
    headers: {
      "X-Token": localStorage.getItem("X-Token"),
    },
  });
};
 
// 携带params参数，也是手动输入的值
export const others = (params) => {
  return request({
    method: "GET",
    url: "/admin/others",
    params,
  });
};