<template>
    <div class="center">
        <div class="container1">
            <div @click="change1(0)" id="0" class="demo demo2">一级文物</div>
            <div @click="change1(1)" id="0" class="demo demo2">二级文物</div>
            <div @click="change1(2)" id="0" class="demo demo2">三级文物</div>
            <div @click="change1(3)" id="0" class="demo demo2">其他文物</div>
            <div @click="change1(4)" id="0" class="demo demo2">口述资料</div>
        </div>
        <div class="container2">
            <div v-for="item in changedData" :key="item.id" class="relicsBox">
                <div class="relicsImg">
                    <img :src="item.url" width="100%" height="100%">
                </div>
                <div class="relicsName"> {{ item.title }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return {
            index:'',
            alldata1:[
            {id:0,
                url:require('@/assets/wenwutupian/1.jpg'),
                title:'第一次全国苏维埃代表大会使用过的座钟'},
                {id:1,
                url:require('@/assets/wenwutupian/2.jpg'),
                title:'中国店员手艺工人工会临时中央委员会国家企业职工部印章'},
                {id:2,
                url:require('@/assets/wenwutupian/3.jpg'),
                title:'《经济政策、暂行税则、借贷条例、投资条例、财政条例、统一财政训令》'},
                {id:3,
                url:require('@/assets/wenwutupian/4.jpg'),
                title:'《全国苏维埃代表大会选举条例》'},
                {id:4,
                url:require('@/assets/wenwutupian/5.jpg'),
                title:'中央政府办事处布告（第一号）'},
                {id:5,
                url:require('@/assets/wenwutupian/6.jpg'),
                title:'《为开展查田运动》（布告）'},  
            ],
            alldata2:[
            {id:0,
                url:require('@/assets/wenwutupian/6.jpg'),
                title:'《为开展查田运动》（布告）'},  
            {id:1,
                url:require('@/assets/wenwutupian/5.jpg'),
                title:'中央政府办事处布告（第一号）'},
                {id:2,
                url:require('@/assets/wenwutupian/4.jpg'),
                title:'《全国苏维埃代表大会选举条例》'},
                {id:3,
                url:require('@/assets/wenwutupian/3.jpg'),
                title:'《经济政策、暂行税则、借贷条例、投资条例、财政条例、统一财政训令》'},
                {id:4,
                url:require('@/assets/wenwutupian/2.jpg'),
                title:'中国店员手艺工人工会临时中央委员会国家企业职工部印章'},
                {id:5,
                url:require('@/assets/wenwutupian/1.jpg'),
                title:'第一次全国苏维埃代表大会使用过的座钟'},
               
            ],
            // 暂时先写几个数据
            // changedData:[
            // {id:0,
            //     url:require('@/assets/wenwutupian/1.jpg'),
            //     title:'第一次全国苏维埃代表大会使用过的座钟'},
            //     {id:1,
            //     url:require('@/assets/wenwutupian/2.jpg'),
            //     title:'第一次全国苏维埃代表大会使用过的座钟'},
            //     {id:2,
            //     url:require('@/assets/wenwutupian/3.jpg'),
            //     title:'第一次全国苏维埃代表大会使用过的座钟'},
            //     {id:3,
            //     url:require('@/assets/wenwutupian/4.jpg'),
            //     title:'第一次全国苏维埃代表大会使用过的座钟'},
            //     {id:4,
            //     url:require('@/assets/wenwutupian/5.jpg'),
            //     title:'第一次全国苏维埃代表大会使用过的座钟'},
            //     {id:5,
            //     url:require('@/assets/wenwutupian/6.jpg'),
            //     title:'第一次全国苏维埃代表大会使用过的座钟'},  
            // ],
            changedData:'',
            menu: [
                {
                    id: 0,
                    name: '中央执行委员会办公厅使用过的电话机',
                    //url: 'RedRscoreWeb\src\assets\ff80808177fdb44795001786d57d64d1432.jpg'
                },
                {
                    id: 1,
                    name:'中央印刷厂石印机',
                    url:''
                },
                {
                    id: 2,
                    name:'二等红星奖章',
                    url:''
                }
            ]
        }
    },
    mounted() {
        //this.getData();
        this.change1(0);
        console.log('111');
        
        this.$axios.get(`/cr/getCrByLevel?level=0`)
                .then(res => {
                    this.changedData=res.data[0,5];
                    console.log('111');
                    console.log(res.data);
            })
            .catch(error => {
                console.error('没请求到');
                
            });
            
    },
  watch: {
    
  },
  computed: {
    
  },
  methods: {
    change1(i) {
        // if(i % 2 == 0){
        // this.changedData = this.alldata1
        // }
        // else{
        //     this.changedData = this.alldata2
        // }
        this.index = i;
        let demo1 = 'demo1'; // 确保定义了demo变量，替换'your-class-name'为实际的类名
        let demo2 = 'demo2';
        let arr = document.querySelectorAll('.demo');
        
        for (let i = 0;i < arr.length;i++) {
            arr[i].classList.toggle(demo1,false);
            arr[i].classList.toggle(demo2,true);
        }
        arr[i].classList.remove(demo2);
        arr[i].classList.add(demo1);
        // console.log(this.alldata);
        // this.changedData = this.alldata.filter(item => item.author === i)

        this.$axios.get(`/cr/getCrByLeel?level=${i}`)
                .then(res => {
                    this.changedData=res.data[0,5];
            });
    },
    // async getData() {
    //     await this.$axios.get(`/showResourceNew/showInfo?BigTheme=1&theme=1c&type=1&page=1&size=8`).then((res) => {
    //         if (res.data.isok == true) {
    //             // console.log(res.data.data);
    //             this.alldata = res.data.data;
    //             console.log(this.alldata);
    //         }
    //     })
    // }
  },
} 

</script>

<style scoped>  
@import "./responsive_css/center.css";
.container1{
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
    width:30%;
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
    display: grid;          /* 启用Grid布局 */
    place-items: center;
    cursor: pointer;
}
</style>