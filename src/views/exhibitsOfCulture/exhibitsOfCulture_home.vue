<template>
    <div>
      <headerBar />
      <imgTab/>
      <!-- 悬浮图标 -->
      <!-- <div class="point" ref="point"
          :style="`width:${divWidth}px;height:${divHeight}px;left:${moveLeft}px;top:${moveTop}px;`"
          @touchstart.prevent="dragStart" @touchend.prevent="dragEnd"
          @touchmove.prevent="dragMove" @click="to_chatbro">
        <img class="imgzhushou" src="../../assets/zhushou.png" alt="">
      </div> -->
      <div class="down" @click="scrollToNextSection">
        <i class="el-icon-arrow-down"></i>
      </div>
    </div>
  </template>
  
  <script>
  import headerBar from '../../components/exhibitsOfCulture/exhibitsOfCulture_header_new.vue';
  // import CenterContent from '../../components/exhibitsOfCulture/exhibitsOfCulture_center.vue';
  import imgTab from '../../components/exhibitsOfCulture/exhibitsOfCulture_imgTab.vue';
  export default {
    components: {
      headerBar,
      imgTab
      // CenterContent,
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
        if (event.deltaY > 0 && this.$route.path !== '/center_content') {
          // 向下滚动，跳转到下一个页面
          this.$router.push('/center_content').catch(err => {
          });
        } else if (event.deltaY < 0) {
          // 向上滚动，返回上一个页面
          this.$router.go(-1);
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
      scrollToNextSection() {
        if (this.$route.path !== '/center_content') {
          this.$router.push('/center_content').catch(err => {});
        }
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
  
  .down {
    position: fixed;
    bottom:2%;
    left: 50%;
    transform: translateX(-50%);
    height: 20px;
    line-height: 20px;
    /* background-color: aqua; */
    cursor: pointer;
  }
  
  .down i {
    font-weight: bold;
    font-size: 25px;
    color: rgba(53, 119, 75, 0.651);
    display: inline-block;
    animation: bounce 1s infinite;
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