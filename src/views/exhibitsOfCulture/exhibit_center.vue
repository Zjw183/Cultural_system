<!-- <template>
  <div>
    <div class="header">
      <div class="left-logo">
        <img src="@/assets/苏区红文物展览系统.png" style="width: 200px; height: 100px;">
      </div>
    </div>
    <div class="swiper-container">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(image, index) in images" :key="index">
          <img :src="image" :alt="'Image ' + (index + 1)"/>
        </swiper-slide>
          <div class="swiper-pagination"></div>
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 2,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      images: [
        require('@/assets/工农革命军的武器.png'),
        require('@/assets/工农革命军用过的子弹袋.png'),
        require('@/assets/莲花赤卫军袖章.png'),
        require('@/assets/农民协会旗帜.png'),
        require('@/assets/秋收起义用过的松树炮.png'),
        require('@/assets/八七会议上毛泽东率先发言.png'),
      ],
    };
  },
};
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: rgba(53, 119, 75, 0.651);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000; 
}
.left-logo img {
  display: block; 
}
.swiper-container {
  width:90%;  
  height: 20%;
  margin: 80px auto; 
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.swiper-slide img {
  width: 40%;  
  height: 20%;  
  object-fit: cover; 
}
.swiper-button-next, .swiper-button-prev {
  color: black; 
  background-color: rgba(0, 0, 0, 0.5); 
  border-radius: 50%; 
  width: 40px; 
  height: 40px;
  line-height: 40px; 
  text-align: center; 
  font-size: 24px; 
}
</style>


 -->

<template>
  <div>
    <div class="header">
      <div class="left-logo">
        <img src="@/assets/苏区红文物展览系统.png" style="width: 200px; height: 100px;">
      </div>
    </div>
    <section class="carousel">
      <span class="left" @click="prevSlide"></span>
      <img :src="currentImage" alt="" @mouseenter="pauseCarousel" @mouseleave="startCarousel">
      <span class="right" @click="nextSlide"></span>
      <div class="indicators">
        <span
          v-for="(indicators, index) in indicators"
          :key="index"
          :class="{ active: index === currentIndex }"
          @click="goToSlide(index)"
        ></span>
      </div>
  </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        require('@/assets/工农革命军的武器.png'),
        require('@/assets/工农革命军用过的子弹袋.png'),
        require('@/assets/莲花赤卫军袖章.png'),
        require('@/assets/农民协会旗帜.png'),
        require('@/assets/秋收起义用过的松树炮.png'),
        require('@/assets/八七会议上毛泽东率先发言.png'),
      ],
      currentIndex: 0,
      interval: null,
    };
  },
  computed: {
    currentImage() {
      return this.images[this.currentIndex];
    },
    indicators() {
      return new Array(this.images.length).fill(0);
    },
  },
  methods: {
    startCarousel() {
      this.interval = setInterval(() => {
        this.nextSlide();
      }, 2000);
    },
    pauseCarousel() {
      clearInterval(this.interval);
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
    goToSlide(index) {
      this.currentIndex = index;
    },
  },
  mounted() {
    this.startCarousel();
  },
  beforeDestroy() {
    this.pauseCarousel();
  },
};
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: rgba(53, 119, 75, 0.651);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000; 
}
.left-logo img {
  display: block; 
}
section {
    position: relative;
    height: 35%;
    width: 50%;
    border: 1px solid;
    margin: 100px auto;
}

section.img {
    height: 35%;
    width: 50%;
}

p {
    position: absolute;
    left: 50%;
    bottom: 0px;
    transform: translate(-50%, -50%);
}

i {
    height: 15px;
    width: 15px;
    background-color: gray;
    border-radius: 50%;
    display: inline-block;
    margin-right: 10px;
}

i:nth-child(1) {
    background-color: white;
}

i:nth-child(4) {
    margin-right: 0;
}

.left,
.right {
    color: rgba(255, 255, 255, 0.7);
    font-size: 50px;
    font-weight: bolder;
    position: absolute;
    top: 50%;
    font-weight: 500;
}

.left {
    left: 0px;
    transform: translate(15%, -50%);
}

.right {
    right: 0px;
    transform: translate(-15%, -50%);
}
</style>
