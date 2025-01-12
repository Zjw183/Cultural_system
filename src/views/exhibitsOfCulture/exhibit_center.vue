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
      <div class="left" @click="prevSlide"><i class="el-icon-arrow-left"></i></div>
      <img :src="currentImage" alt="" @mouseenter="pauseCarousel" @mouseleave="startCarousel" height="300" width="1040">
      <div class="right" @click="nextSlide"><i class="el-icon-arrow-right"></i></div>
      <div class="indicators">
        <span
          v-for="(indicators, index) in indicators"
          :key="index"
          :class="{ active: index === currentIndex }"
          @click="goToSlide(index)"
        ></span>
      </div>
    <div class="image-gallery">
    <div class="image-item" v-for="(item, index) in imageItems" :key="index">
      <img :src="item.image" :alt="item.title" class="gallery-image">
      <div class="image-title">{{ item.title }}</div>
    </div>
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
      imageItems: [
        { image: require('@/assets/wenwutupian/红色文物/《党员训练大纲秘密须知》.png'), title: '《党员训练大纲秘密须知》' },
        { image: require('@/assets/wenwutupian/红色文物/熬盐用的缸和硝盐.png'), title: '熬盐用的缸和硝盐' },
        { image: require('@/assets/wenwutupian/红色文物/工人学校毕业证书.png'), title: '工人学校毕业证书' },
        { image: require('@/assets/wenwutupian/红色文物/贺页朵使用过的眼镜、镜盒.png'), title: '贺页朵使用过的眼镜、镜盒' },
        { image: require('@/assets/wenwutupian/红色文物/红军缴获的石印机.png'), title: '红军缴获的石印机' },
        { image: require('@/assets/wenwutupian/红色文物/红军医务人员用的工具.png'), title: '红军医务人员用的工具' },
        { image: require('@/assets/wenwutupian/红色文物/红军医务人员用的药书.png'), title: '红军医务人员用的药书' },
        { image: require('@/assets/wenwutupian/红色文物/宁冈县天坪乡党支部装文件用过的藤篮.png'), title: '宁冈县天坪乡党支部装文件用过的藤篮' },
        { image: require('@/assets/wenwutupian/红色文物/万安罗塘党支部入党志愿书.png'), title: '万安罗塘党支部入党志愿书' },
        { image: require('@/assets/wenwutupian/红色文物/造币厂支架残片.png'), title: '造币厂支架残片' },
        { image: require('@/assets/wenwutupian/红色文物/支部会议记录.png'), title: '支部会议记录' },
        { image: require('@/assets/wenwutupian/红色文物/中共部县县委组织部长代表证.png'), title: '中共部县县委组织部长代表证' },
      ]
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
    width: 70%;
    margin: 100px auto;
}

p {
    position: absolute;
    left: 50%;
    bottom: 0px;
    transform: translate(-50%, -50%);
}

i {
    height: 25px;
    width: 25px;
    display: inline-block;
    margin-right: 10px;
    border-radius:50%;
    font-weight: bold;
    font-size: 25px;
    color:  rgba(53, 119, 75, 0.651);
    background-color: white;
    display: inline-block;
    animation: bounce 1s infinite;
}


.left,
.right {
  position: absolute;
  top: 150px;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 1;
}

.left {
    left: 0px;
    transform: translate(15%, -50%);
}

.right {
    right: 0px;
    transform: translate(-15%, -50%);
}

.image-gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
 
.image-item {
  flex: 0 0 calc(25% - 20px); /* 每张图片占据25%的宽度，减去间距 */
  margin: 10px;
  text-align: center;
}
 
.gallery-image {
  width: 100%;
  height: auto; 
}
 
.image-title {
  margin-top: 5px; 
  font-size: 14px; 
  color: #333; 
}
</style>
