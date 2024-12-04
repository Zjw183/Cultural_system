<template>
    <div>
        <div class="image-container">
            <exhibits-of-cultural-relics-bar/>
            <img src="@/assets/文物展览.png" class="content-image"/>
        </div>
    </div>
</template>

<script>
import exhibitsOfCulturalRelicsBar from './exhibitsOfCulturalRelicsBar.vue';
export default{
    data(){
        return {

        }
    },
    components: {
        exhibitsOfCulturalRelicsBar
    },
    mounted() {
        this.getDivSize();
    },
    methods: {
        //该函数目的是将center与imgTab分开，否则两者会重叠，应该是css的原因，但找不出具体问题，只能通过该函数将center的高度下移
        getDivSize() {
            let div = document.getElementsByClassName('image-container');
            let img = document.getElementsByClassName('content-image');
            console.log(div[0]);
            console.log(img[0]);
            let width = window.getComputedStyle(img[0]).width;
            console.log(width);
            let height = width.replace('px','') / 2.823;
            console.log(height);
            div[0].style.height = height + 'px';
        }
    }
} 

</script>

<style scoped>
@media only screen and (min-width: 600px) {
}

.image-container{
    position: relative;
}

.content-image{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    vertical-align: top;/* 去掉图片和div的间隙 */
    z-index: 0;
    object-fit: contain;
}
</style>