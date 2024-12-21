<template>
    <div>
    <div class="header">
      <div class="left-logo">
        <img src="../../assets/苏区红文物展览系统.png" style="width: 200px; height: 100px;">
      </div>
      <div class="header-tab">
        <!-- 使用 :class 绑定 active 类 -->
        <div class="header-menu" :class="{ active: isMenuActive }">
          <div 
            class="menu-item"
            :class="{ 'is-active': currentMenu === 0 }"
            @click="handleSelect(0)"
          >
            首页
            <span class="underline" :class="{ 'is-active': currentMenu === 0 }"></span>
          </div>
          <div 
            class="menu-item"
            :class="{ 'is-active': currentMenu === 1 }"
            @click="handleSelect(1)"
          >
            展览中心
            <span class="underline" :class="{ 'is-active': currentMenu === 1 }"></span>
          </div>
          <div 
            class="menu-item"
            :class="{ 'is-active': currentMenu === 2 }"
            @click="handleSelect(2)"
          >
            文物地图
            <span class="underline" :class="{ 'is-active': currentMenu === 2 }"></span>
          </div>
          <div 
            class="menu-item"
            :class="{ 'is-active': currentMenu === 3 }"
            @click="handleSelect(3)"
          >
            数字文创
            <span class="underline" :class="{ 'is-active': currentMenu === 3 }"></span>
          </div>
          <div 
            class="menu-item"
            :class="{ 'is-active': currentMenu === 4 }"
            @click="handleSelect(4)"
          >
            ai对话
            <span class="underline" :class="{ 'is-active': currentMenu === 4 }"></span>
          </div>
          <!-- 更多菜单项 -->
        </div>
        <div class="login"><i class="el-icon-user"></i></div>
        <button class="hamburger" @click="toggleMenu">
          ☰
        </button>
      </div>
    </div>
  
    </div>
    
  </template>
  
  <script>
  import imgTab from '../exhibitsOfCulture/exhibitsOfCulture_imgTab.vue'
  export default {
    data() {
      return {
        isMenuActive: false, // 控制菜单显示状态
        currentMenu: 0, // 当前选中的菜单项索引
      };
    },
    methods: {
      toggleMenu() {
        this.isMenuActive = !this.isMenuActive; // 切换菜单显示状态
      },
      handleSelect(index) {
        this.currentMenu = index; // 更新当前选中的菜单项
        if (this.isMenuActive) {
          this.toggleMenu(); // 如果菜单是展开状态，点击菜单项后关闭菜单
        }
      }
    },
    components:{
        // imgTab
    }
  };
  </script>
  
  <style scoped>
  .login {
    margin-right: 30px;
    font-size: 30px;
  }
  
  .header {
    height: 100px;
    width: 100%;
    background-color: rgba(53, 119, 75, 0.651);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .left-logo img {
    display: block; /* 防止图片下方出现空白间隙 */
  }
  
  .header-tab {
    display: flex;
    align-items: center;
    margin-right: 20px; /* 调整间距 */
  }
  
  .header-menu {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    margin-right: 200px;
  }
  
  .menu-item {
    margin: 0 50px;
    color: rgb(255, 255, 255);
    cursor: pointer;
    text-decoration: none;
    font-size: 25px;
    font-family: helvetica;
    position: relative;
    transition: color 0.3s ease; /* 渐变效果 */
  }
  
  .menu-item:hover {
    color: #ffd700; /* 金色 */
  }
  
  .menu-item.is-active {
    font-weight: bold; /* 加粗选中的菜单项 */
    color: #ffd700; /* 金色 */

  }
  
  .underline {
    position: absolute;
    bottom: -5px; /* 调整线的位置，使其位于文字下方 */
    left: 50%;
    width: 0;
    height: 2px;
    background-color: #ffd700; /* 金色 */
    transition: width 0.3s ease, left 0.3s ease;
  }
  
  .menu-item.is-active .underline {
    width: 100%;
    left: 0;
  }
  
  .hamburger {
    display: none;
    font-size: 1.5em;
    background: none;
    border: none;
    color: black;
    cursor: pointer;
  }
  
  @media (max-width: 768px) {
    .header-menu {
      flex-direction: column;
      position: absolute;
      right: 0;
      top: 100%;
      width: 100%;
      background-color: #bfa;
      display: none; /* 默认不显示 */
    }
  
    .header-menu.active {
      display: flex; /* 激活时显示 */
      flex-direction: column;
      align-items: center;
      z-index: 2000;
    }
  
    .hamburger {
      display: block; /* 小屏幕时显示汉堡菜单 */
    }
  }
  </style>