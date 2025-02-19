<template>
    <div>
      <headerBar :active="0" />
      <!-- <center-content></center-content> -->
      <!-- 悬浮图标 -->
      <!-- <div class="point" ref="point"
          :style="`width:${divWidth}px;height:${divHeight}px;left:${moveLeft}px;top:${moveTop}px;`"
          @touchstart.prevent="dragStart" @touchend.prevent="dragEnd"
          @touchmove.prevent="dragMove" @click="to_chatbro">
        <img class="imgzhushou" src="../../assets/zhushou.png" alt="">
      </div> -->
      <div class="up" @click="goBack">
        <i class="el-icon-arrow-up"></i>
      </div>
      <div @scroll="handleScroll">
        <containerBar />
      </div>
    </div>
  </template>
  
  <script>
  import CenterContent from '../../components/exhibitsOfCulture/exhibitsOfCulture_center.vue';
  import  headerBar from '../../components/exhibitsOfCulture/exhibitsOfCulture_header_new.vue';
  import  containerBar from '../../components/exhibitsOfCultural_container.vue';
  export default {
    components: {
      // CenterContent,
      headerBar,
      containerBar
    },
    data() {
      return {
        divWidth: 100, // 可拖拽元素宽度
        divHeight: 100, // 可拖拽元素高度
        moveLeft: 0, // 可拖拽元素距离屏幕左边界
        moveTop: 0, // 可拖拽元素距离屏幕上边界
      };
    },
    mounted() {
      window.addEventListener('wheel', this.handleScroll);
    },
    beforeDestroy() {
      window.removeEventListener('wheel', this.handleScroll);
    },
    methods: {
      to_chatbro() {
        this.$router.push('/chatbro');
      },
      handleScroll(event) {
        if (event.deltaY < 0) {
          // 向下滚动，跳转到下一个页面
          this.$router.go(-1); // 替换为实际的下一个页面路径
        }
      },
      dragStart(e) {
        this.$refs.point.style.transition = "none";
      },
      dragEnd() {
        this.$refs.point.style.transition = 'all 0.3s';
      },
      dragMove(e) {
        if (e.touches.length) {
          let touch = e.touches[0];
          this.moveLeft = touch.clientX - this.divWidth / 2;
          this.moveTop = touch.clientY - this.divHeight / 2;
        }
      },
      goBack() {
        this.$router.go(-1);
      }
    }
  };
  </script>
  
  <style scoped>
  .imgzhushou {
    width: 80%;
    height: 80%;
  }
  
  .point {
    position: fixed;
    bottom: 5%;
    right: 1%;
    padding: 0;
    z-index: 10000;
  }
  
  .up {
    position: fixed;
    top:15%;
    left: 50%;
    transform: translateX(-50%);
    height: 20px;
    line-height: 20px;
    /* background-color: aqua; */
    cursor: pointer;
    z-index: 1000;
  }
  
  .up i {
    font-weight: bold;
      font-size: 25px;
      color:  rgba(53, 119, 75, 0.651);
    display: inline-block;
    animation: bounce 1s infinite;
  }
  
   
  .container {
    height: 100%;
    overflow-y: scroll;
  }

  .scroll-item {
    height: 100%;
    transition: transform 0.3s ease-out;
  }

  .left{
    position: relative;
    padding: 40px 0 30px;
    text-align: right;
    float: left;
  }
  h3{
    text-align: left;
  }
  li{
    list-style: none;
    display: list-item;
    text-align: -webkit-match-parent;
  }
  .more{
    text-align: right;
    margin-top: 20px;
    font-size: 12px;
  }
  .pic{
    float: right;
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }
  </style>