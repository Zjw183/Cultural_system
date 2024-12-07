<!-- eslint-disable vue/no-multiple-template-root -->
<template>
    <div>
        <headerBar />
        <imgTab />
        <center-content></center-content>
        <!-- 悬浮图标 -->
    <div class="point" ref="point"
        :style="`width:${divWidth}px;height:${divHeight}px;left:${moveLeft}px;top:${moveTop}px;`"
        @touchstart.prevent="(e) => { dragStart(e) }" @touchend.prevent="(e) => { dragEnd(e) }"
        @touchmove.prevent="(e) => dragMove(e)"
        @click="to_chatbro">
        <img class="imgzhushou" src="../../assets/zhushou.png" alt="">
    </div>
    </div>

</template>

<script>
import headerBar from '../../components/exhibitsOfCulture/exhibitsOfCulture_header.vue'
// import footerBar from '../../components/exhibitsOfCulture/exhibitsOfCulture_footer.vue'
import imgTab from '../../components/exhibitsOfCulture/exhibitsOfCulture_imgTab.vue'
import CenterContent from '../../components/exhibitsOfCulture/exhibitsOfCulture_center.vue'
export default{
    data(){
        return {
            border_distance: 10,//可拖拽元素距离屏幕边界最小距离
            divWidth: 100,//可拖拽元素宽度
            divHeight: 100,//可拖拽元素高度
            moveLeft: 0,//可拖拽元素距离屏幕左边界
            moveTop: 0,//可拖拽元素距离屏幕上边界
            clientWidth: window.screen.availWidth,//屏幕宽度
            clientHeight: window.screen.availHeight//屏幕高度
        }
    },
    methods: {
        to_chatbro(){
            this.$router.push('/chatbro');
        },
        dragStart() {
            this.$refs.point.style.transition = "none";
        },
        dragEnd() {
            this.$refs.point.style.transition = 'all 0.3s';
            if (this.moveLeft > this.clientWidth / 2) {//若移动位于屏幕的左边或右边，则自动贴合左边或右边（此根据业务具体需求表现而定）
                this.moveLeft = this.clientWidth - this.divWidth - this.border_distance;
            } else {
                this.moveLeft = this.border_distance;
            }
        },
        dragMove(e) {
            if (e.touches.length) {
                let touch = e.touches[0];
                this.moveLeft = touch.clientX - this.divWidth / 2;//因拖动的中间点为Dom节点的中心点，所以left需减去Dom节点一半的宽度
                this.moveTop = touch.clientY - this.divHeight / 2;//top原理同上
            }
        }
    },

    components: {
        headerBar,
        imgTab,
        CenterContent,
    }
}

</script>

<style scoped>
.imgzhushou {
    width: 80%;
    height: 80%;
}
.out {
    height: 100%;
    position: relative;
}

.point {
    position: absolute;
}
</style>
