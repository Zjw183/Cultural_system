<template>
    <div class="pages">
      <div class="page" v-for="(item, index) in pages" :key="index" :class="{ active: currentIndex === index }">
        <div class="text">
          <h2 class="title">{{ item.title }}</h2>
          <p class="content">{{ item.content }}</p>
          <img :src="item.image" alt="Page Image" width="170" height="300" />
        </div>
        <div class="button-container" @click.stop>
          <button @click="goToPage(0)" :class="{ active: currentIndex === 0 }">1</button>
          <button @click="goToPage(1)" :class="{ active: currentIndex === 1 }">2</button>
          <button @click="goToPage(2)" :class="{ active: currentIndex === 2 }">3</button>
        </div>
      </div>
    </div>
  </template>
   
  <script>
  export default {
    name:'exhibitsOfCultural_container',
    data() {
      return {
        pages: [
          { image: require('@/assets/wenwutupian/1.png'), 
            title: '“瑞京云集区消费合作社”木印', 
            content: '其为国家三级文物。木质,长方形状,长8厘米,宽1.9厘米,高2.9厘米,底部阳刻楷书“瑞京云集区消费合作社”十个大字。这枚木印见证了中央苏区时期合作社运动历史。' 
          },
          { image: require('@/assets/wenwutupian/2.png'), 
            title: '油印单行本小册子——《乡苏工作的模范（二）——才溪乡》', 
            content: '其为国家三级文物。在第二次全国苏维埃代表大会上,中华苏维埃共和国临时中央政府将其作为大会材料发给参会代表学习讨论,将才溪乡的工作经验向全苏区总结推广。' 
          },
          { image: require('@/assets/wenwutupian/3.jpg'), 
            title: '两封中央苏区时期的特殊回信', 
            content: '其为国家一级文物。这两封信是时任中华苏维埃共和国中央工农检察人民委员会主席项英,分别于1934年2月8日和2月19日写给通讯员李克均的复信。' 
          },
        ],
        currentIndex: 0,
      };
    },
    methods: {
      goToPage(index) {
        this.currentIndex = index;
      },
    },
  };
  </script>
   
  <style scoped>
  .pages {
    position: relative;
    background-image: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),url('../assets/wenwutupian/back.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-attachment:fixed;
    height: 630px;
    width: 100%;
  }
   
  .page {
    display: none; /* 初始隐藏所有页面 */
    padding: 20px;
    margin: 0 auto;
    max-width: 900px;
  }
   
  .page.active {
    display: block; /* 仅显示当前活动的页面 */
  }
   
  .page img {
    height: auto;
    text-align: right;
    float: right;
  }
   
  .title{
    text-align: left;
    float: left;
    font-size: 25px;
  }
  
  .content{
    float: left;
    font-size: 20px;
  }
  .text{
    margin-bottom: 300px;
  }

  .button-container {
    position: absolute;
    right: 300px;
    display:block;
    margin-bottom: 300px;
    margin-top: 200px;
  }
 
  .button-container button {
    margin-right: 20px;
    bottom: 0;
    padding: 10px;
    border: none;
    background-color:rgba(53, 119, 75, 0.651);
    color :white;
    cursor: pointer;
  }
   
  .button-container button.active {
    background-color: #ffd700; /* 当前页面的按钮使用不同的背景色 */
  }
   
  .button-container button:hover {
    background-color: #ffd700;/* 鼠标悬停时的背景色 */
  }
  </style>