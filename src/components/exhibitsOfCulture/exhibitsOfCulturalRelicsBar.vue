<template>
    <div class="bar">
        <ul>
            <li v-for="item in menu" :key = item.id>
                <a  @click="toRareMaterialsLibrary(item.id)">
                    {{ item.name }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menu: [
                {
                    name: '首页',
                    id: 0
                },
                {
                    name: '革命遗址',
                    id: 1
                },
                {
                    name: '革命文献',
                    id: 2
                },
                {
                    name: '红色课程',
                    id: 3
                },
                {
                    name: '红色实践',
                    id: 4
                },
                {
                    name: '数字文创',
                    id: 5
                },
                {
                    name: '数字地图',
                    id: 6
                }
            ]
        }
    }
}
</script>

<style scoped>
.bar {
    position:absolute;
    width: 100%;
    background-color: transparent;
    z-index: 1;
}

.bar ul {
    text-align: center;
}

.bar li {
    width: 10%;
    display: inline-block;
    text-align: center;
    padding-top: 1%;
}

.bar li :hover {
    color: #f1c263;
}

.bar ul li a {
    color: white;
    text-align: center;
    font-size: x-large;
    font-family: Alimama;
    cursor: pointer;
    font-weight: 10;
}

@font-face {
    font-family: Alimama;
    src: url(../../assets/AlimamaDongFangDaKai-Regular.ttf);
}
</style>