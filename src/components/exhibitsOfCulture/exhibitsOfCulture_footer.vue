<template>
    <div class="footer">
      <div class="foot-img">
        <!-- <img src="@/assets/底部页面.jpg" class="footer_image"/> -->
        <div class="copy">
          <p>&copy;版权所有 2024 赣南师范大学中国共产党革命精神与文化资源研究中心 邮编:341000
          <br>
          地址:江西省赣州市蓉江新区师大南路赣南师范大学人文科技中心一楼</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {

      };
    },
    components: {

    },
  };
  </script>
  
  <style scoped>
  .footer {
    background-size: cover;
    position: relative;
  }
  
  .foot-img {
    position: relative;
  }
  
  .copy {
    z-index: 999;
    position: absolute;
    width: 90%;
    text-align: center;
  }
  
  .copy p {
    color: white;
    margin: auto; /* 移除默认的边距 */
  }
  
  .footer_image {
    width: 100%;
    height: 12vw;
    position: absolute;
  }
  /* --------------------PC 样式-------------- */
@media only screen and (min-width:768px) {
  p {
    line-height: 30px;
  }
  .copy {
    margin-top: 4%;
    font-size: 0.5em;
  }
}
    /* --------------------屏幕大小 小于768 手机样式----------------- */
@media only screen and (max-width:768px) {
  p {
    height: 30%;
    line-height: 15px;
  }
  .copy {
    margin: 3vw auto;
    font-size: 0.5rem;
  }
}
  </style>