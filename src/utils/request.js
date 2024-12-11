import axios from 'axios'
import { getToken } from './localStorage'
//导入真实的Url
import trueUrl from '../main'
import { getClass } from '../api/user/class'
const devL = "http://127.0.0.1:8022" //本地测试1.116.165.56
const devLiJun = "http://192.168.1.101:8022"
const devLD = "http://192.168.43.48:8022"
const devtcz = "http://192.168.1.101:8022"
const redirect = "http://www.suquhong.cn/api"
const devSYuMing = 'http://sqh.gnnu.edu.cn/api'
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: trueUrl,
  // 超时
  timeout: 10000
})
service.interceptors.response.use((res) => {
  //  全局拦截错误，未通过过滤器
  if (res.data.code == '401') {
    Message({
      type: 'error',
      center: true,
      message: '请重新登录!'
    })
    // 跳转到登录页
    router.push('/login')
  }
  return res;

});
// 请求拦截器
service.interceptors.request.use((req) => {
  // console.log(req,'请求'); || req.url != '/home'
  if (req.url != '/login') {
    // 不是登录就要添加请求头，附加上token
    req.headers.authorization = getToken();
  }
  return req;

});


//前端判断身份

export function identity(admin, duty, class_name, redclass, isshow) {

  //admin=0代表为学生
  if (admin == 0) {
    if(class_name!=null)
    {
      return redclass[class_name - 1].className + "学生";
    }
    isshow[5] = false;
    isshow[4] = false;
    return "普通学生"
  }
  //admin=1代表为老师
  if (admin == 1) {
    //红色班级辅导员
    if (duty == 0 ) {
      for (let i = 0; i < isshow.length; i++) {
        isshow[i] = false
      }
      isshow[3] = true
      isshow[6] = true
      isshow[7] = true
      isshow[12] = true
      isshow[14] = true
      return redclass[class_name - 1].className + "辅导员";
    }
    //红色班班主任
    else if (duty == 1) {
      for (let i = 0; i < isshow.length; i++) {
        isshow[i] = false
      }
      isshow[3] = true
      isshow[6] = true
      isshow[7] = true
      isshow[12] = true
      isshow[14] = true
      return redclass[class_name - 1].className + "班主任";
    }
    else if (duty == 3) {
      //特殊的管理老师
      if (class_name == 0) {
        for (let i = 0; i < isshow.length; i++) {
          isshow[i] = false
        }
        isshow[9] = true;
        isshow[7] = true;
        isshow[10] = true


        return "红色资源模块管理员";
      } else if (class_name == 1) {
        for (let i = 0; i < isshow.length; i++) {
          isshow[i] = false
        }
        isshow[9] = true;
        isshow[7] = true;
        isshow[10] = true
        return "红色资源模块管理员";
      } else if (class_name == 2) {
        for (let i = 0; i < isshow.length; i++) {
          isshow[i] = false
        }
        isshow[9] = true;
        isshow[7] = true;
        isshow[10] = true
        return "红色走读模块管理员";
      } else if (class_name == 3) {
        for (let i = 0; i < isshow.length; i++) {
          isshow[i] = false
        }
        isshow[9] = true;
        isshow[7] = true;
        isshow[10] = true
        return "红色马院模块管理员";
      }
      else if (class_name == 4) {
        for (let i = 0; i < isshow.length; i++) {
          isshow[i] = false
        }
        isshow[9] = true;
        isshow[7] = true;
        isshow[10] = true
        return "红色研究模块管理员";
      } else {
        return "老师";
      }
    } 
    else if (duty == 2) {
      isshow[5] = false;
      isshow[4] = false;
      return "普通老师";
    }
    else {
      return "普通老师";
    }
  }
  //admin=2代表为管理员
  if (admin == 2) {
    if (duty == 3) {
      //代表我们
      for (let i = 0; i < isshow.length; i++) {
        isshow[i] = false
      }
      isshow[1] = true
      isshow[2] = true
      isshow[7] = true
      isshow[13] = true

      return "研究中心";
    } else if (duty == 4) {
      //学工处跟我们一样
      for (let i = 0; i < isshow.length; i++) {
        isshow[i] = false
      }
      isshow[1] = true
      isshow[2] = true
      isshow[7] = true
      //学工处管理员
      return "学工处管理员"
    } else if (duty == 2) {
      for (let i = 0; i < isshow.length; i++) {
        isshow[i] = falase
      }
      isshow[7] = true
      isshow[11] = true
      isshow[8] = true

      return "校学生会管理员";
    }
    else if(duty==1)
    {
      for (let i = 0; i < isshow.length; i++) {
        isshow[i] = false
      }
      isshow[7] = true
      isshow[11] = true
      isshow[8] = true

      return "红色班级管理员";
    }
    else if(duty==5)
    {
      //科技学院管理员
      for (let i = 0; i < isshow.length; i++) {
        isshow[i] = false
      }
      isshow[3] = true
      isshow[6] = true
      isshow[7] = true

      return redclass[class_name - 1].className + "管理员";
    }
    else {
      return "管理员";
    }

  }
  return "普通用户";
}
export function identity1(admin, duty, class_name, redclass) {

  //admin=0代表为学生
  if (admin == 0) {
    if(class_name!=null)
    {
      return redclass[class_name - 1].className + "学生";
    }
    return "普通学生"
   
  }
  //admin=1代表为老师
  if (admin == 1) {
    //红色班级辅导员
    if (duty == 0) {

      return redclass[class_name - 1].className + "辅导员";
    }
    //红色班班主任
    else if (duty == 1) {

      return redclass[class_name - 1].className + "班主任";
    }
    else if (duty == 3) {
      //特殊的管理老师
      if (class_name == 0) {

        return "红色记忆模块管理员";
      } else if (class_name == 1) {

        return "红色艺术模块管理员";
      } else if (class_name == 2) {

        return "红色走读模块管理员";
      } else if (class_name == 3) {

        return "红色课堂模块管理员";
      } 
      else if (class_name == 4) {

        return "红色研究模块管理员";
      } else {
        return "老师";
      }
    }
    else if (duty == 2) {
      return "普通老师";
    } else {
      return "普通老师";
    }

  }
  //admin=2代表为管理员
  if (admin == 2) {
    if (duty == 3) {
      //代表我们
      return "研究中心";
    } else if (duty == 4) {
      //学工处跟我们一样

      //学工处管理员
      return "学工处管理员"
    } else if (duty == 2) {


      return "校学生会管理员";
    }
    else if(duty==5)
    {
      //科技学院管理员
      return redclass[class_name - 1].className + "管理员";
    }
    else if(duty==1)
    {
      
      return "红色班级管理员";
    } 
    else {
      return "管理员";
    }

  }


  return "普通用户";




}
export default service