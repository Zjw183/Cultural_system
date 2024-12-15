<template>
    <div class="center">
      <div class="container1">
        <div
          v-for="(name, index) in levelNames"
          :key="index"
          @click="change1(index)"
          class="demo"
          :class="{ 'demo1': currentLevel === index, 'demo2': currentLevel !== index }"
          :data-level="index"
        >
          {{ name }}
        </div>
      </div>
      <div class="container2">
        <div v-if="!isarticle" v-for="item in changedData" :key="item.id" class="relicsBox">
          <div class="relicsImg">
            <img :src="item.url" width="100%" height="100%">
          </div>
          <div class="relicsName">{{ item.title }}</div>
        </div>
        <div v-if="isarticle">
          <!-- 口述资料的内容 -->
        </div>
      </div>  
      <ul class="page">
        <li @click="prevPage" :disabled="index === 0" class="yemaquan"><i class="el-icon-arrow-left"></i></li>
        <!-- <span>页码：{{ index + 1 }} / {{ totalPages }}</span>  -->
        <li class="yemaquan"
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page - 1)"
            :class="{ active: index === page - 1 }" 
          >
            {{ page }}
          </li>
        <li @click="nextPage" :disabled="index === totalPages - 1" class="yemaquan"><i class="el-icon-arrow-right"></i></li>
        <!-- <div class="yema"> -->
         
        </ul>
      </div>
    <!-- </div> -->
  </template>
  
  <script>
  export default {
    data() {
      return {
        isarticle: false,
        index:0,
        allData: [],
        itemsPerPage: 6,
        changedData: [],
        levelNames: {
          0: '一级文物',
          1: '二级文物',
          2: '三级文物',
          3: '其他文物',
          4: '口述资料'
        },
        currentLevel: 0,
        totalPages: 0
      };
    },
    mounted() {
      this.currentLevel = this.index;
      this.fetchData(this.currentLevel);
    },
    methods: {
      fetchData(level) {
        this.$axios.get(`/cr/getCrByLevel?level=${level}`)
          .then(res => {
            this.allData = res.data.data;
            this.totalPages = Math.ceil(this.allData.length / this.itemsPerPage);
            this.index = 0; // 重置页码为第一页
            this.changeData(); // 加载第一页数据
            this.currentLevel = level;
          })
          .catch(error => {
            console.error('没请求到', error);
          });
      },
      changeData() {
        const start = this.index * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        this.changedData = this.allData.slice(start, end);
      },
      nextPage() {
        if ((this.index + 1) * this.itemsPerPage < this.allData.length) {
          this.index += 1; // 更新页码
          this.changeData(); // 重新计算当前页的数据
        }
      },
      prevPage() {
        if (this.index > 0) {
          this.index -= 1; // 更新页码
          this.changeData(); // 重新计算当前页的数据
        }
      },
      goToPage(pageIndex) {
        if (pageIndex >= 0 && pageIndex < this.totalPages) {
          this.index = pageIndex;
          this.changeData();
        }
      },
      change1(level) {
        this.isarticle = level === 4;
        this.fetchData(level);
      }
    }
  };
  </script>
  
  <style scoped>
  @import "./responsive_css/center.css";
  .container1 {
    width: 100%;
    margin-left: 20%;
  }
  .demo1 {
    background-color: #2c4c65;
    color: white;
  }
  .demo2 {
    background-color: #dad9de;
    color: #213c51;
  }
  .demo {
    width: 8%;
    aspect-ratio: 4 / 1;
    display: inline-block;
    text-align: center;
    padding: 5px 0;
    border-radius: 2px;
    margin-left: 3%;
    cursor: pointer;
    font-weight: 600;
  }
  .center {
    position: relative;
    margin-top: 1%;
  }
  .container2 {
    width: 70%;
    height: 70vh;
    margin: auto;
  }
  .relicsBox {
    width: 30%;
    height: 40%;
    border: 2px solid gray;
    margin: 2% 1.5%;
    display: inline-block;
  }
  .relicsImg {
    width: 96%;
    height: 75%;
    margin: 1% auto;
    border: 2px solid gray;
    cursor: pointer;
  }
  .relicsImg img {
    object-fit: cover;
  }
  .relicsName {
    width: 96%;
    height: 18%;
    margin: 1% auto;
    border: 2px solid gray;
    text-align: center;
    display: grid;
    place-items: center;
    cursor: pointer;
  }
  .yemaquan.active {
    background-color:  #ead88f;
    color: white;
  }
  .page{
    /* margin: 0px auto; */
    text-align: center;
    display: flex;
    justify-content:center;
    list-style: none;
    gap:30px;
  }
  .yema{
    display: flex;
  }
  .yemaquan{
    width: 25px;
    height: 25px;
    font-size: 20px;
    border-radius: 80% 80%;
    border: 1px solid black;
    background-color: #f8f8f8;
    text-align: center;
    line-height: 25px;
  }
  .yemaquan:hover{
   background-color:  #ead88f;
   color: white;
  }
  </style>