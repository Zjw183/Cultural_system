<template>
    <div class="carousel" :style="{ height: '100%' }">
      <div class="carousel-inner" :style="{ transform: `translateX(-${currentIndex * 100}%)`, height: '100%' }">
        <div class="carousel-item" v-for="(image, index) in images" :key="index">
          <img :src="image" alt="轮播图" style="width:100%; height: 787px;">
        </div>
      </div>
      <div class="indicators">
        <span
          class="indicator"
          v-for="(image, index) in images"
          :key="index"
          :class="{ 'active': currentIndex === index }"
          @click="currentIndex = index"
        ></span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentIndex: 0,
        intervalId: null,
        images: [
          require('@/assets/lunbotu/轮播图1.jpg'),
          require('@/assets/lunbotu/轮播图2.jpg'),
          require('@/assets/lunbotu/轮播图3.jpg'),
          require('@/assets/lunbotu/轮播图4.jpg'),
          require('@/assets/lunbotu/轮播图5.jpg'),
        ],
        interval: 6000 // 轮播图自动切换的时间间隔，单位为毫秒
      };
    },
    mounted() {
      this.startAutoPlay();
    },
    beforeDestroy() {
      this.stopAutoPlay();
    },
    methods: {
      next() {
        if (this.currentIndex < this.images.length - 1) {
          this.currentIndex++;
        } else {
          this.currentIndex = 0;
        }
      },
      startAutoPlay() {
        this.intervalId = setInterval(this.next, this.interval);
      },
      stopAutoPlay() {
        clearInterval(this.intervalId);
      }
    }
  };
  </script>
  
  <style scoped>
  .carousel {
    position: relative;
    overflow: hidden;
    width: 100%;
  }
  
  .carousel-inner {
    display: flex;
    transition: transform 0.5s ease;
  }
  
  .carousel-item {
    min-width: 100%;
    height: 100%; /* 确保图片容器填满轮播图容器 */
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.5s ease; /* 添加放大效果的过渡 */
  }
  
  .carousel-item img {
    width: 100%;
    max-height: 100%;
    object-fit: cover; /* 确保图片覆盖整个容器，不失真 */
    transition: transform 0.5s ease; /* 添加放大效果的过渡 */
  }
  
  .carousel-item img:hover {
    transform: scale(1.1); /* 鼠标悬停时放大 */
  }
  
  .indicators {
    position: absolute;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
  }
  
  .indicator {
    width: 10px;
    height: 10px;
    background-color: #fff;
    border-radius: 50%;
    margin: 0 5px;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }
  
  .indicator.active {
    opacity: 1;
  }
  </style>