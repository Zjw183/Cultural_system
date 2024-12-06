<template>
    <div>
        <headerBar />
        <imgTab />
        <center-content></center-content>
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

</style>
